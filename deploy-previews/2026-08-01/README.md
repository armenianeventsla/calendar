# Preview — 2026-08-01

Open **`preview.html`** — a self-contained snapshot (images embedded). Site is now
**57 events** (was 52).

## What changed this round

### 5 new events added (from today's calendar) + their posters

All five were created on the Google Calendar today (2026-08-01); their posters were
uploaded on the Cowork branch and pulled into `images/`. Nothing else on the site was
touched.

| Event | Date | Category | Free? | Poster |
|---|---|---|---|---|
| **"The Animal People" — Documentary Screening** (Armenian Vegans of LA × Center for Armenian Arts) | Tue Aug 4, 7 PM · Center for Armenian Arts, Glendale | Film/TV | FREE | `animal-people-screening.jpg` |
| **Armenian Frame Drum Circle** (Ververi Coffee Collective × Center for Armenian Arts) | Sun Aug 9, 10 AM · Center for Armenian Arts, Glendale | Music | — (RSVP by Aug 2) | `armenian-frame-drum-circle.jpg` |
| **AGBU YP LA — Industry Spotlight: Katherine Sarafian** | Wed Aug 26, 6:30–8:30 PM · Pasadena | Community | — (application-based) | `agbu-yp-industry-spotlight.jpg` |
| **Ethno Colors — Live in Concert (Komitas 157th)** (Armenian Arts) | Sat Sep 26, 7:30 PM · Alex Theatre, Glendale | Music | — (ticketed) | `ethno-colors-concert.jpg` |
| **Armenian Food Fest** (Armenian Arts) | Sun Oct 11, 12–9 PM · 222 N Orange St, Glendale | Festival | FREE | `armenian-food-fest.jpg` |

Links: Instagram for four of them; **Ethno Colors links to the real ticket page**
(`tickets.armenianarts.com`, labeled "Tickets").

## Things to confirm before green-light

1. **Food Fest address — I used the poster, not the calendar.** The poster clearly reads
   **222 N Orange St, Glendale, CA 91203**; the calendar entry says *211* N Orange St. I
   went with the poster (222). Tell me if the calendar's 211 is actually correct and I'll
   flip it (and fix the calendar).
2. **AGBU YP category = Community.** It's a professional/mentorship roundtable about the
   film & entertainment industry — I filed it under **Community** rather than **Film/TV**
   (which is more for screenings/panels). Easy to switch if you'd rather it read Film/TV.
3. **Frame Drum host.** The poster shows **Ververi Coffee Collective** + The Center for
   Armenian Arts; the calendar only credited @armenianartscenter. I credited both.
4. **Frame Drum / AGBU YP not marked FREE.** Neither poster states a price (Frame Drum is
   RSVP-only; AGBU YP is application-based), so I left the FREE badge off. Say the word if
   either should show FREE.

## Notes

- The 5 events are **appended** to the `EVENTS` array; the site sorts by date at render
  time, so they land in the right chronological place automatically. Total: **57 events**.
- The parallel Cowork branch's `index.html` edits (the Jul-30 batch: Acoustic Sundaze,
  Vahe Berberian, Paint & Chill, Coffee Cup, Converge) were **not** merged — production
  already has all of those, so merging would have duplicated them. Only the 5 new posters
  were taken from that branch.
- Nothing deployed. This is a preview only, awaiting your green light.
