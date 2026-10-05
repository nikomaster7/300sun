# Website: decisions and checklist

Built following the master prompt (from another hostel project), adapted to 300sun. Design reference: pasaje94.com.

## Stack (prompt section 1)
- Hand-written HTML, CSS and JS, no framework and no site builder (option **c** of the prompt). No generator meta tags, and class names are specific to this project (`.route`, `.band`, `.figures`, `.ask`).
- Hosted on **Vercel** at https://300sun.com (project `300sun`), connected to GitHub: every push to `main` publishes automatically. `vercel.json` points it at `site/`.
- Fonts are self-hosted (Inter + Instrument Serif), so there are no calls to Google. That's why the footer can honestly say **"No cookies, no tracking"**, and why no cookie banner is needed.
- Two real languages: English at `/`, Spanish at `/es/`, with `hreflang`. English is the default because the main buyers are US cruise passengers.
- JSON-LD `TravelAgency` with the real phone number. No street address because there's no office; add one if that changes.
- Booking: the enquiry form **opens WhatsApp with the message already written** (service, date, people, ship, name). It works today, with no backend.

## Design (section 4), taken from pasaje94
- Off-white paper `#f5f5f3`, ink `#1a1a1a`, lots of air, thin rules, numbered index lists (like their exhibition list).
- One accent colour: **sun** `#e9a23b`, used only as a dot or fill (the logo is a small sun).
- Each section uses a different layout, so the page doesn't repeat one mould:
  hero (text + index, **no hero photo**) → walks (price card + timetable) → cruise (big serif promise + timeline) → paella (**dark band**, photo mosaic, ingredients list with the forbidden ones crossed out) → groups (big numbers) → courses (table rows) → why direct (split black/white) → about → FAQ → form.
- Personality details:
  - The hero shows **today's sunrise and sunset in Valencia**, calculated live (it's the "300 sun" idea).
  - **Presentation mode:** press **P** (or the footer button, or add `?present` to the URL) and every section becomes a full-screen slide; arrow keys move, Esc exits. This is how the site doubles as your presentation.

## Copy (section 2)
- Written from Nicolás, first person, with short lines and some colloquial ones.
- Local specifics throughout: Torres de Serranos, Water Tribunal on Thursdays at noon, 207 steps up the Micalet, Lonja UNESCO 1996, Mercado Central, horchata with fartons, the 1957 flood and the Turia park, Malvarrosa by tram 4/6 or bus 19, paella at lunch not dinner, ferraura and garrofó.
- The walks are described as **"private walks with a local"**, not "official guided tours", until the guide licence arrives (see market-research.md §4). Change that wording once you're licensed.

## Photos (section 3)
Real photos only. Nothing generated, nothing from stock. Until a photo is uploaded, its frame shows a small caption instead of a broken image.

Prepare each photo with:

```
tools/prepare-photos.sh <original.jpg> <folder> <name>
```

| Where | folder | name |
|---|---|---|
| Paella, big | paella | 300sun-valencia-paella-valenciana-1 |
| Paella, workshop | paella | 300sun-valencia-paella-valenciana-2 |
| Paella, served | paella | 300sun-valencia-paella-valenciana-3 |
| Hostel room | hostels | 300sun-valencia-hostel-habitacion-grupo |
| Hostel common area | hostels | 300sun-valencia-hostel-zona-comun |
| Hostel terrace | hostels | 300sun-valencia-hostel-terraza |
| San Nicolás church (Nicolás's own photo) | valencia | 300sun-valencia-iglesia-san-nicolas |
| Seafood paella lunch after a walk (Nicolás's own photo) | valencia | 300sun-valencia-paella-marisco-almuerzo |

**Photo rights (2026-10-05):** the paella workshop photos (`images/paella/`) belong to the company Nicolás works for; permission to use them is **still to be asked**. Nicolás's own photos come first on the walk pages (home EN/ES, /cruise/, /advisors/, the one-pager). If permission is refused, remove the `images/paella/` photos.
**Hostels (2026-10-05):** only the garden terrace photo is real and on the site (one wide photo in Groups, EN/ES). The storefront photo with the "u." sign and travellers with suitcases was **not used**: it looks AI-generated (rule: real photos only). Room and common-area photos still to come.
**Faces:** never publish a photo of identifiable guests without their written OK (GDPR). The couple at the seafood paella is on hold until they agree.
**One look for all photos:** `python3 tools/prepare-photos.py <photo> <folder> <name>` resizes, applies the same edit (warmer, a bit more contrast and colour, lifted shadows, light sharpening) and strips location data. All current photos went through it on 2026-10-05.

## Nicolás to confirm (these are my assumptions in the copy)
- [x] Prices: walk €150 (3 h, up to 4) / cruise day €280 (6 h, up to 4, Claude's proposal, to confirm) / +€30 per person / paella from €65
- [x] Payment (decided 2026-10-04): €45 deposit (30% of the €150 walk) by PayPal link after booking; rest at the end of the walk in cash, Bizum or PayPal. Deposit refunded in full if cancelled 48 h+ before, or if the ship doesn't dock. PayPal Business account. No PayPal script on the site, so no CSP change.
- [ ] "I usually answer the same day"
- [x] About section removed for now (Nicolás prefers not to present himself yet). **Changed 2026-10-05:** Nicolás now appears as "Hi, I'm Nico" with his photo at the City of Arts and Sciences (home EN/ES in place of the "20–30% vs 100%" block, /cruise/, /advisors/)
- [ ] Hostel photos show a room, a common area and a terrace. Change the list if a hostel has no terrace.
- [ ] Legal notice (aviso legal: name + NIF), required by the LSSI once the site is selling

## Decisions 2026-10-05: hooks for US clients
- **Dollar prices** next to euros everywhere a price shows (EN and ES): €150 ≈ $170, €30 ≈ $35, €65 ≈ $75, deposit €45 ≈ $50. Always "approximate, you pay in euros". Assumed rate ~1.15 $/€.
- **Back-on-board promise** (cruise page band + FAQ, home cruise note EN/ES): "If we're ever running tight, I put you in a taxi to the cruise terminal and I pay the fare." Nicolás to confirm the wording.
- **/advisors/** page for US travel advisors (English only, like /cruise/; linked from both home footers): 10% commission on what the client pays (walk, extra people, paella; not tips, tickets, food), paid by PayPal or bank transfer within 7 days of the walk. Advisors identify themselves under "How did you hear about us?" in Cal.com. Nicolás to confirm the 10% and the 7 days.
- **One-pager PDF** for advisors: `site/advisors/300sun-travel-advisors.pdf` (US Letter, QR to /advisors/?utm_source=onepager). Source `tools/onepager/advisors.html`; rebuild with `tools/make-onepager.sh` after any price or wording change.

## Decisions 2026-10-05 (after ChatGPT's design review)
Applied: /cruise/ headline "See Valencia. Get back to your ship on time."; ship → taxi → walk → taxi → back on board strip; one in three jokes cut (kept the rude gargoyles); route times marked as approximate; "Hi, I'm Nico" replaces the commission comparison; /advisors/ leads with 10% + paid within 7 days and a "For your peace of mind" checklist.
Not now: blue buttons (palette option A, #174A55), new logo (concept: a small sun with 3 rays built from the "3"), more photos (list in next-session.md). Fonts stay Instrument Serif + Inter.
