# Website Analysis & Growth Suggestions — Armenian Events of LA

_Analysis of `index.html` as of 2026-06-27, with prioritized, actionable suggestions._

## What the site is today

A single, self-contained `index.html` (no build step, no framework) with a dark, modern theme.
Everything is driven by a JavaScript `EVENTS` array rendered on load. Key features that already work well:

- **Hero** with clear positioning ("New events added weekly — In Los Angeles") and three CTAs:
  Browse, Subscribe to Google Calendar, Partner with us.
- **"Happening This Week"** auto-filtered cards.
- **"Calendar of Events"** list with **category** and **date** filter chips; past events auto-hide.
- **Event detail modal** with poster, full description, and ticket/RSVP/Instagram buttons.
- **Poster system** with a graceful gradient `art` fallback when an image is missing.
- **"Partner with us"** sponsorship section (four tiers) + Google Form, and a "Submit an Event" form.
- **Social links** (Instagram, TikTok, YouTube, email) and a Google Calendar subscribe link.

It's genuinely good for a hand-maintained community site. The suggestions below are about
**discoverability, trust, conversion, and lower maintenance** — the things that turn a nice page
into a growing one.

---

## Prioritized suggestions

### Tier 1 — High impact, low effort (do these first)

1. **Add SEO + social-share metadata.** The page has a `<title>` but no meta description,
   Open Graph, or Twitter cards. When someone shares the link in a group chat or on Instagram,
   it shows no image or summary. Add `<meta name="description">`, `og:title/description/image`
   (use `images/banner.png`), and `twitter:card`. _Biggest bang-for-buck for sharing/SEO._
2. **Add a favicon and web-app icons** so the tab and phone home-screen shortcut look legit.
3. **Add structured data (JSON-LD `Event` schema)** for each event. This makes events eligible
   to appear in **Google Search event listings and Google Maps** — huge for discovery of local events.
4. **Add a simple privacy-friendly analytics** (Plausible, Fathom, or Cloudflare Web Analytics)
   so we can see which events and links people click, and where traffic comes from.
5. **Set a canonical URL** (`<link rel="canonical" href="https://armenianeventsla.com/">`).

### Tier 2 — Growth & engagement

6. **Email capture / newsletter.** Add a "Get the weekly events email" signup (Mailchimp,
   Buttondown, or a simple form). The calendar subscribe is great for power users; email reaches everyone.
7. **"Add to calendar" per event** for Apple/Outlook too (not just Google) via downloadable `.ics`.
8. **Share buttons per event** (copy link, share to Instagram Stories/WhatsApp). Community events
   spread by word of mouth — make it one tap.
9. **Featured / pinned event** slot at the top for the biggest upcoming event.
10. **Map view or neighborhood tags** (Glendale, Burbank, NoHo, Pasadena…) so people can filter by area.

### Tier 3 — Trust, polish & accessibility

11. **Accessibility pass:** ensure all interactive elements are keyboard-reachable, the modal traps
    focus and closes on Esc, images have descriptive `alt`, and color contrast meets WCAG AA.
12. **`alt` text and lazy-loading** are partially present — make sure every poster has meaningful alt.
13. **Loading/empty states** are handled; add a friendly "Past events" toggle so history isn't lost.
14. **Consistent poster sizing** (the cards look best when posters share an aspect ratio).

### Tier 4 — Maintenance & workflow (this is why we're moving to GitHub)

15. **Split data from layout.** Move the `EVENTS` array into a separate `events.json` so editing an
    event doesn't mean scrolling through HTML/CSS. The page can `fetch()` it. _Makes weekly edits trivial._
16. **A tiny "add event" checklist/template** in the repo so every event has the same fields filled.
17. **Image optimization step** — posters compressed/resized on add keeps the deploy small and fast.
18. **Dated deploy-preview snapshots** (now set up under `/deploy-previews/`) so we never lose a version.

### Tier 5 — Monetization & sustainability

19. **Make the Partner tiers easier to buy** — add prices (or "starting at") and a direct
    Stripe/PayPal link or Calendly, instead of only a Google Form. Lower friction = more sponsors.
20. **Local business directory / "Local Favorites"** paid listings tie into the existing Always-On tier.
21. **Sponsored event highlight** styling (a subtle badge) that's already hinted at in the tiers.

---

## Quick technical notes for whoever edits next

- It's one file: styles in `<style>`, markup in `<body>`, logic + `EVENTS` in `<script>`.
- To add an event: copy an existing object in `EVENTS`, fill the fields, set `poster:"images/<slug>.jpg"`,
  and (if there's a ticket link) set `link` + `linkLabel`. Each object also has an `art:{}` gradient fallback.
- Category colors are defined in `CAT_COLORS`. Valid categories: Cultural, Social, Music, Sports,
  Community, Shopping.
- After editing, the script should still parse — a quick `node --check` on the extracted `<script>` catches typos.
- Never deploy an `index.html` that doesn't end in `</html>` (a known file-sync gotcha).

---

## Suggested 30-day plan

- **Week 1:** Tier 1 items (meta tags, favicon, JSON-LD, analytics). One deploy.
- **Week 2:** Email signup + per-event share/.ics. One deploy.
- **Week 3:** Move `EVENTS` to `events.json`; neighborhood filter. One deploy.
- **Week 4:** Accessibility pass + Partner-tier pricing/checkout. One deploy.

That's ~4 deploys for a major upgrade — friendly to limited deploy credits.
