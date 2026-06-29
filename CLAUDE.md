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
- Numeric font-weight utilities (`.font-400` through `.font-800`) defined explicitly in `@layer utilities` in `global.css` — do NOT rely on Tailwind `fontWeight` theme extension for `@apply` usage, it doesn't work reliably on fresh server starts

### Known colour behaviour
- `#a6b84c` reads as olive-green on iPhone OLED (P3 gamut) and as slightly golden on desktop LCDs — this is a screen calibration difference, not a code bug. Do NOT change the colour token without explicit user instruction.
- If colours appear wrong on desktop, **first check for stale Vite/Astro cache** before changing any values. Fix: stop server, delete `.astro/` and `node_modules/.vite/`, restart with `npm run dev -- --host`.

---

## Logo ✅ VERIFIED

- Source: `logo.png` (root, do not delete) → also at `public/images/logo.png`
- Wired into `src/components/Header.astro` as `<img src="/images/logo.png" alt="CivDivCIC" class="h-10 w-auto" />`
- Displays correctly in the sticky header across all pages

---

## Global Components ✅ VERIFIED

### Header ✅ VERIFIED
- Sticky dark nav with logo, all nav links, "Need help now" (red), "Donate"
- Nav items: Get Support · Make a Referral · About · Partnerships · Get Involved · Build Futures · Contact
- Active page highlights in green
- **Mobile sticky bottom bar has been REMOVED** — do not add it back

### Crisis Bar ✅ VERIFIED
- Red bar pinned below header on **every** page
- **Desktop:** all four numbers in one row — Veterans' Gateway 0808 802 1212 · Combat Stress 0800 138 1619 · Samaritans 116 123 · Emergency 999 — all tap-to-call
- **Mobile:** single compact row — `⚠ In crisis?` + white "Get help →" button linking to `/crisis`
- No rotating numbers on mobile (removed — was unreliable)
- Collapsible with sessionStorage memory (chevron toggle)
- All links in crisis bar use `#crisis-bar a { color: white !important }` in `global.css` to override the global `a { color: gold-dark }` rule
- The "Get help →" button uses `style="color: #C8102E !important"` inline to override that same rule (white bg, red text)

### Footer ✅ VERIFIED (funding-grade)
- 4-column layout: Brand/mission · Quick Links · Governance & Safeguarding · Contact & Access
- Address: 4th Floor, Silverstream House, 45 Fitzroy Street, Fitzrovia, London W1T 6EB
- Email: admin@civdivcic.org.uk
- Tel/Open hours: `TODO[CONFIRM]`
- Newsletter form (Netlify Forms, low-sensitivity) with reCAPTCHA disclosure
- Social icon placeholders: Facebook, LinkedIn, X, Instagram, YouTube
- Accreditation row: labelled placeholder (do not add real marks until client confirms)
- Legal line: © 2026 CivDivCIC · Community Interest Company No. 13697459

---

## Pages ✅ VERIFIED

### Home (`/`) ✅ VERIFIED
- Hero: 2-column layout — image placeholder (left, 4:3 aspect ratio, dark rounded card) · text content (right)
- Equal horizontal space: `md:grid-cols-2 gap-16`
- H1: "No veteran should feel disconnected." with "disconnected." in accent green
- Subtext: "We empower veterans and their communities through engagement, partnership and wellbeing — preserving the legacy of Black service personnel while connecting all who served to the support they have earned."
- "Connect · Heritage · Opportunity" tagline
- WEST INDIAN ASSOCIATION OF SERVICE PERSONNEL · WINDRUSH FOUNDATION · BUILDING HEROES partner strip
- CTAs: Get Support (green) · Make a Referral (white outline)
- Mobile: text stacks on top, image below
- Big Three pathway cards: Health & Wellbeing · Housing · Employment & Skills
- Centre status strip: address + "Visit us" + "Out of hours? →" (hours `TODO[CONFIRM]`)
- Secondary pathways: Financial Guidance & Benefits · Welfare & Social Isolation · Mental Wellbeing
- "Who we are" section + No Wrong Door 3-step + partner strip + inclusion banner + Get Involved

