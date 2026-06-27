# Armenian Events of LA — Website

The source for **https://armenianeventsla.com** — a community calendar of upcoming Armenian
events in the greater Los Angeles area.

## Repository structure

```
index.html                 The entire website (HTML + CSS + JS in one file)
images/                    Posters, banner, and logo used by the site
docs/
  CHANGELOG.md             Dated log of every change we make
  WEBSITE-ANALYSIS.md      Analysis of the site + prioritized growth suggestions
deploy-previews/
  YYYY-MM-DD/              A snapshot of the site for each round of changes
    preview.html           Self-contained, openable preview (images embedded)
    README.md              What changed in this preview
README.md                  This file
```

## How to edit an event

1. Open `index.html` and find the `EVENTS` array near the bottom (inside `<script>`).
2. Copy an existing event object and edit its fields:
   - `title`, `date` (`YYYY-MM-DD`), `start`/`end` (`HH:MM` or `""`), `location`, `category`
     (one of: Cultural, Social, Music, Sports, Community, Shopping), optional `free:true`.
   - `description` (a backtick template string; use `<br>` for line breaks).
   - `link` + `linkLabel` (a real ticket/RSVP URL → "Tickets"/"RSVP"/"Details"; otherwise the
     Instagram post URL → "Instagram").
   - `poster:"images/<slug>.jpg"` and an `art:{}` gradient fallback.
3. Save the poster image into `images/` with a matching lowercase, hyphenated filename.

## Deploy workflow (manual — protects deploy credits)

We deploy **manually** so no credits are spent automatically.

1. Make and review changes (use the `deploy-previews/<date>/preview.html` snapshot to check the look).
2. When ready, download/zip the repo's `index.html` + `images/` and drag the zip onto
   **Netlify Drop** for the `amazing-cranachan-4cc940` project. (Netlify is **not** connected for
   auto-deploy — this is intentional.)
3. Record the change in `docs/CHANGELOG.md` and save a snapshot in `deploy-previews/<date>/`.

## Notes

- Never deploy an `index.html` that doesn't end in `</html>`.
- Keep the deploy zip under 10 MB (compress large posters if needed).
- Events are also mirrored to the public Google Calendar so the site's "Subscribe" button stays in sync.
