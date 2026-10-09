# Bookings and payments

Guide: `docs/booking-setup.md` (the deposit link is in section 5).

## Cal.com
- [ ] You: **delete the API key `claude-oct8`** (Settings → Developer → API keys) and the key file in Downloads.
- [ ] You: make a test booking. Check the confirmation email shows the deposit line and link, and that the 3 / 4 / 6 h choice and the times make sense. Cancel it afterwards.
- [ ] Review the booking questions and the calendar's look together.

## PayPal
- [ ] You: turn on two-step verification.
- [ ] You: test with €1 (`paypal.me/300sun/1EUR` from another PayPal account, or a €1 payment link to test paying by card), then refund it.
- [ ] You: open the deposit link in a private window and tell Claude whether "Pay with debit or credit card" appears. If yes, Claude changes the site to say "card or PayPal".
- [ ] You: fill the customer service email and phone in the PayPal business profile, and update the logo there.

## Route sheets for clients
- [ ] For each real client, give Claude: name, date, people, start time, stops, any fixed time (reservation or all-aboard), price and deposit. Claude makes the PDF and the WhatsApp image.
- [ ] Check the map on the example sheet (`marketing/route-sheet-example.pdf`): is each number on the right building? Claude took the tall tower under the basilica as the Cathedral and the church below it as San Nicolás.
