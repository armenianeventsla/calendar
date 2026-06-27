# Working rules for this repo (read this first)

This file is the standing agreement between Gohar (the owner) and any AI assistant
(Claude Code / Claude Cowork) working on this repository. **These rules are permanent and
override convenience.** Follow them exactly.

## Project

`armenianeventsla/calendar` is the source for the live site **https://armenianeventsla.com**
(a community calendar of Armenian events in greater LA). The whole site is a single
`index.html` (HTML + CSS + JS, with the `EVENTS` array near the bottom) plus `images/`.

## The deploy guardrails — NON-NEGOTIABLE

1. **Never auto-deploy. Never publish to Netlify and never merge to `main` without Gohar's
   explicit green light.** "Green light" means Gohar reviews the change and clearly says to deploy
   (e.g. "deploy it", "green light", "push it live"). Silence is not approval.

2. **Every change gets a dated preview first.** For any change to the site, before deploying:
   - Create/update a folder `deploy-previews/<YYYY-MM-DD>/` containing:
     - `preview.html` — a self-contained snapshot (images embedded) Gohar can open and review.
     - `README.md` — a short note of exactly what changed in this round.
   - Tell Gohar the preview is ready and where to look.

3. **Gohar reviews in a Claude session, then green-lights.** Only after explicit approval do you:
   - Update the root `index.html` (the production file) with the approved change, and
   - Deploy it (and/or merge to `main`).

4. **`main` = production.** Keep `main` equal to what's deployed/approved. Develop and stage changes
   without overwriting the production `index.html` until Gohar approves.

5. **Log everything.** Record each change in `docs/CHANGELOG.md` with the date and what changed.

6. **Never lose history.** `site-history/` is the permanent archive of past versions (the "rolodex").
   Only add to it — never delete or overwrite past versions.

7. **Deploy mechanics & safety.**
   - Deploys are **manual** (to protect limited deploy credits). Netlify is intentionally not set to
     auto-publish every push.
   - Never deploy an `index.html` that doesn't end in `</html>`.
   - Keep the deploy bundle under 10 MB.

## How to add/edit an event (quick reference)

Open `index.html`, find the `EVENTS` array, copy an existing object, and edit:
`title`, `date` ("YYYY-MM-DD"), `start`/`end`, `location`, `category`
(Cultural / Social / Music / Sports / Community / Shopping), optional `free:true`,
`description` (backtick string, `<br>` for newlines), `link` + `linkLabel`
(real ticket/RSVP URL → "Tickets"/"RSVP"/"Details", else Instagram post → "Instagram"),
`poster:"images/<slug>.jpg"`, and an `art:{}` gradient fallback. Save the poster into `images/`.
Mirror new events to the public Google Calendar too.

## Current known state (as of 2026-06-27)

- The repo's `index.html` came from the **C: drive copy (v5, 26 events)**, which was built on an
  older base. The most complete prior version is **v4 (E: drive, 28 events)** in `site-history/`.
  Before the next production deploy, the intended `index.html` should be reconciled (v4's content +
  the 3 new events from v5) — and that reconciliation must be reviewed and green-lit like any change.
