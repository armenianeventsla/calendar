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

## 2026-07-15 (cont.) — 🚀 DEPLOYED to production

- On Gohar's green light ("im satisfied please deploy"), deployed the full batch to
  armenianeventsla.com. Fast-forwarded `main` b4de650 → 6b983f3; Netlify auto-published.
- **Verified live:** 43 events; new hero banner (837 KB, the redesign); Music=pink / Sports=teal
  category colors; This Month section; Winter/Spring + Comedy/Film-TV/Festival/Gala filters; all
  new posters + AUA + golf + logo favicon return HTTP 200.
- Shipped in this deploy: new banner, translucent/opaque-glyph scroll arrows, AUA gala full listing,
  golf poster, 6 new events (Karmir, WC Final, All-Stars, Pickleball, Independence Day Festival, ANCA)
  with 5 real posters, expanded category taxonomy + season filters, and the category recolors.
- **Known follow-up (not blocking):** the 27th Independence Day Festival still shows a gradient card —
  its uploaded poster was the wrong flyer (a Jan 11 Appreciation Brunch). Awaiting the correct festival
  flyer. The mismatched `images/armenian-independence-day-festival.jpg` is currently an unused file.

---

## 2026-07-15 (cont.) — Category color tweaks

- Recolored 3 category pills per Gohar: **Sports** green → **teal** (#14b8a6), **Music** violet →
  **pink** (#ec4899), **Film/TV** cyan → **brown** (#7c4a1e). (Film/TV leaving cyan also removes the
  earlier teal/cyan proximity with Sports.) Verified rendered colors. Preview only; not deployed.

---

## 2026-07-15 (cont.) — Wired 5 of 6 new-event posters; 1 flagged as a mismatch

- Gohar uploaded posters for the 6 new events. Verified each; wired the **5 that match**:
  Karmir Film Lab, World Cup 2026 Final Watch Party, Armenian All-Stars, Summer Pickleball, ANCA
  WR Gala. Also enriched two venue addresses read off the flyers (World Cup Final → 75 E Santa
  Anita Ave; Pickleball → 5155 Old Scandia Ln).
- ⚠️ **Mismatch flagged:** `images/armenian-independence-day-festival.jpg` is actually a flyer for a
  **volunteer Appreciation Brunch** (Nor Serount Cultural Association) — Sunday **Jan 11, 2026**,
  11 AM, AEBU Center, 1060 Allen Ave, Pasadena — **not** the Sept 20 Independence Day Festival at
  Verdugo Park. Left the festival on its gradient card, pending Gohar's decision (wrong file? a
  separate event? note Jan 11 2026 is already past unless the year is 2027).
- Preview only; not deployed.

---

## 2026-07-15 (cont.) — Expanded category taxonomy + Winter/Spring season filters

- Added **4 new categories** (with distinct pill colors) and re-sorted events into them:
  - **Comedy** (yellow) — Mary Basmadjian, Armenian All-Stars
  - **Film/TV** (cyan) — Armenians in Television panel, Karmir Film Lab
  - **Festival** (red) — Navasartian Games & Festival, Vartavar, GiniFest, Armenian Independence Day Festival
  - **Gala** (purple) — TUMO, Navasartian Victory Ball, AUA, ANCA Awards, Art After Dark
  - Category filter chips now: Social, Cultural, Sports, Music, Community, Festival, Gala, Shopping, Film/TV, Comedy (auto-generated from events in use).
- Added **Winter** and **Spring** to the season date filters (alongside Summer/Fall); simplified the
  season logic to month-based so Winter's Dec–Feb wrap works. (No winter events on the calendar yet,
  so the Winter chip is empty until one is added — it's ready for when they come.)
- Verified: filters work (Gala → 4 upcoming, Film/TV → 1 upcoming; past events stay hidden). Preview
  only; not deployed.

---

## 2026-07-15 (cont.) — 6 new events added from the calendar (37 → 43)

- A Cowork run added 6 new events to the Google Calendar; pulled them onto the site (calendar =
  source of truth). **No posters were uploaded for these**, so they use gradient fallback cards for
  now — real posters can be dropped into `images/` later, same flow as before.
  - **Karmir Film Lab LA — Opening** — Jul 18, Frogtown (Cultural)
  - **World Cup 2026 Final — Watch Party (Burbank)** — Jul 19, Burbank Youth Center, $50 (Sports)
  - **Armenian All-Stars — Comedy at UCB Franklin** — Aug 7 (Social); ticket link resolved from bio (linktr.ee/artoun)
  - **Summer Pickleball Fundraiser — Homenetmen Massis** — Aug 15, Calabasas, $75 (Sports)
  - **27th Annual Armenian Independence Day Festival** — Sep 20, Verdugo Park Glendale, FREE (Cultural)
  - **ANCA Western Region Annual Awards Gala 2026** — Oct 11, Taglyan Complex, save-the-date (Community)
