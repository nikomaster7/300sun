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

## 5. Payments (optional, later)
Cal.com can charge through **Stripe** (a card deposit, for example €50). Before turning that on:
- Check on cal.com/pricing whether it's included in your plan.
- You need to be registered to sell (autónomo or a company) to receive payments and issue invoices.

Until then, the booking reserves the date and the guest pays on the day.

## 6. Send me the link
Done: the event is `cal.com/300-sun/old-town-walk` (set up 2026-09-23; the username changed from 300-sun-6scc8d to 300-sun). If the username changes, update `CAL_LINK` in `site/assets/js/300sun.js`.
