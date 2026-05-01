# Go-Live Checklist

Use this checklist before sharing the clinic website publicly.

## Project Details

- Launch date target: `__________`
- Site URL: `https://__________________`
- Primary owner: `__________`
- Backup owner: `__________`

## 1. Practice Information

- [ ] Confirm the final practice name.
- [ ] Confirm the final appointment phone number.
- [ ] Confirm the final address and office hours.
- [ ] Replace placeholder content in `site-config.js`.
- [ ] Confirm `index.html` metadata and schema match final details.

## 2. Hosting and HTTPS

- [ ] Confirm GitHub Pages source is correct (`branch` + `/(root)`).
- [ ] Confirm site loads over `https://`.
- [ ] Confirm `http://` redirects to `https://`.
- [ ] Confirm no mixed-content warnings in browser devtools.

## 3. Search Visibility

- [ ] Verify ownership in Google Search Console.
- [ ] Submit `https://<domain>/sitemap.xml` in Search Console.
- [ ] Verify Google Business Profile listing details match the site.
- [ ] Optional: submit site in Bing Webmaster Tools.

## 4. Trust, Policy, and Safety

- [ ] Add a Privacy Policy page or section.
- [ ] Add an Accessibility Statement page or section.
- [ ] Add a medical disclaimer (for emergencies, call `911`).
- [ ] Confirm no forms/chat tools collect protected health information.

## 5. UX and QA

- [ ] Test on mobile (`360px` width) and desktop.
- [ ] Test keyboard navigation and focus visibility.
- [ ] Test all main links (phone, map, top navigation).
- [ ] Confirm map loads correctly when clicking `Load Interactive Map`.
- [ ] Confirm video cards behave correctly (thumbnail or embed on click).
- [ ] Run first-flight budget check:

```powershell
pwsh -NoProfile -File skills/clinic-site-updates/scripts/check-first-flight.ps1
```

## 6. Ownership and Maintenance

- [ ] Decide who owns domain and DNS access.
- [ ] Decide who owns GitHub repo/admin access.
- [ ] Set a monthly content review reminder.
- [ ] Keep credentials in a secure password manager.

## 7. Launch Day

- [ ] Final proofread of site copy and contact details.
- [ ] Confirm HTTPS and sitemap one more time.
- [ ] Share link with owner and staff.
- [ ] Monitor first 7 days for broken links or content updates.
