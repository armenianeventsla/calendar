# scripts/ — Instagram ingestion

`fetch-instagram.mjs` pulls @armenianeventsla's own recent posts and downloads each poster image
via the Instagram Graph API. It is **read-only** — it never pushes or deploys. It just gathers the
raw material (captions + posters) so a new calendar event can be added, previewed, and (after your
green light) deployed. See `docs/INSTAGRAM-INGESTION.md` for the bigger picture.

## One-time setup: get an access token

The account is a Professional (Creator/Business) account, which is all the Graph API needs.

1. Go to **developers.facebook.com** → create an app (type: "Business" or "Consumer").
2. Add the **Instagram** product → use **Instagram API with Instagram Login** (no Facebook Page
   required for Creator/Business).
3. Add `@armenianeventsla` as a tester / connect the account, and generate a **long-lived access
   token** (valid ~60 days, refreshable). Scope needed: `instagram_business_basic` (read media).
4. Keep the token secret. **Do not commit it.** Set it as an environment variable:

   ```bash
   # macOS / Linux
   export IG_ACCESS_TOKEN="PASTE_LONG_LIVED_TOKEN"

   # Windows (PowerShell, then open a new terminal)
   setx IG_ACCESS_TOKEN "PASTE_LONG_LIVED_TOKEN"
   ```

> Tokens expire (~60 days). Refresh before expiry, or the script will return an auth error —
> just generate a new long-lived token and re-set the env var.

## Run it

```bash
node scripts/fetch-instagram.mjs        # 25 most recent posts (default)
node scripts/fetch-instagram.mjs 10     # 10 most recent
```

Output (git-ignored, not committed):
- `scripts/instagram-pull/<date>_<caption-slug>.jpg` — the poster image(s) per post
- `scripts/instagram-pull/manifest.json` — caption, permalink, timestamp, and image paths

## How it fits the flow (phone-friendly)

1. (You) post / repost the event flyer to `@armenianeventsla`.
2. (Claude Code, even triggered from your phone via Remote Control) runs this script, reads the
   manifest, and for each NEW upcoming LA Armenian event: copies the poster into `images/<slug>.jpg`,
   adds an `EVENTS` object to `index.html`, and builds a **deploy preview**.
3. (You) open the preview on any device's browser and review it.
4. (You) say "deploy it" → only then is it pushed to `main` and published to Netlify.

This keeps the guardrails intact: **no auto-deploy; nothing goes live without your review.**
