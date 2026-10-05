# Hoja de comisiones en Google Sheets, rellenándose sola

Hazlo desde un **ordenador**: las partes 2 y 3 no se pueden hacer desde el móvil. Tarda unos 15 minutos.

**Resultado:** cada reserva hecha con un enlace de agencia (`300sun.com/cruise/?ref=…`) añade sola una fila en la pestaña **Reservas** con la fecha, la agencia, el cliente y las personas. Si la reserva se cancela o cambia de fecha, la fila se actualiza. **El importe y "Pagada" los sigues poniendo tú**, porque el resto se cobra en el paseo.

## 1. Subir la hoja a Google Sheets
1. Entra en **drive.google.com** con 300sunvalencia@gmail.com.
2. **Nuevo → Subir archivo** → elige `300sun-comisiones-agencias.xlsx` (de esta carpeta: `docs/agencias/`).
3. Ábrelo y pulsa **Archivo → Guardar como hoja de cálculo de Google**. A partir de ahora usa esa copia, la que tiene el icono verde.
4. **Archivo → Configuración → Zona horaria: (GMT+01:00) Madrid**. Así las fechas salen bien.

## 2. Pegar el programa (Apps Script)
1. En la hoja: **Extensiones → Apps Script**.
2. Borra lo que haya y pega todo el contenido de `tools/google-sheets/cal-webhook.gs`.
3. En la línea `const SECRET = 'CAMBIA-ESTO-…'` pon una palabra larga inventada, por ejemplo `naranja-micalet-2027-xq`. **No la compartas.**
4. Guarda (icono del disquete).
5. **Prueba:** arriba elige la función `testWithFakeBooking` y pulsa **Ejecutar**. Google pedirá permisos ("Revisar permisos" → tu cuenta → "Configuración avanzada" → "Ir a…" → Permitir). Es normal: el programa es tuyo y solo toca esta hoja.
6. Vuelve a la hoja: en **Reservas** debe aparecer una fila de "Test client" con la agencia `test-agency`. Bórrala.

## 3. Publicarlo para que Cal.com pueda avisarle
1. En Apps Script: **Implementar → Nueva implementación**.
2. Tipo (el engranaje): **Aplicación web**.
3. **Ejecutar como:** Yo. **Quién tiene acceso:** Cualquier usuario.
4. **Implementar** → copia la **URL de la aplicación web** (termina en `/exec`).

"Cualquier usuario" solo quiere decir que Cal.com puede enviarle datos. Sin la palabra secreta, el programa no escribe nada.

## 4. Conectar Cal.com
1. **cal.com → Settings → Developer → Webhooks → New**.
2. **Subscriber URL:** la URL del paso 3, con tu palabra al final: `https://script.google.com/macros/s/…/exec?key=naranja-micalet-2027-xq`
3. **Event triggers:** marca **Booking Created**, **Booking Cancelled** y **Booking Rescheduled**.
4. Deja el resto como está y guarda.
5. **Prueba de verdad:** abre `https://300sun.com/cruise/?ref=test-agency`, haz una reserva para un día libre con tu email y comprueba que aparece la fila en la hoja. Luego cancélala en Cal.com y mira que la fila dice "CANCELADA".

## Si algo no funciona
- **No aparece nada:**
  - Revisa que la palabra de `?key=` es idéntica a la del `SECRET`.
  - En Apps Script → **Ejecuciones** se ve si llegó el aviso y qué error dio.
- **Cal.com marca el webhook como fallido pero la fila aparece:** es normal con Google (responde con una redirección). Mientras la fila aparezca, funciona.
- **Si cambias el programa**, vuelve a **Implementar → Gestionar implementaciones → Editar → Nueva versión**. Si no, sigue funcionando la versión anterior.
- **El número de personas no aparece:** la pregunta de Cal.com debe llamarse con algo que incluya "people" o "personas" (Cal.com → evento → Advanced → la pregunta → Identifier).

## Privacidad
Los nombres de los clientes quedan en tu Google Drive. Google ya figura como proveedor en la política de privacidad de la web, así que no hay que cambiar nada.
