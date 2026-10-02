# Hostel de mujeres con self check-in: proveedores para cotizar

Investigación del 2 de octubre de 2026. Objetivo: tener presupuestos antes de diciembre de 2026 para automatizar los accesos del hostel (Valencia) y convertirlo en un hostel solo de mujeres.

## 1. Qué dicen las reseñas: por qué la gente se queda fuera

No hay una base de datos pública que cuente las reseñas de "me quedé fuera" por hotel, así que no se puede sacar un ranking exacto. Lo que sí se ve leyendo reseñas es que **los fallos casi nunca son de la marca de la cerradura. Vienen de cómo está montado el proceso:**

| Caso | Qué falló | Lección |
|---|---|---|
| **Limehome** (apartahotel 100 % digital, también en Madrid y Barcelona) | Códigos que no funcionan a la 1:00, web de auto check-in caída, soporte 24/7 que no contesta, código cambiado sin avisar. Huéspedes 20–45 min esperando en la puerta. | Si hay **un solo método** de entrada y nadie al teléfono, el fallo acaba en reseña de 1 estrella. |
| **Up! Hostel Valencia** (la competencia directa en la ciudad) | Check-in obligatorio por la app STAYmyway. Reseñas: "la app de la puerta nunca funcionó", "si el móvil se queda sin batería no entras", cobran 5 € por hacer el check-in en recepción. | En un hostel, **la app como única llave da problemas**: la gente va a la ducha sin el móvil y se le acaba la batería. |
| **Xataka** (hotel sin recepción, San Francisco) | El email con el código nunca llegó y nadie cogió el teléfono. El periodista acabó en otro hotel. | El código tiene que llegar **por dos canales** (email + WhatsApp/SMS) y también tiene que poder verse en la propia web del check-in. |
| **Lamia BBK Women Hostel** (Bilbao, solo mujeres, desde 2025) | La recepción cierra a las 20:00. Si llegas más tarde, te mandan un check-in online para entrar por tu cuenta. | Un modelo híbrido (personal de día y automático de noche) funciona en un hostel de mujeres. |
| **a&o Hostels** (cadena alemana) | Check-in en el kiosko o en la app, y luego la habitación se abre con un botón "Abrir puerta" en la app. Las habitaciones solo para mujeres también van con llave digital. | Es el modelo más parecido a lo que queremos, a escala de cadena. |

**Conclusión para el diseño:**

1. **Dos formas de entrar como mínimo** en cada puerta: PIN en un teclado **y** móvil/tarjeta o pulsera. Nada que dependa solo del móvil.
2. **Que funcione sin internet**: la cerradura guarda los códigos aunque se caiga el wifi.
3. **Código enviado por dos canales**, y que no se cambie nunca sin avisar.
4. **Teléfono o WhatsApp de guardia de noche** con alguien que pueda abrir en remoto. Este es el punto que más reseñas malas evita.
5. Para un hostel de mujeres: **verificar el DNI/pasaporte + selfie antes de dar el código.** Así se comprueba que quien entra es la huésped y no otra persona con su código.

## 2. Qué hay que automatizar (4 capas)

| Capa | Para qué | Proveedores |
|---|---|---|
| A. Puerta de la calle / portal del edificio | Que entre de madrugada sin llave | Raixer, Nuki Opener, Akiles (lector en la puerta), Salto |
| B. Puerta del hostel y de las habitaciones | Una llave por huésped y por fechas | Salto, Akiles, Omnitec, Nuki (solo puertas sueltas) |
| C. Taquillas de cada cama | Seguridad dentro del dormitorio | Ojmar (pulsera RFID), Salto XS4 Locker |
| D. Check-in online + parte de viajeros (SES.Hospedajes) | Obligatorio en España; registro antes de recibir el código | Chekin, Partee, BookCheckin, Check-in Scan, Gotocheck |
| (E. PMS) | Conecta reservas → check-in → llaves | Cloudbeds (tiene kiosko de self check-in), Mews, Avirato |

## 3. Shortlist para pedir presupuesto

### Cerraduras y control de acceso (lo principal)

1. **Salto Systems** (español, de Oiartzun). Es el estándar en hoteles y lo usan **Líbere Hospitality** (que tiene apartahotel en Valencia) y Hoomvip.
   - **Salto KS** (en la nube): llaves por app, tarjeta, pulsera o PIN. La cerradura guarda las llaves aunque se caiga internet. Se paga una suscripción anual por tramos (Lite/Pro, se compra con vouchers). El hardware se presupuesta aparte con un instalador.
   - Se conecta con Cloudbeds, Mews, Avirato y Host PMS, y con las taquillas Salto XS4.
   - Pedir a: un instalador oficial Salto en Valencia (los distribuidores tipo Bydemes te pasan uno).
