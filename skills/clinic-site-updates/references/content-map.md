# Content Map

Use this map to perform fast, consistent updates.

## Contact and Core Practice Data

- Primary file: `site-config.js`
- Fields:
  - `practiceName`
  - `phoneDisplay`
  - `phoneE164`
  - `address`
  - `mapQuery`
  - `hours`
  - `youtubeVideos`

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
  - Bind config values into DOM placeholders
  - Render click-to-load YouTube cards
  - Build map URLs and lazy-load the map iframe
  - Render office hours
  - Mobile menu behavior

## Crawler and SEO Files

- `robots.txt`: crawl policy and sitemap pointer
- `sitemap.xml`: canonical URLs and lastmod dates
- `llms.txt`: AI assistant guidance and canonical source list
- `site.webmanifest`: install metadata and theme colors

## Performance Budget Tools

- `scripts/check-first-flight.ps1`: gzip budget check for first-flight critical files
