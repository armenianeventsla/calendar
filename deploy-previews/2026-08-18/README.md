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
| **Armenian Speed Dating — Ages 26–40** (Urartu Coffee) | Wed Sep 2 (also Sep 16), 7–9 PM · Glendale · $35 | Social ⚠️ | ✅ real flyer (your upload) |
| **End of Summer Hike & Waterfall Swim — Stoddard Falls** | Sun Sep 6, 8:45 AM carpool · Angeles Forest | Community | 🎨 in-style (no flyer uploaded) |
| **Vartoush Loves You! — Mary Basmadjian at Flappers** | Thu Sep 10, Doors 6:30 / Show 7:30 · Flappers, Burbank | Comedy | ✅ real flyer (your upload) |
| **LuysHike #4 — Community Hike** | Sat Sep 12, 7 AM · LA area (TBA) | Community | ✅ real flyer (your upload) |
| **WanderCrust Tea — A Magical Tea Party** | Sun Sep 13, 11:30 AM · The Valley Hive, Chatsworth | Social | ✅ real flyer (your upload) |
| **Laughing Lavash — Armenian Comedy Night** (Jack Jr @ CSUN) | Thu Oct 22 (time TBA) · CSUN, Northridge | Comedy | ✅ real flyer (your upload) |

All six link to their Instagram source (none had a public ticket/RSVP URL).

### Posters — now using your uploaded flyers

You uploaded the real full flyers to GitHub (branch `claude/cowork-session-context-t7bjj1`).
I pulled them onto this branch and swapped them in, so **five of the six now use your real
posters** — full-frame, no cropping/zoom. Only **Stoddard Falls** keeps an in-style poster
(no flyer was uploaded for it, and its Instagram post is a Reel with a ▶ overlay); drop a
JPG at `images/end-summer-hike-stoddard.jpg` anytime to override it.

**Speed Dating posters:** the two files you uploaded (`…-sep2` and `…-sep16`) are the same
image — the **Sep 2** flyer. So for now it's one card dated Sep 2 (noting Sep 16). Want two
separate dated cards? If so, is there a Sep 16 version of the flyer, or should the Sep 16
card reuse this one / use an in-style Sep 16 poster? (See question 1 below.)

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
- **DEPLOYED to production on 2026-08-18** (Netlify deploy `6a862347`), verified live at
  armenianeventsla.com.
