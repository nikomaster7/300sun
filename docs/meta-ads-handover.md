# Facebook and Instagram ads: what happened and how to take them over

_Written 2026-10-09 for Nicolás's wife, who will look after the ads. You don't need to know anything about the earlier setup to follow this._

## The short version
Nicolás's Facebook **ad account is blocked**, so he can't run paid ads. The 300sun Facebook Page and Instagram are fine and stay as they are. If his block isn't lifted, the plan is to **add you to the existing Page with full control**, and you run the ads from your own ad account. Nothing gets deleted.

## What happened
- On 8 Oct 2026 Nicolás created the Facebook Page **300sun** and the Instagram account **@300sunvalencia**.
- The same day, Meta's Ads Manager showed: *"Ad account has been restricted from advertising. We noticed unusual activity associated with your account."*
- That ad account belongs to his personal Facebook profile and is shared with his other pages (Market-in, Pio Box, Laminas de Seguridad). The block may come from those and be older than 300sun.
- Connecting Instagram to the Page also failed that day with "temporarily restricted". That is usually a short pause for new accounts.

## What is blocked and what isn't
| | Status |
|---|---|
| Posting on the 300sun Facebook Page | Works |
| Posting on Instagram @300sunvalencia | Works |
| Paid ads from Nicolás's ad account | **Blocked** |
| Connecting Instagram to the Page | Paused on 8 Oct; to retry |

No ads are running and none are planned for the next weeks, so nothing is urgent.

## The decision: add you to the Page (option 2)
Nicolás first thought of deleting both accounts and creating them again from your profile. We decided against it.

**Why not delete and start again**
- Opening new accounts to get around a block is against Meta's rules. Meta can connect the new accounts to the blocked one and block your profile too. Then neither of you could advertise.
- The Page, the Instagram username and every post would be lost.
- It solves nothing that adding you doesn't solve.

**Why adding you is the right way**
- It is the normal way a business has two people managing a Page. Every Page can have several people with full control.
- The Page, Instagram and posts stay exactly as they are.
- The ads run from **your** ad account, which is separate from his and has its own billing.
- It can be undone at any time by removing your access.

**The one condition:** you really are the person managing the ads, from your own Facebook login, with a payment card in your name. That is what makes this a real second manager and not a workaround. Meta may still review a new advertiser on a Page whose owner is blocked; if that happens, answer the review honestly as the Page's ads manager.

## Order of steps
**1. Nicolás tries to lift his own block first**
- He secures his Facebook account: new password, two-step verification, log out unknown devices.
- He asks for a review at `facebook.com/accountquality`. Meta usually wants a photo of his ID. The answer takes a few days.
- If the block is lifted, you may not need the rest. Adding you is still useful as a backup.

**2. He adds you to the Page**
- On the 300sun Page: **Settings → Page setup → Page access → Add new**.
- He searches for your Facebook profile and turns on **full control**.
- You get a notification and accept it.

**3. You get ready, before any ad**
- Turn on two-step verification on your Facebook account: `accountscenter.facebook.com` → Password and security → Two-factor authentication.
- Open `business.facebook.com` and check you can see **300sun** at the top left.
- If Instagram is still not connected, click **Connect Instagram** there and log in to @300sunvalencia (Nicolás has the password).

**4. When it's time to advertise**
- In Meta Business Suite, with 300sun selected, go to **Ads → Create ad**. The first time, Meta sets up your ad account and asks for a payment method. Use your own card.
- Set the ad account currency to **EUR** and the country to **Spain**. These can't be changed later.

## Before the first ad goes live
Tell Claude first. Three things have to happen on the website the same day, and Claude does them:

1. **Cookie banner.** The site currently promises "no cookies, no tracking". Ads need Meta's tracking pixel, which by law needs a consent banner.
2. **Privacy and cookie pages updated**, and the "no tracking" line removed from the footer.
3. **The site's security settings** changed to allow Meta's script, or the browser blocks it silently.

## The ad plan so far
From `docs/usa-campaign.md`:
- **Audience:** USA, ages 45–70, interested in Mediterranean cruises.
- **Best use:** showing ads again to people who already visited 300sun.com (retargeting).
- **Budget:** about €5 a day to start.
- **Where ads should send people:** `https://300sun.com/cruise/`

Ready-made images and captions in the brand style are in `marketing/instagram/`. Claude can make ad versions of them.

## Where to find things
| What | Where |
|---|---|
| Profile picture, covers, logos | `brand/` |
| Instagram posts and captions | `marketing/instagram/` |
| The whole to-do list | `docs/next-session.md` |
| Prices, wording and other decisions | `docs/site-decisions.md` |
| Site | https://300sun.com |

To work on any of this with Claude, open the 300sun folder and say "300sun homework".
