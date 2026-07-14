# Twice-weekly ingestion — the two scheduled prompts

_Written 2026-07-06. Supersedes `COWORK-INGEST-PROMPT.md`. The pipeline runs as two halves
on a twice-weekly rhythm — **Mondays and Fridays at 11:00 AM (America/Los_Angeles)**:_

| Half | Where it runs | What it does |
|---|---|---|
| **Part 1 — Collect** (Mon & Fri 11:00 AM) | Cowork on Gohar's computer (logged-in browser) | Instagram likes → qualify → **add/update Google Calendar events** → save post photos as posters → push posters to an `ingest/` branch |
| **Part 2 — Assemble** (Mon & Fri ~12:00 PM) | Claude Code (cloud) | Calendar + posters → website `EVENTS` entries → **dated preview** → wait for green light → deploy via GitHub `main` + Netlify |

The `CLAUDE.md` guardrails bind both halves: **nothing touches `main` or Netlify without
Gohar's explicit green light.**

---

## Part 1 — paste into a Cowork session on your computer

```
You are running the twice-weekly COLLECTION half of the event pipeline for
github.com/armenianeventsla/calendar (see docs/EVENT-INGESTION-RUNBOOK.md there).
You collect from Instagram, maintain the Google Calendar, and save poster photos.
You do NOT edit index.html, do NOT push to main, and do NOT deploy anything.

FIRST — scheduling: if this environment supports scheduled or recurring tasks, schedule
this entire prompt to run every MONDAY and every FRIDAY at 11:00 AM
(America/Los_Angeles). If it doesn't, tell me plainly, and I'll paste this prompt
manually on those days.

Then run the collection:

1. In my logged-in browser, open
   https://www.instagram.com/your_activity/interactions/likes/
   and go through every post I liked SINCE THE LAST COLLECTION RUN (the past 3–4 days;
   on the very first run, the past week).

2. A post qualifies only if BOTH are true:
   - It's an event hosted for the Armenian community — read the caption AND the flyer
     image itself; many posts only put date/time/location on the graphic.
   - It's in the greater Los Angeles area, including Glendale and Pasadena.
   Exclude: dating/singles mixers, merch, personal reels, memes, past-event recaps,
   anything outside greater LA.

3. For each qualifying post, gather everything:
   - Full caption, verbatim.
   - From the flyer: date, start/end time, venue + address, price or FREE, and whether
     it spans multiple days.
   - The post URL (Share → Copy link) and the account handle.
   - If the caption says "link in bio" (or similar), open that account's profile and
     copy the ACTUAL link from the bio (follow a Linktree one level if needed); note
     whether it's Tickets, RSVP, or Details.

4. Google Calendar — on the "Armenian Events of LA" calendar (ID:
   c5c323fb0a26dced52e4ce58935b6fb5e7722915a78ba352edab804709efcb39@group.calendar.google.com):
   - If the event is ALREADY there: compare and update anything missing or changed
     (time, venue, link, price).
   - If it's NOT there: create it — title, correct date/time in America/Los_Angeles
     (all-day or spanning entries for multi-day events), location field filled in, and
     a description containing the full verbatim caption, the flyer-read details, the
     resolved ticket/RSVP link, whether it's FREE, and the source post URL.

5. Posters: save each qualifying post's photo at full resolution as <event-slug>.jpg
   (e.g. armenian-open-2026.jpg). Include extra carousel slides only if they carry
   event details.

6. Handoff: in my local clone of the calendar repo, create branch ingest/<YYYY-MM-DD>
   off the latest main. Add the photos under ingest/<YYYY-MM-DD>/ plus a manifest.json
   listing, for each event: slug, title, calendar event (title or ID), post_url,
   account, link + link_label, free, multi_day, images — and a "skipped" list of
   reviewed-but-rejected posts with a one-line reason each. Commit and push ONLY that
   ingest branch. Never main. If you can't push, leave the folder on disk and tell me
   to attach the files to the Code session instead.

7. Report: N events added to the calendar, M updated, K skipped (with reasons), and
   the name of the pushed ingest branch.
```

---

## Part 2 — the assembly run here on Claude Code

This is what the cloud session runs after each collection run (also fired by the
session's scheduled check — see "How the schedule works" below). Paste it into any
Claude Code session on the `armenianeventsla/calendar` repo:

```
Run the ASSEMBLY half of the event pipeline (docs/EVENT-INGESTION-RUNBOOK.md,
docs/WEEKLY-INGESTION-PROMPTS.md). Guardrails from CLAUDE.md apply: build everything on
a working branch and a dated preview; never push main or deploy without my explicit
green light.

1. git fetch. Look for ingest/* branches not yet processed (their posters aren't in
   images/ yet).

2. Read the "Armenian Events of LA" Google Calendar (ID:
   c5c323fb0a26dced52e4ce58935b6fb5e7722915a78ba352edab804709efcb39@group.calendar.google.com)
   and list upcoming events. Diff against the EVENTS array in index.html.

3. For every calendar event missing from the site (or with outdated details), add or
   update its EVENTS entry using the calendar data as the source of truth:
   - title, date (YYYY-MM-DD), start/end, endDate for multi-day events, location,
     category (Cultural/Social/Music/Sports/Community/Shopping), free:true when free,
     full description (calendar description, <br> line breaks), link + linkLabel
     (Tickets/RSVP/Details for real links, else the Instagram post with "Instagram"),
     and an art:{} gradient fallback.
   - Poster: copy the matching photo from the ingest branch into images/<slug>.jpg and
     reference it. Use the exact original post photo — never generate a stand-in when
     the real one exists.
   - The category and date belong on the card chrome, never overlaid on the poster —
     nothing may block information printed on the flyer.

4. Build the dated self-contained preview
   deploy-previews/<YYYY>/<MM-Month>/<YYYY-MM-DD>_<NNN>_<label>.html, add a
   docs/CHANGELOG.md entry, commit to the working branch (never main), push, and give
   me the preview (attach it and give the GitHub Pages URL).

5. STOP and wait. Only after I explicitly say to deploy: update main (Netlify deploys
   from main automatically when index.html/images change), then verify the live site —
   new events present, posters return HTTP 200 — and log the deploy in the changelog.

If there is no new ingest branch and no calendar/site difference, say so and stop.
```

---

## How the schedule works (and its limits)

- **Part 1 (Cowork):** runs **Mondays and Fridays at 11:00 AM PT** — self-scheduled
  inside Cowork if the desktop app supports recurring tasks; otherwise Gohar pastes it
  manually on those days.
- **Part 2 (Code):** the cloud session arms a scheduled check for **Mondays and Fridays
  ~12:00 PM PT** (an hour after collection) that fires the Part 2 prompt. **Hard limits,
  verified 2026-07-06:** session schedules are in-memory only — they die if the cloud
  container restarts, is reclaimed for inactivity, or the session is rewound to a
  checkpoint — and recurring jobs auto-expire after 7 days. Treat the in-session
  schedule as a convenience, not infrastructure: if no assembly report appears after a
  collection run, paste Part 2 into a session yourself — it is fully self-contained.
- **Durable upgrade (optional, later):** a GitHub Actions workflow on a Mon/Fri cron
  using the Claude Code Action could fire Part 2 without any live session. Needs an API
  key as a repo secret and repo write access — set up only with Gohar.
- **Prerequisite still open as of 2026-07-06:** the cloud session's GitHub access is
  read-only (403 on all writes). Part 2 can't push its working branch or previews until
  the Claude GitHub app has write access to `armenianeventsla/calendar`.
