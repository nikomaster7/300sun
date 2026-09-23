# Homework and next session

_Written 2026-09-23. Nicolás travels to the USA 28 Oct – 13 Nov 2026; everything should be ready before then._

## Next session: what we'll work on
1. **PayPal payments**: how guests pay (deposit and/or at the end), a PayPal Business or personal account for the test phase, payment links or Cal.com integration, and what changes on the site and in the booking confirmation.
2. **Instagram + Facebook**: create the Facebook Page and Instagram @300sun in Meta Business Suite, profile photo (brand/300sun-logo-dark.png), bio, link to 300sun.com/cruise, and the first 6–9 posts with the real photos.
3. **Google Business Profile**: create it as a service-area business (no public address), verify it, and set up the review link to send to past clients.
4. **Storing passwords safely**: choose and set up a password manager (e.g. Bitwarden, free, or 1Password), move every 300sun account into it, and turn on 2FA everywhere.
5. **Cookie banner + ad tracking (only when the ads launch)**: install CookieConsent (open source, free) with Google Consent Mode v2, then the Meta Pixel and Google Ads tag, both loading only after consent. Update the cookie policy (/legal/#cookies) and remove "No tracking cookies" from the footer, all on the same day.

## Pending from today
- [ ] Give Claude your **NIF + postal address** for the legal notice (or decide on a business address)
- [x] Delete the Cal.com API key shared today (done 2026-09-23)
- [ ] **Turn on two-step verification (2FA)**: Gmail, Cal.com, GitHub, Vercel, Porkbun
- [ ] Check Google Calendar on **2 Oct** for a leftover test "Old town walk" event
- [ ] Optional: in Porkbun, change the A record from 76.76.21.21 to 216.198.79.1 (Vercel's newer value)
- [ ] Set up Porkbun email forwarding hola@300sun.com → 300sunvalencia@gmail.com (if not done)
- [ ] Booking questions and calendar design: to review together

## Where things are
- Site: https://300sun.com (Vercel project `300sun`, auto-deploys from GitHub `nikomaster7/300sun`, branch `main`)
- Booking: https://cal.com/300-sun/old-town-walk (don't change the username without updating `CAL_LINK` in `site/assets/js/300sun.js`)
- Plans: `docs/usa-campaign.md`, `docs/booking-setup.md`, `docs/domain-and-email.md`, `docs/privacy-and-security.md`
