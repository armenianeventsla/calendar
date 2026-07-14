# Twice-weekly ingestion — the two scheduled prompts

_Updated 2026-07-14. Supersedes `COWORK-INGEST-PROMPT.md`. The pipeline runs as two halves
on a twice-weekly rhythm — **Mondays and Fridays at 11:00 AM (America/Los_Angeles)**._

## The one constraint that shapes everything

The **cloud Code session cannot reach Instagram or your local hard drive** — it only sees
GitHub. The **Cowork session** runs on your computer, so it has Instagram, Google Calendar,
and your local files. Each half touches only part of the world:

| | Instagram likes | Google Calendar | Your local files | GitHub (local git push) | Website build |
|---|:---:|:---:|:---:|:---:|:---:|
| **Cowork** (your computer) | ✅ | ✅ | ✅ | ✅ *(via your machine's git login)* | ❌ |
| **Code** (cloud) | ❌ | ✅ | ❌ | ✅ | ✅ |

Two automatic bridges connect them — no manual file-shuffling:

- **Google Calendar = the data bridge** — Cowork writes the events; Code reads them.
- **GitHub = the image bridge** — Cowork saves posters into your local *git clone* and
  **pushes them to an `ingest/<date>` branch** using the git login already on your computer
  (Part 1 step 6); Code pulls that branch. Cowork can't use the GitHub *connector/API*, but a
  plain `git push` from your local clone is a different mechanism and works with your machine's
  own credentials.

> One-time setup: this only works if your local calendar folder is a git clone whose `git push`
> is authenticated. If Cowork's first push fails, it reports the error and we fix the credentials
> once. Fallback any run: drag posters into the Code chat, or upload to the branch on github.com.

The `CLAUDE.md` guardrails bind both halves: **nothing touches `main` or Netlify without
Gohar's explicit green light.**

| Half | Where it runs | What it does |
|---|---|---|
| **Part 1 — Collect** (Mon & Fri 11 AM) | Cowork on your computer | Instagram likes → qualify → **update Google Calendar** → save posters into the local git clone → **push an `ingest/<date>` branch** |
| **Part 2 — Assemble** (after the ingest push) | Claude Code (cloud) | Pull posters + read Calendar → website `EVENTS` entries → **dated preview** → wait for green light → deploy |

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

5. Posters — save each qualifying post's photo at full resolution INTO the images/ folder
   of my LOCAL GIT CLONE of the calendar repo (the folder that has index.html and a .git
   folder), named <event-slug>.jpg (lowercase, hyphens, e.g. armenian-open-2026.jpg). Use
   the SAME slug in the calendar description (step 4) so the website step can match photo to
   event. Include extra carousel slides only if they carry event details. Do NOT overlay or
   edit the images — save the original flyer as-is. (If a new hero BANNER is wanted, save it
   as images/banner.png in the same clone.)

6. Push to GitHub — THIS is what makes it automatic. From inside my local clone, run these
   in a terminal (they use the git login already configured on this computer):
       git fetch origin
       git checkout -B ingest/<YYYY-MM-DD> origin/main
       git add images/
       git commit -m "Add posters for <YYYY-MM-DD> ingest"
       git push -u origin ingest/<YYYY-MM-DD>
   NEVER push to main. If the push SUCCEEDS, tell me the branch name — the cloud Code
   session will pull it automatically. If the push FAILS (auth or remote error), do NOT
   stop: report the exact error message and the local clone's path, so we can fix the git
   credentials once (after that, every run pushes on its own).

7. Report — a short summary: the ingest branch name (or the push error), N events added to
   the calendar, M updated, K skipped (with a one-line reason each).
```

---

## Part 2 — the assembly run on Claude Code (cloud)

Run this after the Cowork collection **once the posters have reached GitHub** — normally
that's the `ingest/<date>` branch Cowork pushed (Part 1 step 6). Fallbacks if Cowork's push
didn't work: drag the posters into the Code chat, or upload them to the working branch on
github.com. Then paste:

```
Run the ASSEMBLY half of the event pipeline (docs/EVENT-INGESTION-RUNBOOK.md,
docs/WEEKLY-INGESTION-PROMPTS.md). Guardrails from CLAUDE.md apply: build everything on
a working branch and a dated preview; never push main or deploy without my explicit
green light.

1. Posters: git fetch, then look for an ingest/<date> branch pushed by the collection run
   and copy its images/*.jpg into the working branch's images/ folder. (If instead I
   attached the posters to the chat or uploaded them to the working branch, use those.)
   Each poster lands at images/<slug>.jpg, where the slug matches the calendar event's
   description. If a banner.png was provided, replace images/banner.png.

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
  desktop app supports recurring tasks; otherwise paste it manually on those days. It ends by
  **pushing the `ingest/<date>` branch** (Part 1 step 6) — no file-shuffling by you.
- **Part 2 (Code):** kick off the assembly prompt after the ingest push; Code pulls the branch,
  wires the posters, and builds the preview. **Limits, verified 2026-07-14:** in-session cloud
  schedules are memory-only (lost on container restart/rewind) and expire after 7 days. The
  Part 2 prompt is fully self-contained, so pasting it into any fresh Code session always works.

## The one-time setup that makes the whole thing hands-off

The pipeline is automatic **as long as Cowork can `git push` from your local clone.** That needs
your local calendar folder to be a git clone whose push is authenticated (HTTPS token in the git
credential manager, or an SSH key). Most likely it already is, since the repo was set up from that
machine. Confirm it once by running `git push` there yourself; if it works, Cowork's push (Part 1
step 6) will too, and no manual step ever remains.

If for some reason local `git push` can't be authenticated on that machine, the alternative is to
**run Claude Code locally** (in that folder's terminal) instead of in the cloud — a local session
sees both your files and GitHub, so it can push directly. Either way, the cloud Code session by
itself can never reach your local files; the push must originate from your computer.
