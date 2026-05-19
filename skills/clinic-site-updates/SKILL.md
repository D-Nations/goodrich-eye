---
name: clinic-site-updates
description: Maintain and refresh the static ophthalmology clinic website. Use when updating contact details, map location, office hours, embedded YouTube videos, SEO metadata, schema markup, crawler guidance files, or first-flight performance budget without introducing forms or HIPAA-sensitive workflows.
---

# Clinic Site Updates

## Quick Workflow

1. Read `index.html` first and update practice data there:
- Phone text and any `tel:` links
- Address text, Google Maps link, and map iframe `data-src`
- Office hours
- YouTube video cards and `data-youtube-id` attributes
- Hero copy, service descriptions, FAQ text, and JSON-LD metadata in `<head>`

2. Keep `script.js` behavior-only:
- Mobile menu behavior
- Current-year rendering
- Lazy-loaded map iframe
- Click-to-load YouTube cards
- No clinic phone, address, hours, or content copy

3. Keep crawler and discovery files synced when facts change:
- `robots.txt`
- `sitemap.xml`
- `llms.txt`

4. Preserve static-site constraints:
- Do not add contact forms, chat widgets, or PHI intake.
- Keep scheduling CTA as phone-first links (`tel:`).

## First-Flight Performance Workflow

Use this when the user asks for 12KB-style transport optimization.

1. Keep first response and critical render path compact:
- Keep `index.html` and `styles.css` lean.
- Avoid external webfont dependencies for initial render.
- Keep heavy third-party embeds click-to-load or viewport-lazy.

2. Keep map and video embeds deferred:
- Google Map should not load until user interaction or near viewport.
- YouTube should use thumbnail cards and inject iframe on click.

3. Measure gzip budget before finalizing:
- Run: `pwsh -NoProfile -File skills/clinic-site-updates/scripts/check-first-flight.ps1`
- Default critical budget: `index.html + styles.css <= 12KB gzip`.

4. If budget fails, prioritize these cuts:
- Remove non-essential copy blocks first.
- Simplify gradients, shadows, and decorative CSS.
- Trim JSON-LD whitespace only after structural cuts.

## Quality Gates

- Verify mobile layout still works at common widths (360px, 768px, 1280px).
- Confirm every appointment phone link points to `tel:<E164 number>` once a final phone number exists.
- Confirm map link and map embed both use the same address query.
- Confirm `title`, meta description, canonical URL, and schema values still match current practice details.
- Confirm `check-first-flight.ps1` passes before shipping transport-focused changes.

## References

- Use [content map](references/content-map.md) for where each editable value lives.
