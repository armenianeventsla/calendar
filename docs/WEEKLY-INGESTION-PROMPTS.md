# Twice-weekly ingestion — the two scheduled prompts

_Updated 2026-07-14. Supersedes `COWORK-INGEST-PROMPT.md`. The pipeline runs as two halves
on a twice-weekly rhythm — **Mondays and Fridays at 11:00 AM (America/Los_Angeles)**._

## The one constraint that shapes everything

Verified 2026-07-14: **the Cowork session cannot reach GitHub** (no repo access from that
environment), and **the cloud Code session cannot reach Instagram** *or* **your local hard
drive** (it only sees GitHub). So each half can only touch part of the world:

| | Instagram likes | Google Calendar | Your local files | GitHub repo | Website build |
|---|:---:|:---:|:---:|:---:|:---:|
| **Cowork** (your computer) | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Code** (cloud) | ❌ | ✅ | ❌ | ✅ | ✅ |

The two halves overlap only on **Google Calendar** — that's the automatic bridge. Everything
else Cowork produces that Code needs (the **poster images**) has to be carried across by you,
because neither the calendar nor GitHub is reachable from *both* sides for image files. So:

- **Google Calendar is the data bridge** — Cowork writes the events; Code reads them. No manual step.
- **You are the image bridge** — Cowork saves posters to a local folder; you hand those files to
  the Code session (drag them into the Code chat, or upload them to the working branch on
  github.com). This is the only manual step, ~5 files per run.

> Want to remove even that step? See "Making it fully automatic" at the bottom.

The `CLAUDE.md` guardrails bind both halves: **nothing touches `main` or Netlify without
Gohar's explicit green light.**

| Half | Where it runs | What it does |
|---|---|---|
| **Part 1 — Collect** (Mon & Fri 11 AM) | Cowork on your computer | Instagram likes → qualify → **add/update Google Calendar events** → save post photos to a local folder → tell you the folder path |
| **Part 2 — Assemble** (after posters are handed over) | Claude Code (cloud) | Read Calendar + receive posters → website `EVENTS` entries → **dated preview** → wait for green light → deploy |

---

## Part 1 — paste into a Cowork session on your computer

```
You are running the twice-weekly COLLECTION half of the event pipeline for the Armenian
Events of LA calendar. You have Instagram (my logged-in browser), Google Calendar, and my
local files — but you do NOT have access to the GitHub repo, and you do NOT build the
website. Your job: gather from Instagram, update the Google Calendar, and save the poster
photos to a local folder. That's it — the cloud Claude Code session does all the GitHub and
website work afterward.

FIRST — scheduling: if this environment supports scheduled or recurring tasks, schedule
this entire prompt to run every MONDAY and every FRIDAY at 11:00 AM (America/Los_Angeles).
If it doesn't, tell me plainly, and I'll paste it manually on those days.

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
   c5c323fb0a26dced52e4ce58935b6fb5e7722915a78ba352edab804709efcb39@group.calendar.google.com).
   This is how the information reaches the website, so be thorough:
   - If the event is ALREADY there: compare and update anything missing or changed
     (time, venue, link, price).
   - If it's NOT there: create it — title, correct date/time in America/Los_Angeles
     (all-day or spanning entries for multi-day events), location field filled in, and
     a description containing: the full verbatim caption; the flyer-read details; the
     resolved ticket/RSVP link and its type (Tickets/RSVP/Details); whether it's FREE;
     the exact poster filename you saved (step 5); and the source post URL.

5. Posters — save each qualifying post's photo at full resolution into a dedicated local
   folder (e.g. ~/Calendar/ingest-posters/), named <event-slug>.jpg (lowercase, hyphens,
   e.g. armenian-open-2026.jpg). Use the SAME slug in the calendar description (step 4) so
   the website step can match photo to event. Include extra carousel slides only if they
   carry event details. Do NOT overlay or edit the images — save the original flyer as-is.
   (If a new hero BANNER image is wanted, save it in the same folder as banner.png.)

6. Handoff — you cannot push to GitHub, so DON'T try. Instead, finish by telling me
   clearly: (a) the local folder path where the posters are saved, (b) the exact filenames,
   and (c) a short summary: N events added to the calendar, M updated, K skipped (with a
   one-line reason each). I will carry those image files to the Code session.
```

