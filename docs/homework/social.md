# Social media

Accounts: Facebook Page "300sun", Instagram **@300sunvalencia**. Images in `brand/`, first 8 posts and captions in `marketing/instagram/`. Ads handover for your wife: `docs/meta-ads-handover.md`.

- [ ] **You: secure Facebook** (new password, two-step verification, log out unknown devices), then **request the review** of the restricted ad account at facebook.com/accountquality.
- [ ] You: connect Instagram to the Facebook Page from Meta Business Suite. It said "temporarily restricted" on 8 Oct; don't retry more than once a day.
- [ ] You: profile picture, bio and link (300sun.com/cruise) on both, and the cover on Facebook.
- [ ] You: post the first carousel, then two or three a week. Schedule them in Meta Business Suite once Instagram is connected.
- [ ] Claude: redo the posts with the sketch drawings and your new photos when you send them.
- [ ] If the ad account stays blocked: add your wife to the Page with full control (decided 2026-10-09; steps in the handover).
- [ ] Before any paid ad: tell Claude, because the site needs a cookie banner and updated privacy pages the same day.

## Valencia this week (weekly digest, Telegram + 300sun.com/valencia-this-week)
Built 2026-11-18. It runs every Monday on its own once these are done:
- [ ] You: create the Telegram channel (public, e.g. @valenciathisweek, name "Valencia this week · 300sun"), then the bot: in Telegram talk to @BotFather, `/newbot`, copy the token. Add the bot to the channel as an admin who can post.
- [ ] You: get an Anthropic API key at console.anthropic.com (add $5–10 of credit).
- [ ] You: on GitHub, repo Settings > Secrets and variables > Actions, add the secrets `ANTHROPIC_API_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (the channel name, e.g. `@valenciathisweek`), and in the Variables tab `TELEGRAM_CHANNEL_URL` (e.g. `https://t.me/valenciathisweek`).
- [ ] You: Actions tab > "Weekly digest" > Run workflow, for the first issue. Then read it with Claude and adjust.
- [ ] Claude: after 3–4 issues, check the `?ref=telegram` and `?ref=this-week` bookings and tune the score weights.
- [ ] Later: share each issue in Cruise Critic's Valencia board and Facebook cruise groups when someone asks what's on (help first, link when asked).

