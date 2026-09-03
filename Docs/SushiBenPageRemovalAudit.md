# Sushi Ben Page Removal Audit

Last updated: 2026-09-03

## Completed Decision

The 113 published HTML pages listed by family below were approved and removed on 2026-09-03. They contained Sushi Ben content or redirected to Sushi Ben-specific sections and had no role in the Incogent information architecture.

The current Incogent generator does not update or depend on these pages. After removal they should return the Incogent 404 page. They should not redirect to unrelated Incogent content because that would misrepresent the destination of historical links.

## Pages Recommended for Removal

### Root Sushi Ben routes (7 pages)

- `cast/index.html`
- `fan-content/index.html`
- `merch/index.html`
- `press-kit/index.html`
- `presskit/index.html`
- `team/index.html`
- `voice-actors/index.html`

These are old content routes or aliases for cast, fan-content policy, merchandise, press materials, team credits, and voice actors.

### English Sushi Ben routes (7 pages)

- `en/cast/index.html`
- `en/fan-content-policy/index.html`
- `en/fan-content/index.html`
- `en/merch/index.html`
- `en/press-kit/index.html`
- `en/presskit/index.html`
- `en/team/index.html`

These pages currently expose the inherited Sushi Ben site directly under the Incogent domain. The `presskit` and `fan-content-policy` entries are aliases, but they remain Sushi Ben-specific and should be removed with their destinations.

### Inherited non-English locale trees (99 pages)

Remove all 11 currently published pages in each of these nine locale directories:

- `de/`
- `es/`
- `fr/`
- `it/`
- `ja/`
- `ko/`
- `pt-br/`
- `zh-hans/`
- `zh-hant/`

Each directory currently contains the same Sushi Ben-specific route set:

- `index.html`
- `cast/index.html`
- `eula/index.html`
- `fan-content-policy/index.html`
- `fan-content/index.html`
- `merch/index.html`
- `press-kit/index.html`
- `presskit/index.html`
- `privacy/index.html`
- `shop/index.html`
- `team/index.html`

Removing these generated files does not abandon future localization. The active Incogent generator can recreate a locale after it is added to `LOCALES` and translated. Keeping stale Sushi Ben pages until then is more harmful than returning a clear 404.

## Pages Explicitly Recommended to Keep

Keep the current Incogent output and route redirects:

- `index.html`
- `404.html`
- `en/index.html`
- `en/about/index.html`
- `en/eula/index.html`
- `en/privacy/index.html`
- `en/products/index.html`
- `en/products/blackbird/index.html`
- `en/services/index.html`
- `en/shop/index.html`
- `en/shop/blackbird/index.html`
- `about/index.html`
- `eula/index.html`
- `privacy/index.html`
- `products/index.html`
- `products/blackbird/index.html`
- `services/index.html`
- `shop/index.html`
- `shop/blackbird/index.html`

The unprefixed product and company routes are generated redirects to their `/en/` equivalents. They are part of the current route design, not inherited Sushi Ben content.

## Subsequent Source Audit

The original approval covered published pages only. A subsequent dependency audit removed inherited source and assets that had no active Incogent dependency while retaining the locale-aware architecture and Incogent-specific assets. See [RepositoryContentAudit.md](RepositoryContentAudit.md).

The following categories were subsequently removed after dependency verification:

- `templates/home.tpl`, `templates/secondary.tpl`, `templates/legal.tpl`, and `templates/404.tpl`
- `i18n/secondary/en/`
- Sushi Ben localization CSV files other than `i18n/strings-site.csv`
- `styles.css`, `secondary.css`, and `script.js`
- Sushi Ben images and downloadable media under `assets/`
- old localization/export/sync scripts

## Post-Removal Safeguards

Completed safeguards:

1. The exact 113 paths are forbidden by the validation suite so a later build cannot restore them accidentally.
2. The remaining active templates, generated pages, sitemap, robots file, and JavaScript contain no links to the removed routes.
3. The separate source/assets dependency audit is complete and recorded in `RepositoryContentAudit.md`.

Remaining deployment check: confirm representative removed routes return the custom Incogent 404 page after the site changes are published.

## Approved Scope

The approved removal included:

- the 7 root Sushi Ben routes,
- the 7 English Sushi Ben routes, and
- all 99 published pages inside the nine inherited non-English locale trees.

Total removed: **113 published HTML pages**.
