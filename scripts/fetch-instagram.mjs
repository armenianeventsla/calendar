#!/usr/bin/env node
/**
 * fetch-instagram.mjs — pull recent posts + posters from @armenianeventsla via the
 * Instagram Graph API, ready for the "update the calendar from Instagram" flow.
 *
 * What it does (READ-ONLY — it never deploys or pushes):
 *   1. Calls GET /me/media for the account's own published posts.
 *   2. Downloads each post's image(s) (the flyer/poster) into ./scripts/instagram-pull/.
 *   3. Writes a manifest.json with caption, permalink, timestamp, and local image paths.
 *   4. Prints a summary so Claude (or a developer) can turn new ones into EVENTS objects,
 *      build a deploy preview, and — only after your green light — push to main.
 *
 * Requirements:
 *   - Node 18+ (uses built-in fetch). No npm install needed.
 *   - A long-lived Instagram Graph API access token (Creator/Business account).
 *     See scripts/README.md for how to get one. Then set it as an env var:
 *
 *       export IG_ACCESS_TOKEN=xxxxxxxx        # macOS/Linux
 *       setx   IG_ACCESS_TOKEN "xxxxxxxx"      # Windows (new terminal after)
 *
 *   Run:  node scripts/fetch-instagram.mjs            (defaults to 25 most recent posts)
 *         node scripts/fetch-instagram.mjs 10         (10 most recent)
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const TOKEN = process.env.IG_ACCESS_TOKEN;
const BASE = process.env.IG_API_BASE || "https://graph.instagram.com";
const LIMIT = Number(process.argv[2] || 25);

if (!TOKEN) {
  console.error("ERROR: set IG_ACCESS_TOKEN first (see scripts/README.md).");
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "instagram-pull");

const FIELDS = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";

async function api(path, params = {}) {
  const url = new URL(`${BASE}/${path}`);
  url.search = new URLSearchParams({ ...params, access_token: TOKEN }).toString();
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return res.json();
}

function slug(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "post";
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status} for ${dest}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return buf.length;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Fetching up to ${LIMIT} recent posts from Instagram...`);
  const { data = [] } = await api("me/media", { fields: FIELDS, limit: LIMIT });

  const manifest = [];
  for (const post of data) {
    const stamp = (post.timestamp || "").slice(0, 10);
    const base = `${stamp}_${slug((post.caption || post.id).split("\n")[0])}`;
    const images = [];

    // Collect image URL(s): single image, video thumbnail, or every slide of a carousel.
    let urls = [];
    if (post.media_type === "CAROUSEL_ALBUM") {
      const kids = await api(`${post.id}/children`, { fields: "media_type,media_url,thumbnail_url" });
      urls = (kids.data || []).map((k) => k.media_url || k.thumbnail_url).filter(Boolean);
    } else {
      const u = post.media_url || post.thumbnail_url;
      if (u) urls = [u];
    }

    for (let i = 0; i < urls.length; i++) {
      const file = `${base}${urls.length > 1 ? `_${i + 1}` : ""}.jpg`;
      try {
        const bytes = await download(urls[i], join(OUT_DIR, file));
        images.push({ file, bytes });
      } catch (e) {
        console.warn(`  ! could not download slide ${i + 1} of ${post.id}: ${e.message}`);
      }
    }

    manifest.push({
      id: post.id,
      timestamp: post.timestamp,
      permalink: post.permalink,
      media_type: post.media_type,
      caption: post.caption || "",
      images,
    });
    console.log(`  • ${stamp}  ${images.length} image(s)  ${post.permalink}`);
  }

  await writeFile(join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`\nDone. ${manifest.length} posts, images + manifest.json in scripts/instagram-pull/.`);
  console.log("Next: review the manifest, decide which are NEW upcoming LA Armenian events,");
  console.log("copy each chosen poster into images/<slug>.jpg, add an EVENTS object to index.html,");
  console.log("build a deploy preview, and push to main ONLY after green light (see CLAUDE.md).");
}

main().catch((e) => { console.error(e); process.exit(1); });
