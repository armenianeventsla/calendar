# Event Ingestion Runbook — filling in the website

_The owner's standing instructions for how new events get from Instagram onto
armenianeventsla.com. Written 2026-07-02. This is the procedure Claude follows every run;
Gohar's criteria below are authoritative._

---

## The pipeline at a glance

```
Instagram likes (past week)  →  qualify against criteria  →  cross-check Google Calendar
        →  add/update calendar event  →  add event + poster to website  →  dated preview
        →  Gohar reviews  →  green light  →  deploy
```

The deploy guardrails in `CLAUDE.md` apply to every run: **no push to `main`, no Netlify
deploy, without Gohar's explicit green light.** Every run ends at a dated preview and a
changelog entry, then waits.

---

## Step 1 — Source: the Instagram likes feed

Start at **https://www.instagram.com/your_activity/interactions/likes/** (logged in as
`@armenianeventsla`) and scrub through the posts liked **within the past week**.

> ⚠️ **Environment note:** this page requires Gohar's Instagram login. A cloud/sandbox
> session cannot open it (see "Who does what" below). In a cloud session, Gohar supplies
> the post links and/or screenshots instead, and Claude takes it from there.

## Step 2 — Qualify each post

A post qualifies when **both** are true:

1. **It's an event hosted for the Armenian community.** The evidence can come from the
   post's caption/description (listing date, time, location) **or from the flyer image
   itself** — many posts only put the details on the graphic, so always read the image too.
2. **It's in the Los Angeles area**, including **Glendale and Pasadena** (greater LA, to
   accommodate the Armenian community).

Standing exclusions (from prior runs, still in force): dating/singles mixers, merch posts,
personal reels, memes, past-event recaps, and events outside greater LA.

## Step 3 — Cross-check the Google Calendar

Check the **"Armenian Events of LA"** calendar
(https://calendar.google.com/calendar/u/0/r — calendar ID
`c5c323fb0a26dced52e4ce58935b6fb5e7722915a78ba352edab804709efcb39@group.calendar.google.com`):

- **Already on the calendar?** Compare details and **update the calendar event** if
  anything is missing or has changed (time, venue, ticket link, etc.).
- **Not on the calendar?** **Add it**, using the **full description from the Instagram
  post**, plus date, time, location, and anything else relevant (ticket/RSVP link, price,
  free admission, host account, and the source post URL for traceability).

Claude *can* read and write this calendar directly from a cloud session via the Google
Calendar connector — this step is fully automatable.

## Step 4 — Add the event to the website

Add the same event, with all the same information, to the `EVENTS` array in `index.html`:

- **All fields:** `title`, `date` ("YYYY-MM-DD"), `start`/`end`, `location`, `category`
  (Cultural / Social / Music / Sports / Community / Shopping), `description` (the full
  post description, backtick string, `<br>` for line breaks), `link` + `linkLabel`,
  `poster`, and an `art:{}` gradient fallback.
- **Poster:** download **the post's photo** (the exact original flyer image) and save it
  as `images/<slug>.jpg`. Do not generate stand-ins when the real image is available.
- **Free events:** mark `free:true` so the site shows the FREE badge.
- **Multi-day events:** set `endDate` so the card shows the full run (e.g. a festival or
  an exhibit that spans multiple days).
- **Never cover the poster:** the event **type (category) and the date go on the card**,
  not overlaid on the poster image — nothing may block information printed on the flyer.
  (The current card layout already does this: the category pill, date line, and FREE
  badge render in the card chrome around the image. Keep it that way; don't add overlays
  on the `poster` image itself.)

## Step 5 — Reference links ("link in bio")

- If the post says **"link in bio"** (or similar), open **the posting account's profile**,
  take the actual URL from their bio (or their Linktree), and use *that* as the event's
  `link`. Label it by what it is: **"Tickets"**, **"RSVP"**, or **"Details"**.
- If there's no real ticket/RSVP URL, link the Instagram post itself with
  `linkLabel:"Instagram"`.
- Always keep the source post URL in the Google Calendar event description even when the
  website links elsewhere.

## Step 6 — Preview, log, wait for green light

1. Build a dated, self-contained preview:
   `deploy-previews/<YYYY>/<MM-Month>/<YYYY-MM-DD>_<NNN>_<label>.html`.
2. Add a `docs/CHANGELOG.md` entry (events added/changed, poster sources, calendar
   actions).
3. Commit to the working branch (never `main`) and tell Gohar where to review
   (GitHub Pages URL renders the preview on any device).
4. **Stop.** Deploy only on an explicit green light.

---

## Who does what (cloud-session reality, verified 2026-07-02)

Tested from a Claude cloud sandbox on 2026-07-02:

| Capability | Status |
|---|---|
| Open the Instagram **likes** page | ❌ Needs Gohar's login — not possible from the sandbox |
| Fetch public Instagram posts anonymously | ❌ Instagram serves a bot-challenge shell to the sandbox; headless-browser egress is blocked by the environment proxy (`ERR_CONNECTION_CLOSED`) |
| Read/write the **Armenian Events of LA** Google Calendar | ✅ Works (connector authenticated as owner) |
| Edit `index.html`, save posters to `images/`, build previews, commit/push a working branch | ✅ Works |
| Deploy / push to `main` | 🚫 Only after Gohar's green light, per guardrails |

### What Gohar does each run

For each qualifying liked post from the past week, provide in the session:

1. **The post URL** (Share → Copy link), and
2. **The post's photo** — attach the image (screenshot or saved photo) to the chat, or
   drop the JPG into `images/` yourself. This becomes the poster, so the original
   full-resolution image is best.
3. If the caption says "link in bio," either paste the bio link or just say so — include
   the account handle — and Claude will ask for the link if it can't be resolved.

### What Claude does with that

Everything else: reads the caption and the flyer for date/time/location, qualifies the
event, cross-checks and updates/creates the Google Calendar entry (with the full post
description), adds the `EVENTS` object with poster + `free` + `endDate` handling, builds
the dated preview, logs the change, pushes the working branch, and waits for the green
light.

### Alternative for a session on Gohar's own computer

In a Claude Cowork session running on Gohar's machine (with his logged-in browser),
Claude can drive the likes page directly and do Step 1–2 itself — that was the original
workflow. The Instagram Graph API script (`scripts/fetch-instagram.mjs`) is a third
option, but it only fetches the account's **own posts**, not liked posts, so it doesn't
replace the likes review.

---

## Known gaps as of 2026-07-02 (found while writing this)

Cross-checking the calendar (15 upcoming events) against the site (31 events):

- **Armenian Open 2026 — Golf Tournament** (Sun Aug 16, DeBell Golf Course, Burbank;
  source post `instagram.com/p/DaJkUjxCG3n`) — added to the Google Calendar 2026-07-01
  but **not yet on the website**. Needs the post photo for the poster.
- **AUA 35th Anniversary Gala** (Sat Nov 7) — on the calendar since February but not on
  the website. Confirm with Gohar whether it should be added (it may have been left off
  intentionally pending details).
- Naming drift: the July 12 Vartavar event is "Vartavar - Yerevan-Style Celebration" on
  the site but "Vartavar Celebration — Homenetmen Burbank Sipan" on the calendar — same
  event; harmonize titles on the next touch.
