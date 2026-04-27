# Travomate Parcels Landing Page

Marketing landing page for **Travomate Parcels**, a parcel delivery service that
matches senders with vetted travelers and couriers.

## Tech

- Plain HTML, CSS, and a small vanilla JS file with zero build step.
- Inter font via Google Fonts.
- Responsive layout with a mobile menu, sticky header, and accessible forms.

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy

A GitHub Actions workflow at `.github/workflows/deploy.yml` publishes the site
to **GitHub Pages** on every push to `main` or
`claude/travomate-landing-page-amfJ9`. Enable GitHub Pages in the repo settings
(Source: *GitHub Actions*) to activate it.

## Structure

```
.
├── index.html          # Page markup
├── styles.css          # Styling
├── script.js           # Mobile nav + footer year
└── .github/workflows/  # GitHub Pages deploy workflow
```

