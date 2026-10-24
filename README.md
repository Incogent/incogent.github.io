# Incogent Site

Static marketing site for Incogent and Blackbird, built from HTML templates and CSV-based localization data.

## Main Files

- `templates/site.tpl` and `templates/pages/`
  Active Incogent shell and page-body templates.
- `i18n/strings-site.csv`
  Active Incogent UI and page copy.
- `scripts/build-i18n.mjs`
  Generates the localized pages.
- `scripts/validate-site.mjs`
  Checks generated routes, canonicals, sitemap entries, internal links, fragments, local assets, Worker endpoints, and forbidden obsolete download references.
- `scripts/site-config.mjs`
  Active Incogent route, domain, contact, and download configuration.

## Build

```powershell
node scripts/validate-i18n.mjs
node scripts/build-i18n.mjs
node scripts/validate-site.mjs
node --test scripts/test-pricing.mjs
```

## Blackbird regional checkout preparation

- `scripts/blackbird-pricing.mjs` holds the six regional catalogs and 18 exact
  prepared live URLs from Blackbird's `LicenseOperations.md` and commerce handoff.
  `BLACKBIRD_PURCHASING_ENABLED` remains `false`. Paused builds omit checkout URLs
  and purchase buttons entirely; catalog/build sources are excluded from Pages.
- The header region menu uses a saved manual override first, otherwise detects a
  pricing region from the first-party `/api/currency` response. US and DEFAULT USD
  stay distinct. Missing/invalid hints, request errors/timeouts and no JavaScript
  use inclusive DEFAULT USD. Detect automatically clears the manual override;
  old currency-only preferences are ignored. The menu is available throughout the
  site. Only explicit overrides persist; detected region/country/IP are not stored.
- DEFAULT is internal fallback data, not a manual option. Region selection is a
  display preference, not proof of billing location. The user accepts cross-region
  purchases; no billing-country/offer enforcement or custom Checkout backend is
  required. Stripe Managed Payments calculates tax using checkout billing information
  and the selected Price's tax behavior. Its indirect-tax coverage is country-specific;
  confirm intended market coverage and remaining seller obligations before launch.
  See [Stripe tax coverage](https://docs.stripe.com/payments/managed-payments/tax-compliance)
  and the current completion plan. The website never calculates an additional tax charge.
- `scripts/render-pricing.mjs` renders the shared product/shop controls. The enabled
  render path is tested locally without changing the committed gate. After separate
  launch authorization, switch that gate, regenerate, validate and publish alongside
  authorized Stripe activation. Do not enable links to perform prelaunch tests.
- Optional browser verification: install Playwright, or set `PLAYWRIGHT_PACKAGE_ROOT`
  to its containing package root, then run `node scripts/verify-pricing-ui.mjs`.
  It uses local pages, blocks external requests and defaults to headless Edge.
  Set `PRICING_SCREENSHOT_DIR` to save screenshots outside the repository.
- Run `node --test scripts/test-pricing.mjs` for the approved mapping fixture,
  catalog safety and paused/enabled rendering checks. It also compares against
  authoritative Blackbird files when that sibling checkout is available.

## Deployment Notes

- GitHub Pages publishes from `main` using `_config.yml` to exclude developer documentation, templates, and build tooling. Keep these files tracked; add new developer-only paths to `exclude`. Do not restore `.nojekyll`, which bypasses these exclusions. Public Markdown downloads under `privacy/` and `eula/` are intentionally included and are not processed as Jekyll pages.
- Before a website release, synchronize `eula/Blackbird_EULA.md` from the authoritative Blackbird repository file `Installer/EULA.md`. Preserve the source verbatim; never edit the agreement independently here. See `AGENTS.md` for synchronization and verification instructions.
- When changing `site.css` or `site.js`, bump the corresponding `?v=` query string in `templates/site.tpl` before running the build. GitHub Pages/Cloudflare can serve cached assets for a while, and a version bump prevents generated pages from loading stale files.

## Localization

Translate `i18n/strings-site.csv` directly. English is currently the only active Incogent locale. See `i18n/README.md` for the locale-extension workflow.

Then regenerate:

```powershell
node scripts/validate-i18n.mjs
node scripts/build-i18n.mjs
```

## Notes

- `context` columns are translator guidance only. Do not edit keys.
- Generated Incogent pages currently live under `en/`.
- Contact and Blackbird download endpoints are implemented in the separate `Incogent/incogent-cloudflare` repository.
- Sushi Ben-specific pages and unused inherited source files were removed after audit. Validation prevents their routes from being restored accidentally.
