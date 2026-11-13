# App de formación para recepción: plan (borrador)

> Proyecto aparte de 300sun. Este archivo vive aquí solo hasta que exista su propio repositorio privado; entonces se mueve allí.
> Última actualización: 2026-11-13. Estado: planificación, preguntas 15–22 pendientes.

## 1. Objetivo

Formar al personal nuevo y a los voluntarios de recepción de los 3 hostales antes de que trabajen solos en recepción. Formato corto, dinámico y tipo juego (estilo Duolingo): lecciones, escenarios con decisiones y una prueba al final de cada módulo.

Más adelante, si el piloto funciona:
- centralizar otras tareas (horarios, gastos mensuales a partir de Excel, informes automáticos por email al gerente y al dueño);
- venderlo a otros hostales (Nicolás como desarrollador, con un porcentaje; **acuerdo por escrito con el dueño antes de construir**).

## 2. Lo que ya sabemos

| Tema | Decisión / dato |
|---|---|
| Alcance | Los 3 hostales, mismo dueño, procedimientos casi iguales (habrá diferencias puntuales por hostal) |
| Volumen | Rotación de 5–10 personas nuevas al mes |
| Temporadas | Los procedimientos cambian entre verano e invierno: el contenido tiene que poder marcarse por temporada y actualizarse rápido |
| Idiomas | Español e inglés, todo el contenido en los dos |
| Dispositivo | Sobre todo el móvil propio; también el ordenador de recepción |
| Aprobar | Obligatorio: solo quien aprueba los módulos pasa al training oficial y puede trabajar en recepción |
| Contenido | Hay manuales y protocolos escritos (Nicolás los pasa); otras cosas no están escritas y hay que redactarlas |
| Quién valida el contenido | Nicolás (gerente), Alexis (assistant manager) y Arturo (dueño) |
| Software del hostal | RoomRaccoon. Ya gestiona el registro de viajeros para la policía, así que el curso solo enseña a usarlo, no la parte legal |
| Escenarios con decisiones | Sí |
| Fotos | Reales del hostal si las hay (Nicolás busca); si no, sin fotos o con dibujos |
| Final del curso | Sin certificado "bonito", pero sí un **PDF de constancia** descargable: sirve como prueba ante Booking.com u otra entidad si algún día lo piden |
| Seguimiento | Acceso solo para gerentes, que ven el progreso de cada persona |

## 3. Primeros módulos (borrador)

1. Check-in (en RoomRaccoon)
2. Check-out
3. Cobrar y devolver un depósito
4. Huésped con discapacidad o movilidad reducida
5. Persona sospechosa o de dudosa procedencia
6. *(más: Nicolás explica las situaciones que dan más problemas, pregunta 10)*

Cada módulo: 3–6 lecciones cortas (1–2 minutos cada una) → escenarios ("¿qué haces?") → prueba final con nota mínima para aprobar.

## 4. Requisitos que salen de lo anterior

- **Contenido versionado.** Si cambia un procedimiento, se sabe qué versión aprobó cada persona y, si hace falta, se le pide repetir ese módulo.
- **Etiquetas por temporada y por hostal** en cada lección (`verano`, `invierno`, `todo el año`; `hostal A/B/C` o `todos`).
- **Login** para cada persona (el progreso tiene que guardarse y el gerente verlo). Uso desde el móvil, sin instalar nada desde una tienda de apps.
- **Panel de gerente:** lista de personas, módulos aprobados, nota y fecha, y descarga del PDF de constancia.
- **PDF de constancia:** nombre, hostal, módulos, notas, fechas, versión del contenido y espacio para la firma del gerente.
- **Bilingüe** desde el primer día: cada persona elige idioma.
- **Datos personales (RGPD):** nombre, email y notas de empleados. Servidor en la UE, solo lo mínimo y borrado cuando alguien deja de trabajar (plazo por decidir).

## 5. Propuesta técnica (provisional, depende de las preguntas 19 y 22)

- **Aplicación web instalable (PWA):** se abre con un enlace, se puede añadir a la pantalla de inicio del móvil y funciona también en el ordenador de recepción. Más adelante puede pasar a tienda de apps si hace falta.
- **Contenido en archivos de texto dentro del repositorio** (un archivo por lección, ES + EN). Añadir o cambiar una lección = editar un archivo. Un panel visual para editar contenido llegaría después (ver duda abajo).
- **Login y progreso** en un servicio con base de datos alojado en la UE y plan gratuito para el piloto.
- Diseñado desde el principio para **varios hostales** (cada dato lleva a qué hostal pertenece), pensando en la venta futura.

## 6. Fases

| Fase | Qué | Para quién |
|---|---|---|
| 0 | Acuerdo con Arturo sobre propiedad y porcentaje; repo privado creado | Nicolás |
| 1 | Prototipo: 1 módulo completo (check-in) en ES/EN, sin login | Enseñarlo a Alexis y Arturo |
| 2 | Piloto: 5 módulos, login, panel de gerente, PDF de constancia | Personal nuevo de los 3 hostales |
| 3 | Ajustes con lo aprendido en 1–2 meses de uso | |
| 4 | Extras: horarios, gastos desde Excel, informes por email | Gerente y dueño |
| 5 | Versión para otros hostales | Venta |

## 7. Pendiente

- [ ] **Nicolás:** crear el repositorio privado en GitHub y decir el nombre
- [ ] **Nicolás:** pasar manuales y protocolos existentes
- [ ] **Nicolás:** explicar las situaciones que más problemas dan (pregunta 10)
- [ ] **Nicolás:** buscar fotos reales de recepción y de los hostales
- [ ] **Aclarar:** ¿panel visual para editar contenido o editar archivos de código? (la respuesta 11 dice las dos cosas)
- [ ] **Aclarar:** ¿qué procedimientos cambian entre verano e invierno? (un ejemplo basta)
- [ ] **Aclarar:** nota mínima para aprobar y si se puede repetir la prueba
- [ ] Responder las preguntas 15–22:
  - 15. Cómo se hacen hoy los horarios y las compras; ejemplo del Excel sin datos sensibles
  - 16. Quién recibe el informe, cada cuánto y qué quiere ver
  - 17. ¿Horarios y gastos fuera del piloto? (recomendado: sí)
  - 18. Fecha del piloto y horas por semana disponibles
  - 19. Presupuesto para hosting o dominio
  - 20. ¿Arturo ya conoce la idea? ¿Se presenta antes o con prototipo?
  - 21. Otros hostales interesados; modelo de precio (¿suscripción mensual?)
  - 22. Qué datos de empleados se guardan (RGPD)
