# Preview — 2026-08-18

Open **`preview.html`** — a self-contained snapshot (images embedded). Site is now
**66 events** (was 60).

## What changed this round

### 6 new events added (from the Google Calendar) + posters

All six were added to the "Armenian Events of LA" Google Calendar today (created 2026-08-18)
and weren't on the site yet. Appended to the `EVENTS` array (the site sorts by date, so they
land chronologically).

| Event | Date | Category | Poster |
|---|---|---|---|
| **Armenian Speed Dating — Ages 26–40** (Urartu Coffee) | Wed Sep 2 (also Sep 16), 7–9 PM · Glendale · $35 | Social ⚠️ | `armenian-speed-dating.jpg` ✅ (real flyer) |
| **End of Summer Hike & Waterfall Swim — Stoddard Falls** | Sun Sep 6, 8:45 AM carpool · Angeles Forest | Community | `end-summer-hike-stoddard.jpg` 🎨 (generated) |
| **Vartoush Loves You! — Mary Basmadjian at Flappers** | Thu Sep 10, 7:30 PM · Flappers, Burbank | Comedy | `vartoush-loves-you.jpg` 🎨 (generated) |
| **LuysHike #4 — Community Hike** | Sat Sep 12, 7 AM · LA area (TBA) | Community | `luyshike-4.jpg` ✅ (real flyer) |
| **WanderCrust Tea — A Magical Tea Party** | Sun Sep 13, 11:30 AM · The Valley Hive, Chatsworth | Social | `wandercrust-tea.jpg` 🎨 (generated) |
| **Laughing Lavash — Armenian Comedy Night** (Jack Jr @ CSUN) | Thu Oct 22 (time TBA) · CSUN, Northridge | Comedy | `laughing-lavash-csun.jpg` ✅ (real flyer) |

All six link to their Instagram source (none had a public ticket/RSVP URL).

### Posters — real vs generated

Instagram was gating the full flyers to the proxy this round, but I pulled the public
poster crops via the flyer's own bot preview. Three came through clean and are the **real
flyers**: Speed Dating, LuysHike #4, Laughing Lavash.

The other three couldn't be used as-is — **Vartoush** and **WanderCrust** are wide flyers
that Instagram only serves as a square crop with the title sliced off, and the **Stoddard
Falls** post is a Reel whose thumbnail carries a ▶ play-button overlay. For those I built
clean **in-style posters** (`🎨` above) from each event's real details, themed to match
(teal water, warm comedy orange, dusty-blue tea party). Drop the organizers' real flyer at
the same `images/…jpg` filename anytime to override the generated one.

## Things to confirm before green-light

1. **Armenian Speed Dating** — this category was previously on our *skip* list (see the
   2026-08-01 changelog note). I included it this round because **you added it to the
   calendar** — but flagging it in case you'd rather leave speed-dating off the site. It runs
   **twice** (Sep 2 & Sep 16); I used one card dated Sep 2 noting both. Say the word to drop
   it, or to split into two dated cards.
2. **Jazz Night — Trio Brio** (Homenetmen Burbank, Aug 15) was also new on the calendar but
   its date (Aug 15) is already **past**, so I left it off. Tell me if you still want it shown.
3. **Times/venues TBA:** LuysHike #4 location and Laughing Lavash start time are "coming
   soon" per their posts — shown as TBA for now.

## Notes

- Total after this round: **66 events**.
- No deploy performed. Awaiting green light before updating production / publishing to Netlify.
