# Website: decisions and checklist

Built following the master prompt (from another hostel project), adapted to 300sun. Design reference: pasaje94.com.

## Stack (prompt section 1)
- Hand-written HTML, CSS and JS, no framework and no site builder (option **c** of the prompt). No generator meta tags, and class names are specific to this project (`.route`, `.band`, `.figures`, `.ask`).
- Hosted on **GitHub Pages** from the `gh-pages` branch, which holds the contents of `site/`. To publish after changes: `git subtree push --prefix site origin gh-pages`. A custom domain can be added later.
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
| Nicolás portrait | valencia | 300sun-valencia-nicolas-maldonado |

## Nicolás to confirm (these are my assumptions in the copy)
- [ ] Prices: walk €180 / cruise day €340 / +€30 per person / paella from €65
- [ ] Payment: "small deposit, rest on the day"
- [ ] "I usually answer the same day"
- [ ] About text: "I teach English and Spanish and walk people through the city most weeks"
- [ ] Hostel photos show a room, a common area and a terrace. Change the list if a hostel has no terrace.
- [ ] Legal notice (aviso legal: name + NIF), required by the LSSI once the site is selling
