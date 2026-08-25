# Preview — 2026-08-25

Open **`preview.html`** — a self-contained snapshot (images embedded). Site is now
**24 events** (was 66) after removing past events and adding a new batch.

## What changed this round

### 1) Removed all past events (49 removed)

Cleaned every event whose date had already passed (before **Aug 25, 2026**) out of the
`EVENTS` array — June/July, the World Cup series, and everything through Aug 21 (APS Sunset
Social). The site already auto-hid past events at render time, so this doesn't change what
visitors saw — it just declutters the source. History is still preserved in the dated
`deploy-previews/` snapshots, `site-history/`, and the Google Calendar.

⚠️ **Two recurring markets were among the removed** (their single listed date is in the
past): **Downtown Burbank Cultural Market** and **Glendale Cultural Night Market**. If either
is still running weekly, tell me and I'll re-add it rolled forward to its next date.

### 2) Added 6 new events (+ 2 more Speed Dating dates) — with your uploaded posters

You uploaded the real flyers to GitHub (branch `claude/cowork-session-context-t7bjj1`); all
of these use them:

| Event | Date | Category | Poster |
|---|---|---|---|
| **Armenian Wine Tasting — Khachen Estate @ Gini** | Fri Aug 28, 6–9 PM · Gini, Burbank | Cultural | ✅ your flyer |
| **Mesrobian Car Show** (Montebello AYF) | Sat Sep 12, 9 AM–1 PM · Pico Rivera · $20/$5 | Community | ✅ your flyer |
| **Armenian Bar Assoc. — Judges' Night & Awards Dinner** | Thu Sep 17, 5 PM recep. · Los Feliz · $75–$350 | Gala | ✅ your flyer |
| **AGBU Global Run — Team Greater LA** | Sun Sep 20 · Griffith Park · 10K/5K | Sports | ✅ your flyer |
| **Armenian Speed Dating (Sep 16)** | Wed Sep 16, 7–9 PM · Glendale · $35 | Social | ⚠️ your flyer (shows Sep 2 — see below) |
| **Armenian Speed Dating — "For All" (Sep 23)** | Wed Sep 23, 7–9 PM · Glendale · $35 | Social | ✅ your flyer (Sep 23) |
| **Backgammon Tournament — Holy Cross Food Fest** | Sat Oct 24, 3 PM · Montebello · $25 | Community | ✅ your flyer |

Ticket links wired where provided: Judges' Night → `armenianbar.org/JN2026` (Tickets),
AGBU Run → `agbu.org/global-run-2026` (Register), Speed Dating → the sign-up site (Sign Up).
The rest link to their Instagram source.

### Speed Dating — now three dated cards
Split into **Sep 2**, **Sep 16**, and **Sep 23** cards (matching your three uploaded flyers
and the calendar). Note: the **Sep 16** flyer you uploaded is the same image as the Sep 2 one
— it visibly reads *"September 2."* So that card's poster shows the wrong date. Want me to
build a corrected Sep 16 poster, reuse the Sep 23 (teal) design re-dated, or drop in a real
Sep 16 flyer if you have one?

## Skipped
- **Armenian Folk Dance Workshop** (Maple Park, Aug 23) — you uploaded its poster, but the
  date (Aug 23) is already past, so I left it off. Say the word if you still want it.

## Notes
- Total after this round: **24 events**.
- No deploy performed. Awaiting green light before updating production / publishing to Netlify.