2. **Akiles** (español). Pensado para hoteles, hostels, coworkings y pisos turísticos. Abre con el móvil, con PIN y en remoto. Está integrado con Cloudbeds, Hostify y Civitfun.
   - Hostale lo usa para el check-in autónomo de sus alojamientos.
   - Suele salir más barato que Salto. Pedir precio por puerta + cuota mensual.
3. **Omnitec Systems** (español). La solución **Rent&Pass** es justo para "hoteles sin recepción 24 h, hostales y hoteles boutique". Abre con código numérico sin app, por Bluetooth u online, y se puede dar acceso por horas a limpieza. Está integrado con Chekin.
4. **Raixer** (español). Para el **portal del edificio** si es compartido con vecinos. Se conecta al telefonillo desde dentro, así que **no hace falta permiso de la comunidad**. La huésped puede abrir con una llamada perdida. Unos 119 € el dispositivo + 9,99 €/mes.
5. **Nuki** (solo como opción barata o de apoyo). Smart Lock Pro a 269 € + Keypad 2 con huella a 159 €. Buba House Barcelona (hostel sin recepción) funciona con Nuki. Para un hostel con muchas puertas es mejor un sistema profesional como Salto, Akiles u Omnitec.

> **Ojo con STAYmyway / Operto** (lo que usa Up! Hostel Valencia): mismas reseñas negativas que arriba. Si se cotiza, exigir PIN de respaldo.

### Taquillas

6. **Ojmar** (español, Elgoibar). La OTS 20 es "la cerradura de taquilla RFID más vendida del mundo": funciona con tarjeta o pulsera y la pila dura hasta 10 años. La OTS 40 es online, con RFID, Bluetooth y NFC. La idea es que la **misma pulsera** abra la puerta (si Salto o Akiles lo permiten) y la taquilla.

### Check-in online + SES.Hospedajes + verificación de identidad

7. **Chekin**: escanea documentos de 150 nacionalidades y tiene **verificación biométrica (selfie + DNI + liveness)**. Solo da el código **después** de verificar a la huésped. Se integra con más de 20 marcas de cerraduras (Omnitec, Akiles, Nuki…). Precio: desde 3,95–7,95 €/unidad/mes; la verificación de identidad es una función premium y hay comisiones en los pagos (1,5 % + 0,30 €).
8. **Partee**: la opción más barata (desde 0,99 €/mes). Sirve para cumplir con SES, pero es más básica.
9. Alternativas: **BookCheckin** (desde 3 €/mes, Nuki/TTLock/Igloohome), **Check-in Scan**, **Gotocheck**.

### PMS (para unirlo todo)

10. **Cloudbeds**: muy usado en hostels, tiene **modo kiosko** para el self check-in y se integra con Salto y Akiles (a través de Enso Connect, Flexipass o LOXE).
11. **Avirato** (español): integrado con Salto KS y con SES.

## 4. Combinaciones recomendadas

| Opción | Combo | Para quién |
|---|---|---|
| **Pro (recomendada)** | Salto KS (portal + habitaciones + taquillas) + Cloudbeds + Chekin con verificación biométrica | Lo más robusto: funciona sin internet y es lo que usa la competencia seria (Líbere) |
| **Media** | Akiles u Omnitec + Raixer en el portal + Ojmar en las taquillas + Chekin | Menos inversión inicial, todo de empresas españolas |
| **Mínima** | Nuki + Keypad 2 + Nuki Opener + Partee | Solo si son pocas puertas; no escala bien |

### Ya tenemos RoomRaccoon → Salto KS + RoomRaccoon (decidido como combinación base)

- **Encaja:** RoomRaccoon tiene integración oficial con Salto KS y RoomRaccoon aparece en la lista de partners tecnológicos de Salto. Salto KS genera los códigos y se los pasa a RoomRaccoon, que los envía a la huésped con el check-in online, antes de que llegue.
- **Caso real en España:** Cerdanya Mountain Residences (6 unidades, Lleida, se gestiona en remoto) usa RoomRaccoon + Salto KS. Tiene un 100 % de check-in online y una nota media de 9,8 en las OTAs.
- **RoomRaccoon ya cubre** el check-in online, el DNI digital y el envío automático a **SES.Hospedajes** (lo manda cada día a las 04:00 UTC para las reservas con check-in hecho). También tiene **kiosko de self check-in** a través de Roommatik. Así que **Chekin probablemente sobra.** Solo valdría la pena si queremos la verificación con selfie que RoomRaccoon no confirma tener.
- Otras cerraduras que se integran con RoomRaccoon, por si Salto sale caro: **Nuki** (integración en los dos sentidos), **TTLock**, **RemoteLock** y **Flexipass** (que conecta Salto con Apple/Google Wallet). Akiles y Omnitec **no** aparecen en su marketplace.

