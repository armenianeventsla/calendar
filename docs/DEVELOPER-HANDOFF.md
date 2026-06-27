# Developer Handoff — Armenian Events of LA

_Last updated: 2026-06-27. Audience: a senior developer (or Claude Code session) taking over this project._

## 1. What this is

A community calendar of upcoming Armenian events in greater Los Angeles, live at
**https://armenianeventsla.com**. It is intentionally simple: **one static `index.html`** (no
framework, no build step) plus an `images/` folder. New events are sourced from the project's
Instagram activity and mirrored to a public Google Calendar.

## 2. Architecture

- **`index.html`** is the entire app: `<style>` (CSS) + `<body>` (markup) + `<script>` (logic).
- All events live in a JavaScript array named **`EVENTS`** near the bottom of `<script>`. The page
  renders them on load into "Happening This Week" cards and a filterable "Calendar of Events" list,
  with a detail modal. Past events auto-hide.
- Each event object: `title`, `date` ("YYYY-MM-DD"), `start`/`end` ("HH:MM" or ""), `endDate`,
  `location`, `category` (Cultural/Social/Music/Sports/Community/Shopping), optional `free:true`,
  optional `discount`, `description` (backtick template string, `<br>` for line breaks),
  `link` + `linkLabel`, `poster:"images/<slug>.jpg"`, and an `art:{}` gradient fallback used when
  the poster image is missing (`onerror` hides the `<img>` and reveals the gradient).
- `CAT_COLORS` (in `<script>`) maps categories to pill colors.
- Posters and the banner/logo are in **`images/`**.

## 3. Repository layout (`github.com/armenianeventsla/calendar`, branch `main`)

```
index.html                     production site (source of truth)
CLAUDE.md                      permanent working rules / deploy guardrails (READ FIRST)
README.md                      overview + how-to-edit + deploy workflow
images/                        posters, banner.png, logo.png
docs/
  CHANGELOG.md                 dated log of every change
  WEBSITE-ANALYSIS.md          site analysis + prioritized growth roadmap
  DEVELOPER-HANDOFF.md         this file
  INSTAGRAM-INGESTION.md       how to pull events/posters from Instagram (+ iPhone workflow)
deploy-previews/
  YYYY/<MM-Month>/             dated, numbered, labeled preview snapshots per change
site-history/                  the "rolodex": every past version of index.html, in order
  README.md                    index of versions v1–v5
  source-flyers/               raw Instagram flyer downloads
```

## 4. Deploy pipeline (IMPORTANT)

- The Netlify project **`amazing-cranachan-4cc940`** (→ armenianeventsla.com) is now connected to
  this GitHub repo. It **deploys from GitHub `main`** (publish directory = repo root, no build command).
  Before 2026-06-27 it deployed via Netlify Drop (manual zip upload).
- **Deploy credits are limited** (was ~34 remaining on 2026-06-27). Because git is connected, a push
  to `main` triggers a production deploy. **Therefore `main` must only ever be updated for approved,
  reviewed changes** (see guardrails). For a hard stop, Netlify "Stop auto publishing" can be enabled
  so even `main` pushes wait for a manual Publish click.
- Never deploy an `index.html` that doesn't end in `</html>` (a real file-sync gotcha we hit).

## 5. The guardrails (non-negotiable — see `CLAUDE.md`)

1. **No auto-deploy.** Never publish to Netlify / merge to `main` without the owner's explicit green light.
2. **Every change → a dated preview** in `deploy-previews/<YYYY>/<MM-Month>/`
   (`<date>_<NNN>_<what-changed>.html`, self-contained with images embedded) for review.
3. Owner reviews in a Claude session, then green-lights; only then is `main`/production updated.
4. `main` = production. Log every change in `docs/CHANGELOG.md`. Never delete from `site-history/`.

## 6. Event-sourcing workflow (how events get added)

1. The owner **likes** event posts on Instagram (`@armenianeventsla`). A run scans the most recent
   ~25 liked posts.
2. For each, decide if it's an upcoming **Armenian community event in greater LA** (include cultural,
   festivals, concerts, sports, community, workshops, markets, galas, fundraisers; exclude
   dating/singles mixers, merch, personal reels, memes, past-event recaps, and anything outside LA).
3. Read date/time/location from the **caption AND the flyer image** (many posts only put details on
   the flyer graphic).
4. For each new qualifying event: create a Google Calendar event (calendarId in the run notes),
   save the flyer to `images/<slug>.jpg`, and append an `EVENTS` object to `index.html`.
5. Build a dated preview, get green light, then deploy.

See `INSTAGRAM-INGESTION.md` for how to pull the posts/posters programmatically (and the iPhone path).

## 7. History & a key incident (so you have full context)

- This site has been edited across several sessions. Snapshots from June 11–27 are preserved in
  `site-history/` (v1–v5).
- **The "two-copy drift" incident (2026-06-27):** the project existed in two folders that diverged —
  `E:\Calendar` (the live/canonical copy, 28 events, with the full World Cup series, Arevahike walk,
  real ticket links, SOLD OUT badge, nav logo) and `C:\Users\Owner\OneDrive\Downloads\Calendar`
  (an older base, 26 events). A session's edits and the first GitHub import accidentally used the C:
  copy. This was caught during a verification pass and **reconciled**: production `index.html` is now
  `E:` (28) **+ 3 new events** = **31 events**. Lesson: there is now **one source of truth — the
  GitHub repo.** Local drive copies should be treated as scratch.

## 8. Known environment quirks (from the Cowork/automation sessions)

- Saving Instagram flyer images to disk from the browser-automation environment was unreliable until
  the browser's download folder was pointed at the project's `images/` folder. Some posters were
  therefore **generated** (clean, on-brand, from event details) rather than the original flyer art;
  these are safe to replace by dropping the real JPG into `images/` with the same filename.
- Returning large base64 blobs through tool output is blocked, and screenshot-to-disk doesn't persist
  — relevant if you automate image capture.
- OneDrive "files on demand" can show cloud-only placeholders that command-line tools can't read until
  materialized.

## 9. Roadmap

See `docs/WEBSITE-ANALYSIS.md` for 21 prioritized improvements. Highest-value first steps: SEO/Open
Graph meta tags, JSON-LD `Event` structured data (Google event listings), analytics, an email signup,
and moving the `EVENTS` array into a separate `events.json` so editing data doesn't mean touching HTML.

## 10. How to make a change (the standard loop)

1. Edit `index.html` (and add any poster to `images/`).
2. Generate a self-contained preview into `deploy-previews/<YYYY>/<MM-Month>/<date>_<NNN>_<label>.html`.
3. Share it with the owner for review.
4. On green light: commit to `main` (this deploys via Netlify) and add a `docs/CHANGELOG.md` entry.
