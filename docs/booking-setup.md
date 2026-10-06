# Walk bookings: setting up Cal.com (about 20 minutes)

The website already has the calendar built in. It just needs your Cal.com links.

## 1. Create the account
1. Go to **cal.com** and sign up with your Google account (the one whose calendar you use).
2. Username: **300sun**, if it's free.
3. When it asks, **connect Google Calendar**. From then on, anything in your calendar (a tour through City Unscripted, a dentist appointment) blocks that time on the website automatically.

## 2. Set your availability
Two walks a day at most: one starting at **09:00** and one at **13:00**.

Availability → **New schedule** called "Walks". Time zone: **Europe/Madrid**. For each day you work (for example Monday to Saturday) add two time ranges:
- **09:00 – 12:00**
- **13:00 – 16:00**

Each range is exactly one 3-hour walk long, so Cal.com can only offer a start at 09:00 or 13:00. The 30-minute buffer after the morning walk ends at 12:30, before the afternoon one.

## 3. Create the event type
- Title: **Old town walk (3 h)**. URL slug: `old-town-walk`
- Duration: 180 min. Buffer after: 30 min. Minimum notice: 24 h
- **Availability** tab: pick the "Walks" schedule
- **Limits** tab:
  - **Limit booking frequency** → on → **4 per week** (no more than 4 walks a week)
  - Time-slot intervals: leave at the default (it follows the duration)
- **Advanced** tab: **Offer seats** stays **off**, so each slot takes only one booking. Once someone books 09:00, that time disappears for everyone else.

When a week is full, or a guest needs another time, the booking note on the site sends them to WhatsApp.
- Location: "Meeting point sent by WhatsApp" (Torres de Serranos)

Under **Advanced → Booking questions**, add:
- **WhatsApp number** (phone, required)
- **How many people?** (number, required)
- **Coming off a cruise? Ship name and all-aboard time** (text, optional)
- **Anything I should know?** (kids, mobility, interests)

## 4. Notifications
- You get an **email for every booking** automatically, and the walk appears in your Google Calendar.
- Install the **Cal.com app** on your phone, or turn on Google Calendar notifications, to get a push notification.
- The guest gets a confirmation email and a reminder.

## 5. Payments: €45 PayPal deposit (decided 2026-10-04)
How it works: the guest books on Cal.com, then pays a **€45 deposit** through a PayPal link. The rest (€105, plus €30 per extra person) is paid at the end of the walk in cash, Bizum or PayPal. Cancelled 48 h+ before, or the ship doesn't dock: refund the deposit in full from PayPal (Activity → the payment → Refund).

Set up:
1. Open a **PayPal Business** account (free) with 300sunvalencia@gmail.com; business name "300sun". Turn on 2FA.
2. Create the PayPal.me link, ideally `paypal.me/300sun`. A ready-to-pay link for the deposit is `https://paypal.me/300sun/45EUR`.
3. In Cal.com → event "Old town walk" → Advanced → **Event description / confirmation**: add
   > To hold your date, please pay the €45 deposit within 24 hours: https://paypal.me/300sun/45EUR. The rest is paid at the end of the walk. Cancel up to 48 hours before and I refund the deposit in full.
   It then goes out in every confirmation email. Until the link exists, send it yourself on WhatsApp.
4. If a deposit hasn't arrived after 24 h, a WhatsApp reminder; after 48 h you can cancel the booking in Cal.com.

Fees: PayPal charges the receiver about 2.9% + €0.35 per payment in the EU (about €1.65 on €45), more for payments from the USA. Check the current rates on paypal.com/es/webapps/mpp/merchant-fees.

Later: Cal.com can take the deposit by card itself through **Stripe**, which removes the manual step. You need to be registered to sell (autónomo or a company) to receive payments regularly and issue invoices.

## 5b. Getting everything at your personal Gmail
Bookings (Cal.com) and payments (PayPal) both email 300sunvalencia@gmail.com. To see them in nicolasmusicplus@gmail.com too:
- **Emails:** in 300sunvalencia Gmail on a computer → ⚙️ → See all settings → Forwarding and POP/IMAP → Add a forwarding address (nicolasmusicplus@gmail.com, confirm with the code sent there). Then make a filter: search `from:(paypal.com OR cal.com)` → Create filter → Forward it to nicolasmusicplus@gmail.com.
- **PayPal app:** ⚙️ Settings → Notification preferences → Push notifications → turn on payments received.
- **Calendar:** in the Google Calendar that Cal.com writes to → Settings → that calendar → Share with specific people → add nicolasmusicplus@gmail.com with "See all event details", and accept the invite there. The walks then show in your personal calendar.
- **Avoid double bookings:** Cal.com → Settings → Calendars → Add → Google → nicolasmusicplus@gmail.com, "Check for conflicts" on. Personal plans then block those hours on the website.
- PayPal has no calendar. A payment is an email and a push notification, nothing more.

## 6. Send me the link
Done: the event is `cal.com/300-sun/old-town-walk` (set up 2026-09-23; the username changed from 300-sun-6scc8d to 300-sun). If the username changes, update `CAL_LINK` in `site/assets/js/300sun.js`.
