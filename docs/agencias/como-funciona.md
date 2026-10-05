# Agencias y travel advisors: cómo funciona

_Decidido el 6 oct 2026. Página pública: https://300sun.com/advisors/ (inglés)._

## El modelo (de momento)
1. La agencia manda al cliente a **su enlace propio**. El cliente reserva en el calendario como cualquier otro.
2. El cliente **me paga a mí**: 45 € de señal por PayPal y el resto al acabar el paseo.
3. En los **7 días siguientes al paseo**, le pago a la agencia el **15 %** de lo que pagó el cliente, por PayPal o Wise. No cuentan las propinas, las entradas ni la comida.

Así **no tengo que facturar a la agencia**: ella no me paga nada. Le pido un recibo o factura de su comisión y lo guardo.

**Más adelante (cuando esté dado de alta):** precio neto. La agencia cobra al cliente y me paga 127,50 € por un paseo de 150 €, y yo le hago factura. En la web ya pone que lo estoy preparando.

## Enlaces por agencia
- Formato: `https://300sun.com/cruise/?ref=nombre-agencia` (minúsculas y guiones).
- **Enlace de prueba:** https://300sun.com/cruise/?ref=test-agency
- Qué pasa al usarlo:
  - El cliente ve la página normal.
  - Al reservar, Cal.com recibe `utm_source=advisor` y `utm_campaign=nombre-agencia`.
  - Las **notas** de la reserva llevan escrito *"Referred by travel advisor: nombre-agencia"*. Lo ves en el email de la reserva y en Cal.com.
- El código se recuerda mientras el cliente navega por la web, aunque vaya a otra página antes de reservar.
- **Cómo probarlo:** abre el enlace de prueba en el móvil, pulsa "See available days" y mira que en el formulario de reserva, en las notas, aparece el texto. No hace falta terminar la reserva.

## La hoja de comisiones
`docs/agencias/300sun-comisiones-agencias.xlsx`. Se abre con Excel, Numbers o Google Sheets.
- **Reservas:** una fila por cada servicio vendido por una agencia. Rellenas fecha, código ref, cliente, servicio, personas e importe. La comisión (15 %) y la fecha límite de pago (+7 días) salen solas.
- **Agencias:** una fila por agencia. Su enlace, el total vendido, la comisión total y **lo que les debes** salen solos.
- **Ajustes:** el 15 % y los 7 días. Si los cambias aquí, cambia también la web y el PDF.
- Las filas de "test-agency" son ejemplos: bórralas cuando haya reservas reales.
- Para empezar de cero: `python3 tools/make-commission-sheet.py` (borra la hoja actual).

## Para que se rellene sola
Paso a paso: **`docs/agencias/google-sheets-setup.md`**. El resumen:
1. Subir la hoja a **Google Sheets**.
2. Crear en esa hoja un pequeño **Apps Script** gratuito que reciba los avisos de Cal.com.
3. En Cal.com → Settings → Developer → **Webhooks**, añadir la dirección del script con el evento "Booking created".

Cada reserva con `?ref=` añadirá una fila en "Reservas" con fecha, agencia, cliente y personas. El importe y el "Pagada" se siguen poniendo a mano, porque el cobro final es en el paseo. Alternativa sin código: Zapier o Make (Cal.com → Google Sheets), que tienen plan gratis limitado.