**Preguntas que hay que aclarar antes de firmar:**
1. A RoomRaccoon: la conexión con Salto pide una **IP estática y un puerto abierto**. ¿Es así también para Salto KS, que va en la nube, o solo para Salto Space, que va instalado en el local? Si hace falta, se le pide al proveedor de internet.
2. A RoomRaccoon: ¿cómo funciona en **dormitorios compartidos**? ¿Se genera un código por huésped (cama) o por habitación? En un hostel tiene que ser **por huésped**, para poder anular el código de una sola persona.
3. A RoomRaccoon: ¿el check-in online puede **obligar** a completarlo antes de enviar el código? ¿Tienen verificación con selfie?
4. A Salto: ¿la integración con RoomRaccoon envía **solo PIN o también llave móvil o pulsera**? ¿Qué plan de KS hace falta (Lite o Pro)?
5. A los dos: ¿quién da **soporte de noche** si un código falla, y cómo se abre en remoto (app de KS)?

## 5. Qué preguntar a cada proveedor (copiar en el email)

1. Precio del **hardware por puerta**, de la **instalación** y de la **cuota mensual o anual**.
2. ¿La cerradura **funciona sin internet**? ¿Qué pasa si se acaba la pila (aviso, apertura de emergencia)?
3. ¿Cuántas formas de abrir tiene (PIN, tarjeta, pulsera, móvil, Apple/Google Wallet)?
4. ¿Se puede **abrir en remoto** desde el móvil del encargado de guardia?
5. ¿Con qué **PMS** y con qué **software de check-in/SES** se integra (Cloudbeds, Mews, Chekin)?
6. ¿Se pueden abrir con **la misma credencial** la puerta y la taquilla?
7. ¿Qué **soporte técnico** dan de noche y los fines de semana? ¿Tiempo de reparación?
8. ¿Hay **referencias de hostels** en España que lo usen? (Pedirlas y mirar sus reseñas en Booking y Hostelworld buscando "code", "locked out", "código".)
9. ¿Llegan a instalarlo **antes de diciembre de 2026**? ¿Plazo de entrega del hardware?

Datos que hay que tener a mano antes de pedir presupuesto: número de puertas (calle/portal, entrada del hostel, habitaciones, baños si tienen llave, cuarto de limpieza), número de camas o taquillas, tipo de puertas actuales (fotos) y si el portal es compartido con vecinos.

## 6. Antes de lanzarlo: lo legal

- **Solo mujeres:** en España ya existen hostels solo de mujeres (Hostelle en Barcelona, Lamia BBK en Bilbao). La Ley 15/2022 de igualdad de trato prohíbe discriminar en el acceso a establecimientos, pero no impide los servicios "destinados exclusivamente a la promoción" de un colectivo. **Conviene que lo confirme un abogado** y que se pregunte a Turisme Comunitat Valenciana cómo encaja en la licencia de albergue. Hay que decidir y dejar escrito cómo se trata a las huéspedes trans y no binarias.
- **SES.Hospedajes:** el parte de viajeros es obligatorio. El software de check-in tiene que enviarlo automáticamente.
- **Datos biométricos** (selfie): según el RGPD necesitan consentimiento explícito. Chekin y similares ya incluyen ese flujo, pero hay que añadirlo a la política de privacidad.

## Fuentes

