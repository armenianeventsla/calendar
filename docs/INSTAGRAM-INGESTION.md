# Pulling events & posters from Instagram (and the iPhone workflow)

_Researched 2026-06-27. Answers two questions: (1) Can we cleanly grab Instagram posts/posters in a
Claude Code environment? (2) Can the owner trigger "update my site from Instagram" from an iPhone?_

## TL;DR

- **Yes, both are possible.**
- The **cleanest, official** way to pull posts + posters is the **Instagram Graph API** — but it only
  returns the account's **own** published media, **not** posts you've *liked* from other accounts.
- The current workflow is built on **liked** posts (events the owner likes from other organizers).
  Liked posts have **no official API**, so they require **browser automation** (Claude in Chrome /
  Cowork), which is not native to a headless Claude Code terminal.
- **iPhone:** Yes — Anthropic shipped **Claude Code Remote Control** (Feb 2026) and Claude Code inside
  the **Claude iOS app** (Oct 2025). You can run a Claude Code session on your computer and drive it
  from your phone.

---

## Option A — Instagram Graph API (recommended for posters; official)

Best if we shift the workflow to the account's **own feed** (i.e., the owner posts or reposts each
event to `@armenianeventsla`, which they likely do anyway via Stories/feed).

- Endpoint: `GET https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token={TOKEN}`
- Returns each post's **`caption`** (date/time/location text) and **`media_url`** — a directly
  **downloadable image URL** for the poster. This solves the poster-download problem entirely and
  works headless (plain HTTPS GET), so it's perfect for Claude Code.
- Requirements:
  - The account must be a **Business or Creator (Professional)** account (free to switch).
  - A Meta/Facebook developer app + a **long-lived access token** (valid 60 days, refreshable).
  - Rate limit ~200 requests/hour — far more than enough.
- Limitation: **own media only.** It cannot read your *likes* or other accounts' posts. The old
  Instagram Basic Display API (which exposed more) was **shut down Dec 4, 2024**.

**Implication:** if event flyers are reposted to `@armenianeventsla` (feed or a dedicated highlight),
Claude Code can pull them cleanly with no browser. If we must keep sourcing from *likes*, see Option B.

## Option B — Browser automation (works for "likes"; not headless)

This is what the current process uses: open Instagram in a real browser (Claude in Chrome / Cowork),
go to `your_activity/interactions/likes/`, open each liked post, read the caption, and download the
flyer. It's the only way to read **liked** posts, but it needs a logged-in browser session and a
human-in-the-loop environment — it does **not** run in a plain terminal Claude Code session.

## Option C — Hybrid (pragmatic recommendation)

1. Keep liking events on Instagram as you do now.
2. **Also repost the ones you want on the calendar to `@armenianeventsla`** (feed or a "Calendar"
   highlight). Then a small script using the **Graph API (Option A)** can fetch them — caption +
   downloadable poster — fully automatically, from anywhere, including a phone-triggered Claude Code run.
3. For anything not reposted, fall back to the manual/browser path.

---

## The iPhone workflow — "update my site from Instagram" from your phone

This is achievable today:

1. **Run Claude Code on your computer** (the machine that has the repo and, if needed, the browser).
2. Use **Claude Code Remote Control** (Anthropic, research preview since Feb 25, 2026): start a session
   on the computer, then connect from **claude.ai/code or the Claude iOS app** on your iPhone. Claude
   keeps running locally; your phone is just the remote.
3. From the phone you type, e.g., *"check Instagram for new events and update the calendar site."*
   Claude Code (on the computer) does the work, builds a **deploy preview**, and — per the guardrails —
   **waits for your green light** before deploying. You review the preview link on your phone and reply
   "deploy it."

Notes / requirements:
- The computer running Claude Code must be on. (A small always-on machine or cloud dev box also works.)
- For **Graph-API ingestion (Option A)**, no browser is needed, so this is the most phone-friendly path.
- For **likes-based ingestion (Option B)**, the computer needs a logged-in Instagram browser session.
- This repo's `CLAUDE.md` guardrails travel with it, so a phone-triggered session still produces a
  preview and waits for approval — no surprise deploys, protecting your limited Netlify credits.

## Suggested next step

Switch `@armenianeventsla` to a **Creator account** (if not already) and set up a **Graph API long-lived
token**. Then a ~30-line fetch script (run by Claude Code) can pull new posts + posters automatically,
and the whole "from my phone, update the site" loop becomes clean and reliable.

---

## Sources

- Claude Code Remote Control — https://code.claude.com/docs/en/remote-control
- Claude Code on phone (2026 overview) — https://sealos.io/blog/claude-code-on-phone/
- Instagram IG Media reference (Meta) — https://developers.facebook.com/docs/instagram-platform/reference/instagram-media/
- Instagram API get post guide (2026) — https://www.getphyllo.com/post/instagram-api-get-post-use-display-api-to-access-user-info
