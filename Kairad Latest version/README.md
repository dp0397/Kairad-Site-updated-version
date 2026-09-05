# Kairad Consulting — Marketing Website

A static, multi-page marketing site for Kairad Consulting (industrial engineering &
warehouse automation consulting). Plain HTML5 + CSS + vanilla JS — no build step,
no framework, no server required. Dark-mode design built on the Kairad brand palette.

See **CLAUDE.md** for the full design system, page map, and how to add new use cases.

## Structure

```
index.html                    Home (IE-first)
about.html                    About Us (Mission / Vision / Values tiles)
industrial-engineering.html   Lead practice — CV work measurement + use cases
peb.html                      Warehouse 01 — Pre-Engineered Buildings
automation.html               Warehouse 02 — Digital Twin & IoT Automation
audit.html                    Warehouse 03 — Structural & Rack Audits
tracking.html                 Warehouse 04 — PV-Plate BLE Tracking
wms.html                      Warehouse 05 — Warehouse Management System
dashboard.html                Live regional supply-chain dashboard (iframe shell)
contact.html                  Contact / Request a Quote

assets/css/style.css          Design system (dark theme tokens + components)
assets/js/main.js             Nav, dropdowns, scroll-reveal, contact mailto
assets/img/                   SVG illustrations & icons
assets/media/                 Real use-case media (photos, MP4s, posters)
assets/dashboard/             Self-contained dashboard HTML (swap to update)
```

## Previewing locally

```bash
python3 -m http.server 8000    # then open http://localhost:8000
```

## Deployment

Hosted on Netlify, auto-deployed from GitHub (`main` branch). Publish directory is the
repo root; there is no build command. To ship a change:

```bash
git add -A && git commit -m "Describe the change" && git push
```

## Before-going-live checklist

- Contact form is mailto-based (no backend). Swap for Netlify Forms if needed.
- audit.html ROI/pricing figures are approximate — reverify before quoting.
- Replace the CSS wordmark with real logo files when available.