- Limehome, reseñas: [Tripadvisor Berlín](https://www.tripadvisor.com/Hotel_Review-g187323-d15675606-Reviews-Limehome-Berlin.html), [Madrid Malasaña](https://www.tripadvisor.com/ShowUserReviews-g187514-d19810734-r915879765-Limehome_Madrid_Malasana-Madrid.html), [Trustpilot](https://www.trustpilot.com/review/limehome.com)
- Up! Hostel Valencia: [Hostelworld](https://www.hostelworld.com/hostels/p/265974/up-hostel-valencia/), [Tripadvisor](https://www.tripadvisor.com/Hotel_Review-g187529-d10062078-Reviews-Up_Station_Hostel-Valencia_Province_of_Valencia_Valencian_Community.html), [Hostelz](https://www.hostelz.com/hostels/Spain/Valencia/best-rated-hostels-on-hostelworld)
- STAYmyway / Operto: [Murcia Diario](https://www.murciadiario.com/actualidad-economica/empresas/la-murciana-staymyway-sera-el-proveedor-mundial-de-las-llaves-digitales-de-los-hoteles-accor/20210204182739050867.html), [Avaibook](https://www.avaibook.com/blog/nuestro-partner-staymyway-ahora-es-operto/)
- Xataka: [hotel sin recepción](https://www.xataka.com/otros/intente-alojarme-futurista-hotel-recepcion-24-horas-llave-integrada-movil-salio-fatal)
- Lamia BBK Women Hostel: [web](https://lamiabbkhostel.com/), [Noticias de Álava](https://www.noticiasdealava.eus/gente/2026/08/16/alojamiento-exclusivamente-femenino-vocacion-social-bilbao-lamia-11442266.html)
- Hostelle Barcelona: [Hostelworld](https://www.hostelworld.com/hostels/p/312700/hostelle-women-only-hostel-barcelona/)
- a&o: [check-in](https://www.aohostels.com/en/infos/checkin/), [habitaciones de mujeres](https://www.aohostels.com/en/service/female-dorm/)
- Buba House Barcelona (Nuki): [web](https://bubahouse.com/)
- Líbere + Salto: [Computing](https://www.computing.es/entrevistas/jose-gargallo-libere-hospitality-apuesta-por-un-modelo-tecnologico-propio/), [apertura en Valencia](https://www.culturaemprende.com/libere-hospitality-group-amplia-su-presencia-en-espana-con-su-cuarta-apertura-en-valencia)
- Salto: [hospitality](https://saltosystems.com/en-us/industries/hospitality-solution/), [suscripción KS](https://saltosystems.com/en/blog/announcing-new-salto-ks-subscription-model/), [Avirato + Salto KS](https://avirato.com/integraciones/salto-ks/), [Bydemes](https://bydemes.com/es/marcas/salto), [Hoomvip](https://www.hoomvip.com/)
- Akiles: [hoteles](https://akiles.app/en/sectors/smart-locks-system-for-hotels), [Hostale](https://www.hostale.es/checkin-checkout), [Civitfun](https://www.civitfun.com/integraciones-cerraduras/akiles/)
- Omnitec: [Rent&Pass](https://www.omnitecsystems.com/products/rent-and-pass), [Chekin + Omnitec](https://chekin.com/blog/chekin-omnitec-gestion-alojamientos-turisticos/)
- Raixer: [Raixer Pro](https://www.raixer.com/product/pro), [que.es](https://www.que.es/2023/05/04/raixer-y-sus-cerraduras-inteligentes-una-solucion-en-aumento-para-alojamientos-turisticos/)
- Nuki: [Smart Lock Pro](https://nuki.io/es-es/productos/smart-lock-pro-5a-gen), [Keypad 2](https://nuki.io/en/products/keypad-2)
- Ojmar: [OTS](https://ojmar.com/en/product/electronic-intelligent-locks/ots/), [OTS 20](https://ojmar.com/es/producto/cerraduras-electronicas-inteligentes-taquilla/ots/cerradura-taquilla-rfid-ots-20/)
- Chekin: [self check-in](https://chekin.com/self-check-in/), [biometría](https://chekin.com/blog/sistema-biometrico-el-software-de-reconocimiento-facial-de-huespedes/), [comparativa de precios](https://gotocheck.pro/blog/comparativa-chekin-partee-gotocheck-2026.html)
- Check-in y SES: [BookCheckin precios](https://bookcheckin.com/precio), [Check-in Scan hostels](https://www.checkinscan.com/en/check-in-solutions-for-hostels/), [BnCheck cerraduras](https://bncheck.com/en/blog/best-smart-locks-vacation-rentals-spain-2026-guide)
- Cloudbeds: [kiosko](https://myfrontdesk.cloudbeds.com/hc/en-us/articles/40953189987483-Kiosk-Mode-Enable-Guest-Self-Check-In-and-Mobile-Staff-Check-Ins-in-Cloudbeds-App), [Salto KS](https://flexipass.tech/cloudbeds-salto-ks)
- RoomRaccoon: [Salto KS](https://contact.roomraccoon.com/en/support/solutions/articles/150000086769-salto-ks), [conexión Salto](https://contact.roomraccoon.com/en/support/solutions/articles/150000026386-salto-connection), [Salto partner](https://saltosystems.com/en-us/technology-partners/roomraccoon/), [caso Cerdanya](https://roomraccoon.com/hotel-case-studies/cerdanya-mountain-residences/), [SES.Hospedajes](https://contact.roomraccoon.com/en/support/solutions/articles/150000192504-compliance-spain-spanish-police-reports-ses-hospedajes-), [Roommatik](https://thehotelmagazine.co.uk/roomraccoon-announces-first-integration-with-self-service-kiosk-solution-roommatik/), [cerraduras](https://roomraccoon.com/integrations/room-keys/)
- Ley 15/2022: [BOE](https://www.boe.es/buscar/act.php?id=BOE-A-2022-11589)