- **Posters still pending for all 6** (gradient placeholders until uploaded). Preview only; not deployed.

---

## 2026-07-15 (cont.) — New hero banner + scroll-arrows restyled

- **New hero banner** installed: Gohar uploaded the redesigned banner (repositioned text, wider
  layout) as `images/banner.png`, replacing the original. Confirmed it renders in the hero.
- **Scroll-nav arrows** restyled per Gohar: smaller (42→32px), circle background kept **translucent
  + blurred** so it doesn't cover text, but the **white arrow glyph is now fully opaque** (dropped
  the earlier container-wide dimming) so the control stays legible. Hover still fills to apricot.
- Preview only; **not deployed** (Gohar: "deployed enough this week").

---

## 2026-07-15 — Final two posters + AUA gala fully built out (all 37 events now have real posters)

- Gohar uploaded the last two posters. Normalized the browser-mangled filenames
  (`armenian-open-2026 (1).jpg` → `armenian-open-2026.jpg`; `AUA GALA.jpg` → `aua-gala.jpg`),
  verified both are the genuine flyers, and wired them in.
- **Armenian Open 2026** now shows its real flyer (was the gradient placeholder).
- **AUA 35th Anniversary Gala** built out from a bare save-the-date into a full listing, using the
  official page (philanthropy.aua.am/aua35) + the IG post Gohar provided: real poster, venue
  (**The Beverly Hilton, International Ballroom, Beverly Hills**), **5:00 PM** cocktail reception /
  6:30 PM program, ticket link, and RSVP-by Oct 5 note. **Also synced the Google Calendar** entry
  (was a bare all-day event) to the timed event with venue, description, and ticket link.
- Result: **every one of the 37 events now has a real poster** (no gradient fallbacks remaining).
- **Still outstanding:** the new hero banner (not yet uploaded — `images/banner.png` unchanged).
- Rebuilt previews. **Deploy:** staged on the working branch; awaiting Gohar's green light for the
  follow-up production deploy.

---

## 2026-07-14 (cont.) — Real posters wired for 4 of 5 new events

- Gohar uploaded posters to the working branch. Verified each is the genuine Instagram flyer and
  wired them in: **Trivia Sunday** (`trivia-sunday-momed.jpg`), **Armenian Vinyl Night**
  (`armenian-vinyl-night.jpg`), **AGBU Bardez Karaoke** (`bardez-karaoke-agbu.jpg` — updated the
  event's poster reference to match the uploaded filename), **Art After Dark** (`art-after-dark.jpg`).
- **Still on gradient placeholders (not uploaded):** *Armenian Open 2026 — Golf Tournament*
  (`armenian-open-2026.jpg` missing) and the **new hero banner** (`images/banner.png` unchanged
  from the original).
- Note: images/ is now ~14 MB (over the historical 10 MB Netlify-Drop guardrail; not a blocker for
  git-connected deploys + lazy-loaded images, but worth a compression pass later).
- Rebuilt previews.
- **DEPLOYED to production 2026-07-14** on Gohar's green light (Option A: ship now, add the 2
  remaining images later). Fast-forwarded `main` e3d2f3c → e303725; Netlify auto-published.
  Verified live at armenianeventsla.com: 37 events, "This Month" section, and all 4 new posters +
  logo favicon return HTTP 200. Armenian Open shows its gradient (poster 404 as expected).
- **Still to add in a follow-up deploy:** `armenian-open-2026.jpg` and the new hero banner.

---

## 2026-07-14 (cont.) — Automated the poster handoff (Cowork pushes via local git)

- Gohar wants the poster handoff automated; the cloud Code session physically cannot read the
  local drive, so the push must originate from the machine that has the files (Cowork).
- Updated `docs/WEEKLY-INGESTION-PROMPTS.md`: Part 1 now saves posters into the **local git
  clone** and **`git push`es an `ingest/<date>` branch** using the computer's existing git
  login (a plain push, not the GitHub connector Cowork lacks). Part 2 pulls that branch
  automatically. Documented the one-time check (confirm local `git push` is authenticated) and
  the fallback (run Claude Code locally). This removes the manual per-run file upload.
- For the current batch, the 5 posters are still only on Gohar's local drive (not on any branch),
  so they still need a one-time push/upload before this session can wire them in.

---

## 2026-07-14 (cont.) — Assembly re-run: calendar in sync, AUA Gala added (36 → 37)

