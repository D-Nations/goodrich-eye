# Content Map

Use this map to perform fast, consistent updates.

## Contact and Core Practice Data

- Primary file: `index.html`
- Areas:
  - Practice name and metadata
  - Phone text and any `tel:` links
  - Address text, Google Maps link, and map iframe `data-src`
  - Office hours
  - YouTube cards and `data-youtube-id` attributes

## Homepage Content and Structured Data

- Primary file: `index.html`
- Areas to update:
  - Hero headline and lead text
  - Services cards
  - About section copy
  - FAQ entries
  - JSON-LD blocks (`MedicalClinic`, `FAQPage`)
  - Open Graph and Twitter metadata

## Design and Layout

- Primary file: `styles.css`
- Update only when changing look/feel, spacing, typography, or responsive behavior.
- Performance-sensitive classes:
  - `.video-launch`, `.video-frame`
  - `.map-wrap`, `.map-load`
  - `.section:not(.hero)` (content visibility containment)

## Behavior and Rendering

- Primary file: `script.js`
- Responsibilities:
  - Enhance HTML video cards into click-to-load YouTube embeds
  - Lazy-load the map iframe from its existing `data-src`
  - Mobile menu behavior
  - Current-year rendering
- Do not store clinic phone, address, hours, or page copy in this file.

## Crawler and SEO Files

- `robots.txt`: crawl policy and sitemap pointer
- `sitemap.xml`: canonical URLs and lastmod dates
- `llms.txt`: AI assistant guidance and canonical source list
- `site.webmanifest`: install metadata and theme colors

## Performance Budget Tools

- `scripts/check-first-flight.ps1`: gzip budget check for first-flight critical files
