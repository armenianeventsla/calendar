# Preview — 2026-08-07

Open **`preview.html`** — a self-contained snapshot (images embedded). Site is now
**60 events** (was 57).

## What changed this round

### 3 new events added (from the Google Calendar) + 2 posters

All three are on the "Armenian Events of LA" Google Calendar but weren't yet on the site.
Nothing else on the site was touched — the events are appended to the `EVENTS` array and
the site sorts by date at render time, so they land in the right chronological place.

| Event | Date | Category | Free? | Poster |
|---|---|---|---|---|
| **Glendale Cultural Night Market** | Sat Aug 8, 5–10 PM · Artsakh Paseo, Downtown Glendale | Shopping | FREE | `glendale-cultural-night-market.jpg` ✅ (real flyer) |
| **San Gabriel Valley Phoenix Poets — Fundraising Celebration** | Sat Aug 15, 7–9 PM · La Cañada (address on RSVP) | Community | — (fundraiser) | `sgv-phoenix-poets.jpg` 🎨 (generated in-style — see below) |
| **AGBU Gala Night — featuring Harout Pamboukjian** | Fri Sep 18 (evening) · Deluxe Banquet Hall, Burbank | Gala | — ($150) | `agbu-gala-night-harout.jpg` ✅ (real flyer) |

Links: **Glendale** and **Phoenix Poets** → Instagram (no public ticket/RSVP URL — Phoenix
directs to the link in @raffijoe's bio). **AGBU Gala** → real ticket page
`agbu.org/gala-night-reserve`, labeled "Tickets".

### Posters

The flyers for **Glendale** and **AGBU Gala** were pulled from their Instagram posts and
saved into `/images` — both read cleanly as square poster art.

The **Phoenix Poets** flyer is a wide (landscape) graphic and Instagram only serves a square
crop publicly that cuts the title off both sides. So this poster is a clean **in-style
recreation** (`sgv-phoenix-poets.jpg`) built to match the real flyer's look — blue field,
white angled banners, yellow "Fundraising Celebration" bar — with the event's real details.
It reads as a proper poster now. To swap in the organizers' original flyer later, just drop a
JPG at **`images/sgv-phoenix-poets.jpg`** (same filename) and it overrides this one.

### Also: marked the Armenian Frame Drum Circle (Aug 9) as SOLD OUT

Per Gohar — added the red **SOLD OUT** badge to the existing **Armenian Frame Drum Circle**
event (`discount:"SOLD OUT"`), same treatment as the Navasartian Victory Ball.

## Things to confirm before green-light

1. **Glendale market date.** The organizers' flyer is a "Calling All Vendors" launch post and
   the calendar note says the market is *newly launching / "coming soon"* — the actual first
   night wasn't firmly stated. I used **Sat Aug 8** (the calendar's first recurring instance,
   Saturdays 5–10 PM). It's modeled as a **single card** like the Downtown Burbank market, not
   one card per week. Confirm the launch date (and whether you want it shown as recurring).
2. **AGBU Gala start time.** The flyer gives the date and venue but not an exact start time
   ("evening dinner gala — time via tickets"), so the card shows the date without a time.
3. **AGBU Gala category = Gala** (purple). Phoenix Poets filed under **Community** (fundraiser
   / poetry). Glendale under **Shopping** (vendor market), matching the Burbank market. Easy
   to switch any of these.

## Notes

- Total after this round: **60 events**.
- No deploy performed. Awaiting green light before updating production / publishing to Netlify.
