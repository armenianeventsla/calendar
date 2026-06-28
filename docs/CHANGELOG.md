# Armenian Events of LA — Changelog & Work Log

A running record of changes made to the website (`index.html`) and the event calendar.
Newest entries first. Each dated entry corresponds to a snapshot saved in
`/deploy-previews/<date>/` so we can always see what the site looked like at that point.

---

## How this project works

- **Live site:** https://armenianeventsla.com (hosted on Netlify, project `amazing-cranachan-4cc940`).
- **Source of truth:** `index.html` — a single self-contained page. All events live in a
  JavaScript array named `EVENTS` near the bottom of the file. Posters live in `/images`.
- **Google Calendar:** events are also added to the public Google Calendar
  (`...@group.calendar.google.com`, timezone America/Los_Angeles) so the "Subscribe" button stays in sync.
- **Deploys:** done manually (to conserve deploy credits). Each working version is snapshotted
  into `/deploy-previews/<date>/` before/when we deploy, so there is a dated paper trail.
- **Event sourcing:** new events are found from the Instagram account's **likes** activity, filtered
  to upcoming Armenian community events in greater LA.

---

## 2026-06-27 (cont.) — Instagram fetch script, GitHub Pages previews, deploy-credit guard

- Added **`netlify.toml`** with an `ignore` rule: production deploys are skipped unless `index.html`
  or `images/` changed — so docs, previews, scripts, and history commits don't burn deploy credits.
- Confirmed `@armenianeventsla` is a **Professional (Creator/Business) account** → qualifies for the
  Instagram Graph API.
- Added **`scripts/fetch-instagram.mjs`** + `scripts/README.md`: a read-only Graph API script that
  pulls the account's own posts and downloads each post's **exact original poster image** (`media_url`)
  for use on the site. Added `.gitignore` for the pull output and tokens.
- Enabled **GitHub Pages** (`main`/root) so deploy previews render at
  `https://armenianeventsla.github.io/calendar/...` — reviewable on any device, no Netlify credits.
- New deploy-preview folder convention in use: `deploy-previews/<YYYY>/<MM-Month>/<date>_<NNN>_<label>.html`.

---

## 2026-06-27 (later) — GitHub migration complete, reconciliation & first git deploy

- **Migrated the whole operation to GitHub** (`github.com/armenianeventsla/calendar`, branch `main`)
  with a clean structure: `index.html`, `images/`, `docs/`, `deploy-previews/`, `site-history/`,
  `README.md`, and `CLAUDE.md` (permanent deploy guardrails).
- **Found and fixed a two-copy drift:** the live/canonical site was the `E:\Calendar` copy (28 events,
  with the World Cup series, Arevahike walk, real ticket links, SOLD OUT badge, nav logo); the
  separate `C:` copy (26 events) had the 3 newest events but an older base. **Reconciled** production
  `index.html` = E: (28) + 3 new events = **31 events**, using the real Hye Notes flyer.
- **Archived everything as a rolodex** in `site-history/` (versions v1–v5, oldest→newest) plus the raw
  Instagram flyer downloads in `site-history/source-flyers/`. Nothing preferred, nothing deleted.
- **Connected Netlify to GitHub**: `amazing-cranachan-4cc940` now *deploys from GitHub `main`* (was
  Netlify Drop). Publish dir = repo root, no build command.
- **Deployed and verified** the 31-event site live at armenianeventsla.com (all posters return HTTP 200;
  new events + World Cup series + SOLD OUT all present).
- **New deploy-preview structure**: `deploy-previews/<YYYY>/<MM-Month>/<date>_<NNN>_<label>.html`.
  First: `deploy-previews/2026/06-June/2026-06-27_001_updated-calendar-3-new-events.html`.
- **Added handoff docs** for a senior developer / Claude Code: `docs/DEVELOPER-HANDOFF.md` and
  `docs/INSTAGRAM-INGESTION.md` (Instagram Graph API vs. likes/browser, and the iPhone Remote-Control workflow).
- Connected the **Netlify MCP connector**. (A GitHub MCP isn't in Claude's registry; GitHub edits use the web/API.)

> Reminder going forward: the **GitHub repo is the single source of truth.** Local drive copies are scratch.

---

## 2026-06-27 — New events + GitHub migration

**Events added** (to both the Google Calendar and `index.html`):

| Event | Date | Category | Link |
|---|---|---|---|
| Ejanish Summer Series — Moving the Needle With Embroidery | Wed Jul 1, 6:30 PM | Cultural (Free) | Instagram (DaBiO5cEs4P) |
| Mary Basmadjian — Stand-Up at Flappers Burbank | Thu Jul 2, 7:30 PM (doors 6:30) | Community | Instagram (DaBGc51p4zg) |
| Hye Notes #8 — Karaoke Social Mixer | Fri Jul 24, 7:00 PM | Social (Free) | Partiful RSVP |

**Other changes:**
- Added poster images for all three new events, plus a new poster for **APS Annual Beach Day**
  (it previously used only the gradient fallback). Files: `images/ejanish.jpg`,
  `images/mary-basmadjian.jpg`, `images/hye-notes-8.jpg`, `images/aps-beach-day.jpg`.
- Built local preview files for review without spending a deploy:
  `preview.html` (full site, images embedded) and `new-events-mockup.html` (focused card view).
- Started migrating the whole operation to GitHub for easier collaborative editing and
  documented, dated deploy previews.

**Reviewed Instagram likes — intentionally skipped** (not qualifying):
viral lemonade reel; Downtown Burbank Cultural Market posts (already listed / past anniversary);
a DJ birthday recap; Paul Karmiryan & Academy news articles; a Washington DC rooftop social;
a Simi Valley podcast recap; a London Komitas film screening; Navasartian sub-posts (festival
already on the calendar); Armenian speed-dating posts (excluded category); and sports-result news.

**Known limitation:** the original Instagram flyer images could not be saved into `/images`
automatically in this environment, so the four posters above were **generated** in the site's
style from each event's real details (title, date, time, venue). To use the original flyer art,
drop a JPG into `/images` with the same filename and it overrides the generated one.

---

## Earlier work (summary from prior sessions)

The site already contained a full calendar of ~23–28 events with posters, a hero section, a
category/date filter, "Happening This Week" cards, a details modal, a "Partner with us" sponsor
section, and social links. Prior sessions also:
- Added the full 5-date World Cup watch-party series and other events (GENÄTZ, Echoes, etc.).
- Upgraded several events from Instagram links to real ticket/RSVP links (Eventbrite, Posh,
  Partiful, venue sites) by reading the link in each account's Instagram bio.
- Marked the Navasartian Victory Ball as **SOLD OUT**.
- Consolidated everything into `E:\Calendar` as the single source of truth.

> Note: this summary is reconstructed from available logs and may not be exhaustive. From
> 2026-06-27 onward, every change is recorded here with a dated preview snapshot.

---

## Template for future entries

```
## YYYY-MM-DD — <short title>
**Events added/changed:** ...
**Other changes:** ...
**Deploy:** preview saved to /deploy-previews/YYYY-MM-DD/ ; deployed to production? (yes/no)
```
