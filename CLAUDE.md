# CivDivCIC — Build Log & Verified State

This file tracks what has been built, verified in the browser, and confirmed correct.
**Do not re-verify or re-implement anything marked ✅ VERIFIED unless the user explicitly asks to revisit it.**

---

## Design System ✅ VERIFIED

- **Accent colour:** `#a6b84c` (olive/military green extracted from logo.png) — replaces gold everywhere
- **Tint:** `#c8d47a` · **Dark:** `#7a8a38`
- **Brand Black:** `#101113` · **Black 800:** `#1F2024`
- **Crisis Red:** `#C8102E` (crisis bar + emergency CTAs only)
- **Open Green:** `#2E7D5B` (centre open status only)
- **Warm Surface:** `#F5F4F0` (off-white section bands — looks near-white in screenshots, this is correct)
- **Fonts:** Archivo (headings) · Inter (body) via Google Fonts
- Tailwind config uses key names `gold`, `gold-tint`, `gold-dark` pointing to the green values
- Numeric font-weight keys `400`–`800` added to Tailwind config (required for `font-700` etc. to resolve)

---

## Logo ✅ VERIFIED

- Source: `logo.png` (root) → copied to `public/images/logo.png`
- Wired into `src/components/Header.astro` as `<img src="/images/logo.png" alt="CivDivCIC" class="h-10 w-auto" />`
- Displays correctly in the sticky header across all pages

---

## Global Components ✅ VERIFIED

### Header
- Sticky dark nav with logo, all nav links, "Need help now" (red), "Donate"
- Nav items: Get Support · Make a Referral · About · Partnerships · Get Involved · Build Futures · Contact
- "About" / "Partnerships" / "Build Futures" etc. highlight in green when active page
- Mobile sticky bottom bar present (Support · Refer · Help Now · Menu)

### Crisis Bar
- Red bar pinned below header on **every** page
- Numbers: Veterans' Gateway 0808 802 1212 · Combat Stress 0800 138 1619 · Samaritans 116 123 · Emergency 999
- All numbers are tap-to-call (`tel:` links)
- Collapsible with sessionStorage memory
- "More help →" links to `/crisis`

### Footer (funding-grade)
- 4-column layout: Brand/mission · Quick Links · Governance & Safeguarding · Contact & Access
- Address: 4th Floor, Silverstream House, 45 Fitzroy Street, Fitzrovia, London W1T 6EB
- Email: admin@civdivcic.org.uk
- Tel/Open hours: `TODO[CONFIRM]` (correct — not yet confirmed by client)
- Newsletter form (Netlify Forms, low-sensitivity) with reCAPTCHA disclosure
- Social icon placeholders: Facebook, LinkedIn, X, Instagram, YouTube
- Accreditation row: labelled placeholder (correct — only display marks actually held)
- Legal line: © 2026 CivDivCIC · Community Interest Company No. 13697459

---

## Pages ✅ VERIFIED

### Home (`/`) ✅ VERIFIED (hero updated)
- Hero: 2-column layout — image placeholder (left, 4:3 aspect ratio, dark rounded card) · text content (right)
- Equal horizontal space: left column = image, right column = text, `md:grid-cols-2 gap-16`
- H1: "No veteran should feel disconnected." with "disconnected." in accent green
- Subtext (mission/vision derived): "We empower veterans and their communities through engagement, partnership and wellbeing — preserving the legacy of Black service personnel while connecting all who served to the support they have earned."
- "Connect · Heritage · Opportunity" tagline
- WEST INDIAN ASSOCIATION OF SERVICE PERSONNEL · WINDRUSH FOUNDATION · BUILDING HEROES partner strip (above H1)
- CTAs: Get Support (green) · Make a Referral (white outline)
- Mobile: text stacks on top, image below (`order-1`/`order-2` reversed)
- Big Three pathway cards: Health & Wellbeing · Housing · Employment & Skills
- Centre status strip: address + "Visit us" + "Out of hours? →" (hours `TODO[CONFIRM]`)
- Secondary pathways: Financial Guidance & Benefits · Welfare & Social Isolation · Mental Wellbeing
- "Who we are" section with No Wrong Door statement
- "Get involved": Volunteer + Donate cards

### Support Hub (`/support`)
- Big Three + secondary pathway cards
- National Veteran Support Pathways: Op ASCEND · Op COURAGE · Op FORTITUDE · Op NOVA · Op RESTORE
- "Not sure where to start?" referral CTA

### Health & Wellbeing pathway (`/pathways/health`)
- Breadcrumb: Home / Get Support / Health & Wellbeing
- Non-clinical disclaimer banner
- "What we can help with" checklist
- 3-step No Wrong Door process
- Partner cards (funded/unfunded tagged)