- Ran the corrected Part 2 (Code) assembly check: fetched the repo (no `ingest` branch, no
  posters uploaded) and re-diffed the Google Calendar (14 upcoming events) against the site.
  Everything already matched **except** the **AUA 35th Anniversary Gala** (Nov 7), which was on
  the calendar but not the site.
- **Added AUA 35th Anniversary Gala** as a save-the-date (Community; no time/venue/link yet —
  the calendar entry has none; gradient card, no poster). Site now at **37 events**, fully in
  sync with the calendar. Removable on request if it was intentionally held.
- Rebuilt the dated preview + the artifact preview link.
- **Deploy:** none — awaiting green light (and still: 5 event posters + new banner).

---

## 2026-07-14 (cont.) — Corrected ingestion workflow (Cowork has no GitHub access)

- Discovered from Gohar's Cowork run: **the Cowork environment cannot reach the GitHub repo**
  (which is why the poster photos never arrived as an ingest branch). Rewrote
  `docs/WEEKLY-INGESTION-PROMPTS.md` to match reality:
  - **Cowork** does Instagram + Google Calendar + saves posters to a **local folder** (no GitHub,
    no website work). It reports the folder path and filenames.
  - **Google Calendar is the automatic data bridge**; **Gohar is the image bridge** — carries the
    poster files into the Code session (drag into chat, or upload to the working branch).
  - **Code (cloud)** does all repo + website work: reads the calendar, receives the posters,
    builds the site + dated preview, and waits for the green light.
  - Documented two ways to remove the one manual step later: authorize Cowork's GitHub access, or
    run Claude Code locally (a local session sees both local files and GitHub).

---

## 2026-07-14 (cont.) — Site features: "This Month" section, favicon, compact cards

- **New "This Month" section** on the homepage, between "Happening This Week" and the full
  "Calendar of Events." Shows every event in the **next 30 days** (`renderMonth()`), with a live
  count hint ("N events in the next 30 days"). Added a "This Month" nav-menu link and wired the
  section into the up/down scroll-nav.
- **Compact cards** for the "This Month" grid at Gohar's request — ~1/3 the footprint of the
  week cards (measured area ratio 0.29): more columns (min 185px vs 320px), tighter padding,
  smaller type, description hidden; 2-up on mobile. Same card component, so posters/badges/links
  all carry over. Note: this-week events also appear here (nested time windows) — say the word if
  you'd rather "This Month" start after this week to avoid the overlap.
- **Favicon added:** the site logo (`images/logo.png`) now serves as the browser-tab icon
  (`<link rel="icon">` + `apple-touch-icon`).
- **Deploy:** preview updated in place; production? **no — awaiting green light.**

---

## 2026-07-14 — First assembly run: 5 events added, GENÄTZ updated (31 → 36 events)

**Events added** (from the Armenian Events of LA Google Calendar, populated by the 2026-07-14
Cowork collection run):
- **Trivia Sunday @ MOMED — Serov Social Club** — Sun Jul 26, 5:30 PM, MOMED Atwater Village
  (Social; RSVP via SurveyMonkey).
- **Armenian Vinyl Night — MOMED × DiscoTchari** — Wed Jul 29, 7–10:30 PM, MOMED Atwater Village
  (Music; $25/$30 bar reservation, $5 dinner cover; tickets at atmomed.com — resolved from link-in-bio).
- **AGBU LA Choir "Bardez" Karaoke Night** — Fri Jul 31, 7 PM, AGBU Manoukian Cultural Center,
  Pasadena (Social; $50/person incl. tacos & churros; RSVP by DM → Instagram post link).
- **Armenian Open 2026 — Golf Tournament** — Sun Aug 16, DeBell Golf Course, Burbank (Sports;
  divisions $150–$170; registration link). Closes the gap flagged 2026-07-02.
- **Art After Dark — Armenian American Museum × 301 AD** — Sat Aug 29, 6:30 PM, The Vault,
  Glendale (Cultural; fundraiser; tickets at armenianamericanmuseum.org, reserve by Aug 22).

**Events updated:**
- **GENÄTZ Vol. III** — full details replaced the "Lineup TBA" placeholder: 7 PM at Parc 3030
  (Glassell Park), lineup (Hrag Beko, Zolo, Karagusi), vendors, tickets from $17.49; removed
  the incorrect FREE badge.

**Posters pending:** the 5 new events reference `images/trivia-sunday-momed.jpg`,
`armenian-vinyl-night.jpg`, `agbu-choir-karaoke.jpg`, `armenian-open-2026.jpg`,
`art-after-dark.jpg` — photos are on Gohar's local drive from the collection run (no ingest
branch was pushed); art-gradient fallbacks render until the JPGs land in `/images`.

