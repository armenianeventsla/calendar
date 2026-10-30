# Preview — 2026-10-30

Open **`preview.html`**, a self-contained snapshot with the images embedded. The site now has
**23 event cards** (it had 28).

> Built on the current production version (28 events, deployed 2026-10-24 by another session).

## What changed this round

### 5 new events added, with your uploaded posters (branch `claude/cowork-session-context-t7bjj1`, Oct 30 upload)

| Event | Date | Category | Link |
|---|---|---|---|
| **Jack Jr Halloween Party at Lé Brand** | Sat Oct 31, 8 PM · Glendale | Comedy | Instagram (@lebrandrestaurant) |
| **ArevaHike — Sturtevant Falls Trail Hike** | Sun Nov 1, 7:45 AM · Chantry Flat | Sports · FREE | Instagram (@arevahike) |
| **APS — Fall Into Good Company** | Thu Nov 5, 6:30 PM · Laya, Hollywood · $35/$50 | Social | **Tickets** → bit.ly/GoodCompanyAPS |
| **AGBU YPLA Mixer — Reunion & Company** | Fri Nov 13, 7 PM · Silver Lake · $60 | Social | Instagram (@agbuypla) |
| **Armenian Speed Dating — Ages 26–40** | Thu Nov 19, 7–9 PM · Urartu Coffee · $35 | Social | **Tickets** → armenianspeeddating.com |

### Updated
- **GiniFest 2026**: moved again, to **Sun Dec 6, 3–9 PM**, and indoors at the **Glendale Civic
  Auditorium** (1401 N Verdugo Rd). It now uses your new "New Date" poster.
- **GHOSTED Halloween Party**: moved indoors because of the rain forecast. The new venue is
  **Vertigo, 400 W Glenoaks Blvd, Glendale**.

### Removed 10 past events (Oct 23–25)
Holy Cross Food Fair, Holy Cross Backgammon, Peto Poghosyan show, AGBU LA Choir, Serov × TRU8,
Homenetmen Sipan hike, AAMS Brand Park hike, ArevaHike Griffith Park, Surj & Paint, WanderCrust
Spooky Tea.

### Site improvements (in both previews)
- **Late-night times fixed.** Events ending after midnight showed nonsense like "8 PM - 1 PM".
  GHOSTED now reads **"8 PM - 1 AM"**, and events ending at 11:59 PM read **"8 PM - Late"**.
  The **"+ Calendar"** button for after-midnight events now gives a correct end time on the next
  day. Before, it built a broken "25:00" link.
- **New area filter** in Calendar of Events, as a third row of buttons: 📍 All areas ·
  Glendale · Burbank · San Fernando Valley · Pasadena & San Gabriel Valley · Los Angeles ·
  Orange County. The area comes from each event's address, and only areas with upcoming events
  get a button. It works together with the date and category buttons.

## Optional: new look (separate approval)

Open **`preview-cream.html`**. It has the same events as above, with the proposed new look:
- **Cream background** (`#f8f1e3`), white-cream cards, and dark brown text.
- **Red, blue and orange stripes** (the Armenian flag colors `#D90012` / `#0033A0` / `#F2A800`)
  around the whole edge of the window. They stay in place while you scroll. Each stripe is 6px
  wide on computers and 3px on phones.
- A **thin burgundy border** (`#7a1f2b`, 1.5px) around every event card in **Happening This
  Week**, **This Month**, and **Calendar of Events**. In the Calendar of Events, each event is
  now its own bordered card with a small gap between them. Before, they were one stacked list.
- The buttons use the same flag colors. Orange text, like the dates, is a darker orange so it
  stays readable on cream.

The new look lives in `cream-theme.css`, a set of style changes added on top of the current
design. It is **not** in `index.html` yet. Choose either option:
- deploy **just the events** (the current dark design), or
- deploy **events + new look**, which adds `cream-theme.css` to `index.html` before deploying.

## Notes
- The **Oct 23 upload** was already handled in the Oct 24 deploy.
- **Hye Notes #11**: Gohar confirmed **North Hollywood**. The site already uses that address.
- Posters were resized to a maximum width of 1080 px for the site.
- **Not deployed.** Production (`main` / Netlify) is unchanged and waiting for Gohar's green light.