### Crisis (`/crisis`)
- "If you need help right now" heading
- "In immediate danger? Call 999" red-bordered box (first visible element)
- During centre hours block with address
- 24/7 free crisis lines: Veterans' Gateway · Combat Stress · Samaritans · NHS 111 · 999

### Referral Hub (`/referral`)
- 3-type toggle: A veteran (self-referral) · Referring someone · A professional
- 4-step progress indicator: About you → What's needed → About you (optional) → Consent
- Step 1: Name, phone, email, area/postcode, description
- Step 2: Pillar multi-select (6 pillars)
- Step 3: Optional demographics (veteran status, age band, ethnicity, cohort flags — all with Prefer not to say)
- Step 4: Consent (NOT pre-ticked) + marketing opt-in (optional) + reCAPTCHA placeholder + GDPR note
- Posts to `/.netlify/functions/submit-referral` (NOT Netlify Forms)
- Confirmation screen with 4-step "what happens next"

### About (`/about`)
- Mission Statement: "To empower veterans and communities through engagement, partnership, education, and wellbeing initiatives while preserving the contribution and legacy of Black service personnel."
- Vision Statement: "To become a leading veteran engagement organisation..."
- Core Values: Integrity · Inclusion · Respect · Community · Empowerment · Collaboration
- Our Role (4 bullets) · Strategic Alignment (UK Veterans Strategy, Armed Forces Covenant, VALOUR approach) · Our Approach (No Wrong Door, Partnership delivery, Community-led engagement, Measurable impact)
- Three Pillars: Support · Contribute · Celebrate
- Our Story + CIC status details (No. 13697459)
- Leadership: `TODO[CONFIRM]`
- Non-clinical disclaimer callout

### Partnerships (`/partnerships`)
- Filter tabs: All areas · Health & Wellbeing · Housing · Employment & Skills · Financial Guidance · Welfare & Social Isolation · Mental Wellbeing · Heritage
- **Strategic Support & Pathway Partners** (all Unfunded): Blind Veterans UK · Combat Stress · Defence Medical Welfare Service · SSAFA · Forces Employment Charity · Samaritans · The Royal British Legion · Veterans UK Welfare Service
- **Community & Heritage Partners**: WASP (Funded) · Friends of Windrush Square · Windrush Foundation

### Build Futures (`/build-futures`)
- CivDiv Homes description
- "What we are building" model cards
- Our Approach (4 bullets)
- Partnership Approach (seeking: Building Heroes, housing associations, construction partners, social investors)
- Status: "currently in development and partnership formation stage"
- CTA → contact us

---

## Pathway Pages ✅ BUILT (not individually browser-verified beyond health)

All 6 use shared `PathwayLayout.astro`:
- `/pathways/health` ✅ browser-verified
- `/pathways/housing`
- `/pathways/employment`
- `/pathways/financial`
- `/pathways/welfare`
- `/pathways/mental-wellbeing`

---

## Additional Pages ✅ BUILT (not individually browser-verified)

- `/heritage` — Veteran Membership & Heritage Engagement Programme, WASP partnership, HM Armed Forces Veteran Card
- `/contact` — Address, email, general enquiry form (Netlify Forms), "complements not replaces" statement
- `/policies` — 7 policy documents with last-updated dates (`TODO[CONFIRM]`)
- `/accessibility` — WCAG 2.2 AA statement
- `/404` — Routes back to Support Hub
- `/news` · `/get-involved` · `/donate`

---

## Backend & Infrastructure ✅ BUILT (not live-tested — requires Firebase credentials)

- `netlify/functions/submit-referral.ts` — validates → writes to Firestore europe-west2 → sends notification email with NO personal data (record ID only)
- `firestore.rules` — all client access denied; Admin SDK only
- `public/admin/` — Decap CMS with Netlify Identity, 6 collections (news, events, partners, team, pathways, site_settings)
- `.env.example` — all required env vars documented

---

## Known TODO[CONFIRM] Items (client must supply)

- Telephone number
- Centre opening hours
- Crisis helpline list (using PRD defaults for now)
- Policy PDFs with last-updated dates
- Accreditations/memberships actually held
- SendGrid verified sender email for notifications
- reCAPTCHA site key + secret key
- Leadership team names/roles
- Partner logos and website URLs
- Priority languages for language switcher (Phase 1)
- Lawful basis & retention periods (DPO sign-off)

---

## Build Status

- `npm run dev` → runs on `http://localhost:4322` (4321 in use by another process)
- `npx astro build` → 21 pages, 0 errors
- `@astrojs/sitemap` temporarily disabled (version conflict with Astro 4.16) — re-enable before production deploy
