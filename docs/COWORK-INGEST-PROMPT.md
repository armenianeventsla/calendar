# Cowork kickoff prompt — Instagram collection run

_Copy everything in the box below and paste it as the first message of a **Claude Cowork
session on Gohar's own computer** (the one with the logged-in browser). The Cowork session
only collects and pushes raw material; the Claude Code cloud session does the rest
(Google Calendar, website, preview) per `docs/EVENT-INGESTION-RUNBOOK.md`._

---

```
You are doing the COLLECTION HALF of the event-ingestion pipeline for
github.com/armenianeventsla/calendar (see docs/EVENT-INGESTION-RUNBOOK.md in that repo).
Your job is ONLY to gather material from Instagram and push it to a handoff branch.
Do NOT edit index.html, do NOT touch the Google Calendar, do NOT push to main, and do
NOT deploy anything — the Claude Code cloud session handles all of that afterward.

1. In my logged-in browser, open
   https://www.instagram.com/your_activity/interactions/likes/
   and go through every post I liked in the PAST WEEK.

2. For each post, decide if it qualifies. It qualifies only if BOTH are true:
   - It is an event hosted for the Armenian community. Read the caption AND the flyer
     image itself — many posts only put the date/time/location on the graphic.
   - It is in the greater Los Angeles area, including Glendale and Pasadena.
   Exclude: dating/singles mixers, merch, personal reels, memes, past-event recaps,
   and anything outside greater LA.

3. For each QUALIFYING post:
   - Download the post's photo at full resolution (every slide if it's a carousel and
     the extra slides contain event details). Name it <event-slug>.jpg (e.g.
     armenian-open-2026.jpg).
   - Copy the FULL caption text verbatim.
   - Read the flyer and note the date, start/end time, venue/address, price or FREE,
     and whether the event spans multiple days.
   - If the caption says "link in bio" (or similar), open the poster's profile and copy
     the ACTUAL link from their bio (follow a Linktree one level if needed) and note
     what it is (Tickets / RSVP / Details).
   - Record the post URL (Share → Copy link) and the account handle.

4. In my local clone of the calendar repo, create a branch named
   ingest/<today's date YYYY-MM-DD> off main. In a folder ingest/<YYYY-MM-DD>/ put:
   - every downloaded photo, and
   - manifest.json: an array with one object per qualifying post:
     {
       "slug": "...", "title": "...", "post_url": "...", "account": "@...",
       "caption": "full verbatim caption",
       "flyer_details": "date/time/venue/price as read from the image",
       "date": "YYYY-MM-DD", "start": "HH:MM", "end": "HH:MM", "end_date": "" ,
       "location": "venue, street address, city",
       "free": true/false, "multi_day": true/false,
       "link": "resolved bio/ticket link or the post URL",
       "link_label": "Tickets|RSVP|Details|Instagram",
       "images": ["slug.jpg"]
     }
   Also list the posts you REVIEWED BUT SKIPPED with a one-line reason each, in
   manifest.json under "skipped".

5. Commit and push ONLY that ingest branch (never main). Then tell me it's pushed and
   summarize: N qualifying events, M skipped.
```

---

## What happens next (back in the Claude Code cloud session)

Tell the cloud session the ingest branch is pushed. It will then, per the runbook:
fetch the branch → cross-check/update/add each event on the **Armenian Events of LA**
Google Calendar (full post description + source URL) → move posters into `images/` →
add `EVENTS` objects (free badge, `endDate` for multi-day, category/date on the card,
never overlaying the poster) → build the dated preview in
`deploy-previews/<YYYY>/<MM-Month>/` → log it in `docs/CHANGELOG.md` → **stop and wait
for Gohar's green light** before anything touches `main`/production.

## Why this split

Verified 2026-07-02: the cloud sandbox cannot reach Instagram (login required for the
likes feed; anonymous requests get a bot-challenge; headless-browser egress is blocked),
but it has full read/write access to the Google Calendar and the repo workflow. Cowork on
Gohar's machine has the logged-in browser but shouldn't be doing unsupervised deploys —
so Cowork collects, the cloud session assembles, and Gohar green-lights.