**Deliberately NOT added:** AUA 35th Anniversary Gala (Nov 7) — on the calendar since February
with no details; treated as an intentional save-the-date pending Gohar's confirmation.

**Hye Notes #8 poster fixed:** the site was showing a *generated* purple placeholder
(`images/hye-notes-8.jpg`) instead of a real flyer. Replaced it with the actual Instagram
flyer already archived at `site-history/source-flyers/ig_hye-notes-8.jpg` (blue karaoke-night
art). Verified it renders in the preview.

**Banner:** Gohar asked to swap the hero banner for a newer one "saved in the images folder,"
but the repo contains only the current `images/banner.png` (no alternate) — the new banner is
presumably on Gohar's local drive and still needs to be provided/pushed before it can be swapped in.

**Deploy:** preview saved to `/deploy-previews/2026/07-July/2026-07-14_001_5-new-events-genatz-update.html`;
deployed to production? **no — awaiting green light** (plus the 5 remaining poster photos and the new banner).

---

## 2026-07-06 — Twice-weekly ingestion schedule (Cowork collect + Code assemble)

- Added **`docs/WEEKLY-INGESTION-PROMPTS.md`** (supersedes and removes `COWORK-INGEST-PROMPT.md`):
  - **Part 1 (Cowork, Mon & Fri 11:00 AM PT):** paste-in prompt that asks the desktop session to
    schedule itself, scrub Instagram likes since the last run, qualify events, **add/update the
    Google Calendar entries directly**, save each post's photo as the poster, and push posters +
    manifest to an `ingest/<date>` branch.
  - **Part 2 (Code, Mon & Fri ~12:00 PM PT):** assembly prompt that turns calendar data + ingest
    posters into website `EVENTS` entries, builds the dated preview, and **stops for the green
    light** before any `main`/Netlify deploy.
  - Documented schedule limits honestly: in-session cloud schedules are memory-only (lost on
    container restart/rewind) and expire after 7 days; the durable path is the paste-in prompt
    (or a future GitHub Actions cron).
- Note: the first version of this change (committed earlier today) was erased by a session
  checkpoint rollback and has been recreated with the updated Mon/Fri 11 AM schedule.
- **Still blocked:** session GitHub access is read-only (403 on push); write access needed before
  Part 2 can publish branches/previews.
- **Deploy:** none (docs only; no site change).

---

## 2026-07-02 — Event-ingestion runbook; calendar/site gap check; no scheduled runs

- Added **`docs/EVENT-INGESTION-RUNBOOK.md`**: the owner's standing step-by-step procedure for
  filling in the website from the Instagram likes feed (qualify → cross-check Google Calendar →
  add/update calendar → add event + original poster to site → dated preview → green light),
  including the free/multi-day labeling rules, the "card, not poster" rule for category/date,
  the "link in bio" resolution rule, and the verified cloud-sandbox division of labor
  (Instagram needs Gohar; Google Calendar + site edits are automatable).
- Confirmed **no scheduled/recurring runs** are active in the session (cron list empty).
- **Gap check (calendar 15 upcoming vs site 31 events):** *Armenian Open 2026 — Golf Tournament*
  (Aug 16, added to calendar 2026-07-01) is not yet on the website; *AUA 35th Anniversary Gala*
  (Nov 7) is on the calendar but not the site (confirm intent). July 12 Vartavar titles differ
  between site and calendar (same event).
- Added **`docs/COWORK-INGEST-PROMPT.md`**: a paste-in kickoff prompt for a Cowork session on
  Gohar's computer that collects the week's qualifying Instagram posts (photos + manifest.json)
  and pushes them to an `ingest/<date>` branch, which the cloud Code session then turns into
  calendar entries, site events, and a dated preview.
- **Deploy:** none (docs only; no site change).

---

## 2026-06-27 (cont.) — Reinforced no-deploy rule; repo-visibility decision pending

- Added a prominent bold callout at the top of `CLAUDE.md`'s guardrails: never push to `main`/production
  or deploy to Netlify without Gohar's explicit green light.
- **Repo visibility:** owner wants the repo **private**. Note for whoever does it: changing visibility is
  an access-control setting (done by the owner in GitHub Settings → Danger Zone). Caveat — on a free
  GitHub plan, a **private repo disables GitHub Pages**, which would break the rendered preview URLs
  (`armenianeventsla.github.io/calendar/...`). Netlify deploys keep working (the Netlify GitHub app
  retains access). If going private, use Netlify deploy previews, a paid GitHub plan for private Pages,
  or self-contained local preview files for review.

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