### Support Hub (`/support`) ✅ VERIFIED
- Big Three + secondary pathway cards
- National Veteran Support Pathways: Op ASCEND · Op COURAGE · Op FORTITUDE · Op NOVA · Op RESTORE
- "Not sure where to start?" referral CTA

### Health & Wellbeing pathway (`/pathways/health`) ✅ VERIFIED
- Breadcrumb, non-clinical disclaimer, checklist, 3-step No Wrong Door, partner cards

### Crisis (`/crisis`) ✅ VERIFIED
- "In immediate danger? Call 999" red box first
- 24/7 lines: Veterans' Gateway · Combat Stress · Samaritans · NHS 111 · 999

### Referral Hub (`/referral`) ✅ VERIFIED
- 3-type toggle, 4-step form, OVA demographics, consent NOT pre-ticked
- Posts to `/.netlify/functions/submit-referral` (NOT Netlify Forms)
- Confirmation screen

### About (`/about`) ✅ VERIFIED
- Mission Statement, Vision Statement, Core Values, Our Role, Strategic Alignment, Our Approach
- Three Pillars: Support · Contribute · Celebrate
- Our Story + CIC No. 13697459
- Leadership: `TODO[CONFIRM]`
- Non-clinical disclaimer callout

### Partnerships (`/partnerships`) ✅ VERIFIED
- Filter tabs scroll with page — **NOT sticky** (sticky was removed)
- Filter tabs: All areas · Health & Wellbeing · Housing · Employment & Skills · Financial Guidance · Welfare & Social Isolation · Mental Wellbeing · Heritage
- Strategic Support & Pathway Partners (Unfunded): Blind Veterans UK · Combat Stress · DMWS · SSAFA · Forces Employment Charity · Samaritans · Royal British Legion · Veterans UK Welfare Service
- Community & Heritage Partners: WASP (Funded) · Friends of Windrush Square · Windrush Foundation

### Build Futures (`/build-futures`) ✅ VERIFIED
- CivDiv Homes, "What we are building" cards, Our Approach, Partnership Approach
- Status: "currently in development and partnership formation stage"

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

- `/heritage` — Veteran Membership & Heritage Engagement Programme, WASP, HM Armed Forces Veteran Card
- `/contact` — Address, email, general enquiry form (Netlify Forms)
- `/policies` — 7 policy documents (`TODO[CONFIRM]` dates)
- `/accessibility` — WCAG 2.2 AA statement
- `/404` — Routes back to Support Hub
- `/news` · `/get-involved` · `/donate`

---

## Backend & Infrastructure ✅ BUILT (not live-tested — requires Firebase credentials)

- `netlify/functions/submit-referral.ts` — validates → writes to Firestore europe-west2 → sends notification email with NO personal data (record ID only)
- `firestore.rules` — all client access denied; Admin SDK only
- `public/admin/` — Decap CMS with Netlify Identity, 6 collections
- `.env.example` — all required env vars documented

---

## Git & Deployment

- **Repo:** `https://github.com/jaydenmistry713-jpg/civdivcic.git` (branch: `main`)
- **Live site:** `https://civdivcic.netlify.app` (auto-deploys from main)
- Git user configured as: Jayden Mistry / jaydenmistry713@gmail.com
- `@astrojs/sitemap` temporarily disabled (version conflict with Astro 4.16) — re-enable before production deploy

### Dev server
- Run: `npm run dev -- --host` (exposes on local network for mobile testing)
- Port auto-selects (4321 typical, may increment if in use)
- Mobile: `http://192.168.0.242:<port>` on same WiFi
- **Always clear cache on fresh start if colours/styles look wrong:** delete `.astro/` and `node_modules/.vite/` then restart

---

## Known TODO[CONFIRM] Items (client must supply)

- Telephone number
- Centre opening hours
- Policy PDFs with last-updated dates
- Accreditations/memberships actually held
- SendGrid verified sender email for notifications
- reCAPTCHA site key + secret key
- Leadership team names/roles
- Partner logos and website URLs
- Priority languages for language switcher (Phase 1)
- Lawful basis & retention periods (DPO sign-off)
