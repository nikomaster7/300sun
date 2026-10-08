# Homework and next session

_Written 2026-09-23. Nicolás travels to the USA 28 Oct – 13 Nov 2026; everything should be ready before then._

## Next session: what we'll work on
1. ~~**PayPal payments**~~: decided 2026-10-04 (€30 deposit by PayPal link, rest at the end; lowered from €45 on 2026-10-08). Site updated. Your part is in the list below and in `docs/booking-setup.md` §5.
2. **Instagram + Facebook**: create the Facebook Page and Instagram @300sun in Meta Business Suite, profile photo (brand/300sun-logo-dark.png), bio, link to 300sun.com/cruise, and the first 6–9 posts with the real photos.
3. **Google Business Profile**: create it as a service-area business (no public address), verify it, and set up the review link to send to past clients.
4. **Storing passwords safely**: choose and set up a password manager (e.g. Bitwarden, free, or 1Password), move every 300sun account into it, and turn on 2FA everywhere.
5. **Cookie banner + ad tracking (only when the ads launch)**: install CookieConsent (open source, free) with Google Consent Mode v2, then the Meta Pixel and Google Ads tag, both loading only after consent. Update the cookie policy (/legal/#cookies) and remove "No tracking cookies" from the footer, all on the same day.

## Pending from today
- [ ] **Check the facts on the new cruise port guide** (300sun.com/cruise-port): ship shuttle about €10 return, taxi about €10 each way, city bus line 4 about €1.50, 15–30 min rides. They come from cruiser reports; correct anything you know is different
- [ ] **Google Business Profile** (once created): real opening hours (e.g. 8:00–20:00 every day), real photos and 2–3 short videos, one post a week (a photo from the walk + one line). Never AI-generated photos
- [ ] **Ask for a Google review after every walk**, the same day, ideally with a 10-second video. Steady new reviews beat many old ones
- [ ] **Film short vertical videos** on walks (Torres de Serranos, the market, horchata, the taxi pick-up) and say the search words out loud ("Valencia shore excursion", "from the cruise port to the old town"). Claude can write scripts and subtitles
- [ ] **Join the conversation where cruisers ask**: Cruise Critic Valencia board, roll calls of 2027 ships, r/Cruise, r/valencia, Facebook cruise groups. Help first, link only when asked. Note every repeated question and send it to Claude for the FAQ
- [ ] **Check the search words** in `docs/marketing/youtube-learnings-seo.md` in Google Keyword Planner (free with a Google Ads account) and send Claude the top 10 by volume
- [ ] Ask Claude for the **emails to bloggers** with "best private tours in Valencia" lists, then send them
- [ ] Watch the videos in `docs/marketing/youtube-learnings-seo.md` when you have time (Darren Shaw's and Ahrefs' first)
- [ ] Set up the commission sheet in Google Sheets (15 min, on a computer): `docs/agencias/google-sheets-setup.md`. Or connect Google Drive at claude.ai/customize/connectors and start a new session so Claude can do the Drive part
- [ ] Book a first consultation with a **gestor**: questions ready in `docs/gestor-preguntas.md`
- [ ] Test the agency link on your phone: https://300sun.com/cruise/?ref=test-agency (see `docs/agencias/como-funciona.md`)
- [ ] **Photos before 28 Oct** (phone, vertical and horizontal): you waiting at Torres de Serranos; walking with 2–4 guests (from behind or the side); you pointing something out (a gargoyle, a door), camera behind the guests; San Nicolás with a person for scale; Mercado Central with people and stalls; horchata and fartons with a hand in the shot; the cruise terminal taxi rank; you checking the time while walking. Send the originals (email or Drive, not WhatsApp)
- [ ] Logo: brief a designer on the "sun with 3 rays from the 3" idea (Claude can write the brief)
- [ ] Ask the company for **permission to use the paella workshop photos** (otherwise they come off the site)
- [ ] Ask the American couple from the paella photo if you can **show their photo on the site** (a WhatsApp "yes" is enough); then Claude adds it
- [ ] Is **San Nicolás** a regular stop on the walk? If yes, add it to the route
- [ ] Confirm the wording of the **back-on-board promise** (taxi paid by you) and the **advisor terms** (15%, paid within 7 days). See `docs/site-decisions.md`, 2026-10-05
- [ ] Print the advisors one-pager (`300sun.com/advisors/300sun-travel-advisors.pdf`) for the USA trip
- [x] PayPal account opened with 300sunvalencia@gmail.com; PayPal.me is `@300sun` (2026-10-04)
- [x] PayPal upgraded to a **Business** account (type Individual, trading name 300sun, identity confirmed) (done 2026-10-08)
- [x] Deposit text and PayPal link added to the Cal.com event description through the API (done 2026-10-08)
- [x] Walks of 4 h (€200) and 6 h (€300) added: site, advisors page, one-pager with rate table, and Cal.com (one event, the guest picks 3, 4 or 6 h) (2026-10-08)
- [ ] Decide what fills the **4 h and 6 h walks** (extra stops, lunch) and tell Claude, so the site can describe them
- [ ] In Cal.com, check the walk event on your phone: the 3 / 4 / 6 h choice shows and the times offered make sense for a 6 h walk
- [ ] PayPal: turn on 2FA. Test the deposit link with a payment from someone you trust and refund it
- [ ] Delete the Cal.com API key `claude-oct8` (Settings → Developer → API keys) and the key file in Downloads
- [ ] Make a test booking and check the confirmation email shows the deposit line and link; cancel it afterwards
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
