# Privacy and security (EU / Spain)

_Last updated: 2026-09-23. This is a practical checklist, not legal advice. Have a gestor or lawyer review it once the business is registered._

## What the website does (done)

| Area | Status |
|---|---|
| HTTPS only + HSTS (with subdomains, preload) | ✅ |
| Content Security Policy (only our own site + Cal.com allowed) | ✅ tested in Chrome: no violations |
| X-Frame-Options / frame-ancestors (can't be embedded in other sites) | ✅ |
| nosniff, Referrer-Policy, Permissions-Policy (camera, mic, location, ad topics off) | ✅ |
| No cookies, no analytics, no ad pixels, fonts self-hosted (no Google Fonts) | ✅ |
| Booking calendar loads **only on click**, so no request to Cal.com before that | ✅ tested |
| Cal.com cookie `__cf_bm` (Cloudflare anti-bot, 30 min): strictly necessary, exempt from consent (art. 22.2 LSSI) | ✅ explained in the cookie policy |
| Legal notice + privacy policy + cookie policy, EN `/legal/` and ES `/es/legal/` | ✅ **except NIF and address** |
| Short data-protection notice under the calendar and the WhatsApp form (the first layer of information that Spanish law, LOPDGDD art. 11, asks for) | ✅ |
| `/.well-known/security.txt` (tells people how to report a security problem) | ✅ expires 2027-09-23, renew it |

## Still to do (Nicolás)

- [ ] **NIF + postal address** in the legal notice (LSSI art. 10 requires them). If you don't want your home address public, use a business address, a coworking space or a mail service.
- [ ] **Two-factor authentication (2FA)** on: Gmail (300sunvalencia), Cal.com, GitHub (nikomaster7), Vercel, Porkbun, and later Meta/Google Business. This is the single most important security step.
- [ ] **Delete Cal.com API keys** after each use (the two shared in chat on 2026-09-23 must be deleted).
- [ ] **Password manager** (see next-session.md).
- [ ] Accept the **data processing agreements (DPAs)**: Cal.com and Vercel include them in their terms. Keep a note that you accepted them. The free Gmail has **no** DPA; when the business is formal, move business email to Google Workspace (which has one).
- [ ] **Keep records only as long as needed**: delete bookings and WhatsApp chats older than 12 months (except anything tax requires you to keep).
- [ ] **Record of processing activities** (GDPR art. 30): see below. Keep it updated.
- [ ] If you add **Meta Pixel / Google Ads tags** for the campaigns: first add a cookie consent banner, update the cookie policy, and remove the "no tracking cookies" line from the footer.

## Record of processing activities (simplified)

| Processing | Data | Purpose | Basis | Processors | Retention |
|---|---|---|---|---|---|
| Walk bookings | Name, email, WhatsApp, group size, ship/all-aboard, source, notes | Arrange and run walks | Art. 6.1.b | Cal.com (US), Google, Microsoft | 12 months after the walk (+ tax records) |
| Enquiries | Message, name, phone/email | Answer, quotes | Art. 6.1.b / 6.1.f | WhatsApp (Meta), Google | 12 months |
| Website | IP, technical logs | Serve and secure the site | Art. 6.1.f | Vercel (US) | Vercel's log retention (days) |

## If there's a data breach
If personal data is lost or exposed (a hacked account, a leaked API key with access to bookings): change passwords, revoke keys, and within **72 hours** assess whether it has to be notified to the AEPD (sede.aepd.gob.es). If the risk to people is high, also tell the people affected.
