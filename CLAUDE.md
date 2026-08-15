# CLAUDE.md — Kairad Consulting Website

Context file for Claude (and humans) picking this project up in a future session.

## What this is

A static, multi-page marketing site for **Kairad Consulting** — industrial engineering
(computer-vision work measurement, the lead offering) plus warehouse automation
consulting (the second practice). Plain HTML5 + one shared CSS + vanilla JS.
**No build step, no framework** — keep it that way.

- Live host: **Netlify**, auto-deploying from GitHub repo
  `https://github.com/dp0397/Kairad-Site-updated-version` (branch `main`).
- Deploy loop: edit files → `git add -A && git commit -m "..." && git push` → Netlify redeploys.
- Owner: Dharmesh Patel · dharmesh.patel@kairad.org · +91 98197 12397.

## Brand & design system (dark mode)

All tokens live at the top of `assets/css/style.css` (`:root`). Do not invent new colors.

| Role | Hex | Usage |
|---|---|---|
| Primary (navy-blue hue) | `#6a9bcc` | headings accents, links, active nav; ramp `#8ab5e0` / `#b7cfe6` / `#4a7aa8` |
| Secondary | `#EE8329` | CTAs (btn-primary), highlights, chevrons |
| Tertiary | `#D97757` | supporting accents, hover flourishes |
| Ink / bg base | `#141413` | page bg is `#0e0e0d`, surfaces `#181817`–`#262623` |

Fonts: Space Grotesk (headings) + Inter (body), loaded in the CSS via Google Fonts.
Animations: scroll-reveal is automatic — `main.js` adds `.reveal`/`.in-view` to cards,
steps, tiles etc. New tiles using existing classes (`.card`, `.mvv-tile`, `.step`, …)
animate with zero extra work. `prefers-reduced-motion` is respected.

## Page map

| File | Purpose |
|---|---|
| `index.html` | Home — hero (autoplay CV-tool video), practice cards (IE **first**), why-Kairad, warehouse delivery model |
| `about.html` | Summarized Who We Are + Mission/Vision/Values tiles (`.mvv-grid`) + partner network |
| `industrial-engineering.html` | Lead offering. Includes **Use Cases** section (`.case-study` blocks) |
| `peb.html` `automation.html` `audit.html` `tracking.html` `wms.html` | Warehouse practice 01–05 (content intentionally preserved from the original site) |
| `dashboard.html` | Shell page that iframes `assets/dashboard/supply-chain-dashboard.html` |
| `contact.html` | Quote form → builds a `mailto:` (no backend). IE option listed first |

Ordering rule: **Industrial Engineering always comes before Warehouse Consulting** —
in the nav, footer service list, home cards, and the contact form dropdown.

## How to add a new use case / customer project (the common task)

1. Drop media into `assets/media/` (jpg ~≤300 KB; video as H.264 MP4 ~1600px wide,
   `-movflags +faststart`, plus a poster jpg).
2. In `industrial-engineering.html`, copy the existing `<div class="case-study">…</div>`
   block (pen manufacturing) — it sits under the `In The Field` section, and there's an
   `ITERATION SLOT` comment marking the spot. Edit tags (`.case-tag`), narrative,
   `.case-metrics` numbers, and media paths.
3. If it's a warehouse project instead, use the `ITERATION SLOT` comments on
   `peb.html` / `wms.html` / `index.html` card grids — add a `.card`.
4. Commit and push; Netlify does the rest.

Other iteration slots are marked with `<!-- ITERATION SLOT -->` comments across pages.

## Updating the supply-chain dashboard

Replace the single file `assets/dashboard/supply-chain-dashboard.html` with the new
self-contained dashboard HTML (inline CSS/JS only, no external build). `dashboard.html`
iframes it; nothing else needs touching.

## Conventions & gotchas

- Every page carries the same header/footer markup inline (no templating). If you
  change nav or footer, change it on **all 10 pages** (grep for `primary-nav`).
- Newsletter inputs need a unique `id` per page (`newsletter-email-N`).
- The contact form intentionally has no backend — swap to Netlify Forms/Formspree if
  server-side capture is ever wanted (see README).
- Media: original raw uploads (pen photo/video) also live in the Claude Project
  "Kairad Website"; the audit-page ROI/pricing figures are approximate reference
  figures, flagged in copy.
- Verify visual changes by serving locally (`python3 -m http.server 8000`) and
  screenshotting desktop (1440px) and mobile (390px) widths.

## Backlog / ideas parked by Dharmesh

- More IE use cases: medical, hospitality, supply chain deployments (placeholders exist).
- Real logo files to replace the CSS wordmark (`.logo-mark`).
- New warehouse projects section as engagements land.