---

## Part 2 — the assembly run on Claude Code (cloud)

Run this after the Cowork collection, **once you've handed the poster files to the Code
session** — either by dragging them into the Code chat, or by uploading them to the
`claude/cowork-session-context-t7bjj1` branch on github.com (Add file → Upload files;
upload to that branch, NOT `main`). Then paste:

```
Run the ASSEMBLY half of the event pipeline (docs/EVENT-INGESTION-RUNBOOK.md,
docs/WEEKLY-INGESTION-PROMPTS.md). Guardrails from CLAUDE.md apply: build everything on
a working branch and a dated preview; never push main or deploy without my explicit
green light.

1. Posters: I will have attached the new poster photos to this chat, or uploaded them to
   the working branch. Save/confirm each one in images/<slug>.jpg (the slug matches the
   calendar event's description). If a banner.png was provided, replace images/banner.png.

2. Read the "Armenian Events of LA" Google Calendar (ID:
   c5c323fb0a26dced52e4ce58935b6fb5e7722915a78ba352edab804709efcb39@group.calendar.google.com)
   and list upcoming events. Diff against the EVENTS array in index.html.

3. For every calendar event missing from the site (or with outdated details), add or
   update its EVENTS entry using the calendar data as the source of truth:
   - title, date (YYYY-MM-DD), start/end, endDate for multi-day events, location,
     category (Cultural/Social/Music/Sports/Community/Shopping), free:true when free,
     full description (from the calendar, <br> line breaks), link + linkLabel
     (Tickets/RSVP/Details for real links, else the Instagram post with "Instagram"),
     poster:"images/<slug>.jpg", and an art:{} gradient fallback.
   - Use the exact original post photo as the poster — never generate a stand-in when the
     real one was provided. If a poster wasn't provided yet, add the event with the
     gradient fallback and note which posters are still pending.
   - The category and date belong on the card chrome, never overlaid on the poster —
     nothing may block information printed on the flyer.

4. Build the dated self-contained preview
   deploy-previews/<YYYY>/<MM-Month>/<YYYY-MM-DD>_<NNN>_<label>.html, add a
   docs/CHANGELOG.md entry, commit to the working branch (never main), push, and give me
   the preview (attach it, and optionally publish it as an artifact link to click through).

5. STOP and wait. Only after I explicitly say to deploy: update main (Netlify deploys from
   main automatically when index.html/images change), then verify the live site — new
   events present, posters return HTTP 200 — and log the deploy in the changelog.

If the calendar and site already match and no new posters were provided, say so and stop.
```

---

## How the schedule works (and its limits)

- **Part 1 (Cowork):** runs **Mon & Fri 11:00 AM PT** — self-scheduled inside Cowork if the
  desktop app supports recurring tasks; otherwise paste it manually on those days.
- **The handoff (you):** after Cowork reports the folder path, bring the poster files to the
  Code session (drag into chat, or upload to the working branch). This is the only manual step.
- **Part 2 (Code):** the cloud session can arm a scheduled check, but it only produces useful
  work once the posters are handed over — so in practice, kick off Part 2 yourself right after
  you hand over the files. **Limits, verified 2026-07-14:** in-session cloud schedules are
  memory-only (lost on container restart/rewind) and expire after 7 days. The Part 2 prompt is
  fully self-contained, so pasting it into any fresh Code session always works.

## Making it fully automatic (optional, removes the manual step)

The one manual step exists only because image *files* can't cross from Cowork to cloud-Code on
their own. Two ways to close that gap, in order of effort:

1. **Give the Cowork environment GitHub access.** If Cowork could push (the way we just restored
   write access for the Code session), it would push posters to an `ingest/<date>` branch itself,
   and Code would pull them — zero manual step. Worth checking whether Cowork's GitHub connection
   can simply be authorized.
2. **Run Claude Code locally instead of in the cloud.** A Claude Code session on your own computer
   sees both your local poster folder AND GitHub, so it can pick up Cowork's local files and push
   them directly. (This cloud session can't, because it's a remote sandbox.)

Until one of those is set up, the Google-Calendar-plus-hand-off-the-images flow above is the
reliable path.
