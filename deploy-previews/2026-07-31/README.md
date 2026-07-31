# Preview — 2026-07-31

Open **`preview.html`** — a self-contained snapshot (images embedded) to review
all three changes below. **Preview only — not deployed.** Awaiting Gohar's green
light before touching production `index.html` on `main` / Netlify.

## What changed this round

### 1. Bardez Karaoke Night marked SOLD OUT
- Added `discount:"SOLD OUT"` to **AGBU LA Choir "Bardez" Karaoke Night** (Fri Jul 31),
  so the card/list/modal now show the red **SOLD OUT** badge next to the title —
  same treatment already used on the Navasartian Victory Ball.

### 2. Buttons & badges made rectangular (no more pills)
- Every pill-shaped element (`border-radius:999px`) is now a clean rectangle
  (`4px`): the top badge, the **filter chips**, all category tags, and the
  SOLD OUT / FREE / date-range badges.
- Action buttons and the poster date-chip were also squared off (10–12px → 4px):
  `.btn`, `.mini` (+Calendar / Tickets), `.submit`, and the modal action buttons.
- **Left unchanged on purpose:** the round icon buttons (social links, the modal
  close ✕, the carousel arrows, the logo) and the card/container corners — none of
  those are pills. Say the word if you want those squared too.

### 3. New "Art" category — Art After Dark is no longer a Gala
- Added an **Art** category (indigo `#4338ca`) to the color map. Because the filter
  bar is generated from the events, an **Art** filter chip now appears automatically.
- Recategorized 4 events into **Art**:
  - **Art After Dark — Armenian American Museum × 301 AD** (was *Gala* → **Art**)
  - **Collective Noise — Art Exhibit** (was *Cultural* → **Art**)
  - **Armenian Paint & Chill — Masis & Sis**, both the Aug 7 and Aug 16 sessions
    (were *Cultural* → **Art**)
- If any of these should stay put (or others should move in), just tell me. The
  indigo color is easy to swap if you'd prefer a different shade.

### 4. New "Books" category — Vahe book signing moved in
- Added a **Books** category (forest green `#15803d`) for book signings / author
  talks. A **Books** filter chip appears automatically.
- Moved **Vahe Berberian × Anahid Oshagan — Book Signing** (Aug 6) from *Cultural*
  → **Books**. Just the one book event for now; set up for future ones.

### 5. FREE / SOLD OUT badges moved next to the category
- The **FREE** and **SOLD OUT** badges now sit right beside the category tag at the
  top of each card (and in the list rows and the detail modal), instead of next to
  the title. Titles read clean now.

## Note
Event count unchanged (50). The 6 August events from 2026-07-30 are untouched.
The Google Calendar entries were **not** modified — tell me if you'd like the
"SOLD OUT" note mirrored onto the Bardez calendar event.
