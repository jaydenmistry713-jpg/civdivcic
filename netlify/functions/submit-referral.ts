/**
 * submit-referral.ts — Netlify serverless function
 *
 * Receives referral form POST, validates server-side,
 * writes to Firestore (europe-west2), and sends a
 * notification email with NO personal data.
 *
 * IMPORTANT: No personal data is ever sent via email.
 * Admins must log in to the Firebase console to view referral details.
 */

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { v4 as uuidv4 } from 'uuid';
import sgMail from '@sendgrid/mail';

// ─── Types ───────────────────────────────────────────────────

interface Demographics {
  age_band:     string;
  ethnicity:    string;
  cohort_flags: string[];
}

interface ReferralBody {
  referral_type:     string;
  name:              string;
  contact_phone?:    string;
  contact_email?:    string;
  area:              string;
  description?:      string;
  pillars:           string[];
  veteran_status?:   string;
  demographics?:     Partial<Demographics>;
  consent_referral:  boolean;
  consent_marketing?: boolean;
  source_page?:       string;
  recaptcha_token?:   string;
}

// ─── Helpers ─────────────────────────────────────────────────

function sanitise(s: unknown, maxLen = 500): string {
  if (typeof s !== 'string') return '';
  return s.trim().slice(0, maxLen).replace(/[<>]/g, ''); // basic XSS strip
}

function sanitiseOutwardCode(raw: string): string {
  // Keep only the outward (first) part of a UK postcode
  const cleaned = raw.toUpperCase().replace(/[^A-Z0-9 ]/g, '').trim();
  // Outward codes are 2–4 chars, e.g. W1T, SW1A, EC1A, BT1
  const match = cleaned.match(/^([A-Z]{1,2}[0-9]{1,2}[A-Z]?)/);
  return match ? match[1] : cleaned.slice(0, 8);
}

const ALLOWED_PILLARS = [
  'health', 'housing', 'employment',
  'financial', 'welfare', 'mental_wellbeing',
] as const;

const ALLOWED_REFERRAL_TYPES = ['self', 'behalf', 'professional'] as const;

// ─── Firebase initialisation (lazy singleton) ────────────────

function getFirestoreClient() {
  if (!getApps().length) {
    const projectId   = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey  = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error('Missing Firebase Admin SDK environment variables (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY).');
    }

    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
      // Firestore in europe-west2 (London) — set at project creation,
      // no additional config needed here; Admin SDK uses the project default.
    });
  }
  return getFirestore();
}

// ─── Email notification (no personal data) ───────────────────

async function sendNotification(recordId: string): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY;
  const to     = process.env.NOTIFICATION_EMAIL_TO ?? 'admin@civdivcic.org.uk';

  if (!apiKey) {
    console.warn('SENDGRID_API_KEY not set — skipping email notification.');
    return;
  }

  sgMail.setApiKey(apiKey);

  await sgMail.send({
    to,
    from: 'no-reply@civdivcic.org.uk', // TODO[CONFIRM] — must be a verified SendGrid sender
    subject: 'New referral received — log in to view',
    text: [
      'A new referral has been submitted to CivDivCIC.',
      '',
      `Record ID: ${recordId}`,
      '',
      'Log in to the Firebase console to view the full details.',
      'https://console.firebase.google.com',
      '',
      'DO NOT REPLY TO THIS EMAIL.',
      'This email contains no personal data.',
      '',
      '--- CivDivCIC automated notification ---',
    ].join('\n'),
  });
}

// ─── Handler ─────────────────────────────────────────────────

const handler: Handler = async (event: HandlerEvent, _ctx: HandlerContext) => {
  // Only POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed.' }),
    };
  }

  // ── 1. Parse body ──────────────────────────────────────────
  let body: ReferralBody;
  try {
    body = JSON.parse(event.body ?? '{}');
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid JSON body.' }),
    };
  }

  // ── 2. Server-side validation ──────────────────────────────
  const errors: string[] = [];

  const name         = sanitise(body.name, 200);
  const contactPhone = sanitise(body.contact_phone ?? '', 20);
  const contactEmail = sanitise(body.contact_email ?? '', 254);
  const area         = sanitiseOutwardCode(sanitise(body.area, 10));
  const description  = sanitise(body.description ?? '', 500);
  const sourcePage   = sanitise(body.source_page ?? '/referral', 200);

  if (!name)                              errors.push('name is required');
  if (!contactPhone && !contactEmail)     errors.push('at least one contact method (phone or email) is required');
  if (!area)                              errors.push('area/postcode is required');

  // Validate pillars
  const pillars: string[] = Array.isArray(body.pillars)
    ? body.pillars.filter(p => (ALLOWED_PILLARS as readonly string[]).includes(p))
    : [];
  if (pillars.length === 0)               errors.push('at least one support pillar must be selected');

  // Validate consent
  if (body.consent_referral !== true)     errors.push('consent_referral must be true');

  // Validate referral type
  const referralType: string = (ALLOWED_REFERRAL_TYPES as readonly string[]).includes(body.referral_type)
    ? body.referral_type
    : 'self';

  if (errors.length > 0) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: errors.join('; ') }),
    };
  }

  // ── 3. Optional demographics ───────────────────────────────
  const dem = body.demographics ?? {};
  const demographics: Demographics = {
    age_band:     sanitise(dem.age_band ?? '', 20),
    ethnicity:    sanitise(dem.ethnicity ?? '', 60),
    cohort_flags: Array.isArray(dem.cohort_flags)
      ? dem.cohort_flags.map(f => sanitise(f, 30)).slice(0, 10)
      : [],
  };

  // ── 4. Generate stable record ID ──────────────────────────
  const id = uuidv4();

  // ── 5. Build Firestore document ───────────────────────────
  const docData = {
    id,
    timestamp:         FieldValue.serverTimestamp(),
    source_page:       sourcePage,
    referral_type:     referralType,
    name,
    contact_phone:     contactPhone,
    contact_email:     contactEmail,
    area_outward:      area,
    pillars,
    description,
    veteran_status:    sanitise(body.veteran_status ?? '', 30),
    demographics,
    consent_referral:  true,
    consent_marketing: body.consent_marketing === true,
    created_at:        new Date().toISOString(),
  };

  // ── 6. Write to Firestore ─────────────────────────────────
  try {
    const db = getFirestoreClient();
    await db.collection('referrals').doc(id).set(docData);
  } catch (err) {
    console.error('Firestore write error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to save referral. Please try again or contact us directly.' }),
    };
  }

  // ── 7. Send notification email (no personal data) ─────────
  try {
    await sendNotification(id);
  } catch (err) {
    // Non-fatal: log but don't fail the submission
    console.error('Notification email error:', err);
  }

  // ── 8. Success ─────────────────────────────────────────────
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: true, id }),
  };
};

export { handler };
