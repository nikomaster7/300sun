# Working on 300sun

- **Pushing to `main` publishes https://300sun.com** (Vercel serves `site/` as-is, no build step). Commits must be authored as Nicolás Maldonado <nicolasmusicplus@gmail.com> (he agreed on 2026-10-05): Vercel's free plan blocks deploys from any other commit author. Check changes locally first: `cd site && python3 -m http.server`, then look at phone width (375px) and desktop.
- Hand-written HTML, CSS and JS. No framework, npm packages or site builder. Styles in `site/assets/css/300sun.css`, scripts in `site/assets/js/300sun.js` (holds `CAL_LINK` for Cal.com).
- Two languages: every text change on an English page also goes in its Spanish twin under `site/es/`.
- `vercel.json` has a strict Content-Security-Policy (only our own files + cal.com). Anything new from outside (PayPal, Meta Pixel, Google tags, embeds, fonts) must be added there or the browser blocks it silently.
- The footer promises no cookies and no tracking. Adding any tracker means, on the same day: cookie banner with consent, `/legal/#cookies` updated, footer text changed (`docs/next-session.md`, item 5).
- Photos: real only, never generated or stock. Resize and edit with `python3 tools/prepare-photos.py` (same look for every photo, strips GPS); names and places in `docs/site-decisions.md`.
- Copy: first person from Nicolás, short lines. Say "private walks with a local", not "guided tours", until the guide licence arrives.
- Start of a session ("300sun homework"): read `docs/next-session.md`. Record new decisions in `docs/site-decisions.md`.
