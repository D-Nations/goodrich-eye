# Goodrich Eye Clinic Website

Static, mobile-first starter site for a private ophthalmology clinic.

## Files

- `index.html`: Main single-page website content and SEO metadata.
- `styles.css`: Visual design and responsive layout.
- `site-config.js`: Main edit point for phone, address, hours, and YouTube video IDs.
- `script.js`: Injects config values, handles mobile nav, and lazy-loads map/video embeds.
- `robots.txt`, `sitemap.xml`, `llms.txt`: Crawler and AI discovery files.
- `site.webmanifest`, `favicon.svg`: Basic installable metadata and icon.
- `skills/clinic-site-updates/SKILL.md`: Reusable update skill for future edits.

## Quick Content Updates

1. Edit `site-config.js` for contact info, hours, address, map query, and YouTube IDs.
2. Edit `index.html` for copy changes (services, bio, FAQs).
3. If practice details change, also update:
- JSON-LD in `index.html`
- `llms.txt`
- `sitemap.xml` lastmod date

## Performance Budget Check

Run this to verify first-flight gzip budget (`index.html + styles.css <= 12KB` by default):

```powershell
pwsh -NoProfile -File skills/clinic-site-updates/scripts/check-first-flight.ps1
```

## Local Preview

Open `index.html` directly in a browser for a quick preview.

## Launch Checklist

Use [GO-LIVE-CHECKLIST.md](GO-LIVE-CHECKLIST.md) for a practical pre-launch checklist.
