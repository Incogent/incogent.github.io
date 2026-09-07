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
```

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
