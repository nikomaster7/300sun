# Documentos de 300sun: dónde está cada cosa

Para leerlos desde el móvil: **github.com/nikomaster7/300sun** → carpeta `docs/`. Los `.md` se ven con formato en GitHub. Las hojas `.xlsx` se descargan y se abren con Excel, Numbers o Google Sheets.

## Empieza aquí
- **`next-session.md`**: deberes y pendientes. Es lo primero que se lee en cada sesión ("300sun homework").
- **`site-decisions.md`**: todo lo decidido sobre la web (textos, fotos, logo, precios, permisos pendientes).

## Negocio y dinero
- `business-plan.md`: el plan de negocio.
- `market-research.md`: competencia y precios en Valencia.
- **`gestor-preguntas.md`**: preguntas para la primera consulta con el gestor (alta, IVA, licencia, comisiones).

## Agencias y travel advisors (`agencias/`)
- **`agencias/como-funciona.md`**: el modelo del 15 %, los enlaces por agencia, cómo probarlo y cómo automatizarlo.
- **`agencias/300sun-comisiones-agencias.xlsx`**: la hoja de comisiones (reservas, agencias, lo que debes).
- **`agencias/google-sheets-setup.md`**: cómo subirla a Google Sheets y que se rellene sola con cada reserva de agencia.
- El PDF que se da a las agencias: `site/advisors/300sun-travel-advisors.pdf` (también en 300sun.com/advisors).

## Ventas en EE. UU. y marketing
- `usa-campaign.md`: el plan para EE. UU. (viaje del 28 oct al 13 nov, anuncios, agencias).
- `meta-ads-handover.md`: qué pasó con la cuenta publicitaria de Meta y cómo llevar los anuncios de Facebook e Instagram (para la mujer de Nicolás).
- `google-business-profile.md`: alta y textos del perfil de Google.
- `marketing/cruise-paella-campaign.md`: borrador de campaña para cruceristas.
- **`marketing/youtube-learnings-seo.md`**: lo que enseñan 5 YouTubers (Ahrefs, Darren Shaw, Greg Isenberg, Jeff Su, Chris Raroque) sobre SEO, búsqueda con IA y vibe coding, aplicado a 300sun, con prioridades y palabras clave para cruceros.

## Configuración y legal
- `booking-setup.md`: Cal.com, la señal de PayPal y los avisos al email personal.
- `domain-and-email.md`: dominio 300sun.com y correo.
- `privacy-and-security.md`: privacidad, cookies y seguridad (UE).

## Fuera de `docs/`
- `brand/`: el logo (sol-3) en SVG y las fotos de perfil en PNG para Instagram y WhatsApp.
- `site/`: la web tal cual se publica. Las fotos están en `site/images/`.
- `tools/`: pequeños programas:
  - `prepare-photos.py`: edita y redimensiona fotos.
  - `logo/make-logo.py`: genera el logo.
  - `make-onepager.sh`: genera el PDF de agencias.
  - `make-commission-sheet.py`: crea la hoja de comisiones vacía.
  - `faq-schema.py`: copia las preguntas frecuentes al formato que lee Google (ejecutar tras cambiar una FAQ).
  - `google-sheets/cal-webhook.gs`: el programa que va dentro de la hoja de Google (con su prueba `test.js`).
