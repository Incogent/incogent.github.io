# Repository Content Audit

Last updated: 2026-09-03

## Outcome

The repository has been reduced to the active Incogent site, its locale-aware source system, current generated output, deployment metadata, and Incogent-specific assets. Sushi Ben remains recoverable from `E:\GitHub\sushiben.github.io` and repository history; it is no longer used as an embedded reference copy here.

## Retained: Active Site Source

- `templates/site.tpl` — shared Incogent HTML shell.
- `templates/pages/*.html` — nine active page bodies.
- `i18n/strings-site.csv` — translatable Incogent copy with required English fallback.
- `i18n/README.md` — future-locale workflow.
- Empty tracked locale output directories for `de`, `es`, `fr`, `it`, `ja`, `ko`, `pt-br`, `zh-hans`, and `zh-hant`; their former Sushi Ben HTML is gone and the generator will populate them when each locale is activated.
- `scripts/build-i18n.mjs` — locale-aware static generator.
- `scripts/site-config.mjs` — routes, locales, canonical host, contact, and download configuration.
- `scripts/validate-i18n.mjs` — translation-source validation.
- `scripts/validate-site.mjs` — generated output, routes, links, assets, metadata, and forbidden-route validation.
- `site.css` and `site.js` — active shared presentation and behavior.

## Retained: Generated and Deployment Files

- The nine generated English pages under `en/`.
- The root and unprefixed Incogent redirect pages generated from the manifest.
- `404.html`, `sitemap.xml`, and `robots.txt`.
- `CNAME`, `.nojekyll`, and the site validation workflow.

## Retained: Assets and Notices

- `assets/images/Incogent_Logo_C.png` — active header logo.
- `assets/images/Incogent_Logo_D.png` — alternate Incogent logo retained for future brand/layout use.
- `.codex-remote-attachments/.../1-Photo-1.jpg` — Incogent-colored original artwork retained pending a decision about placement; it is not currently referenced by generated pages.
- `Docs/ThirdPartyNotices.md` — required Pattern Craft attribution for the active CSS background treatment.

## Removed: Published Sushi Ben Pages

Removed 113 generated pages:

- 7 root Sushi Ben routes and aliases.
- 7 English Sushi Ben routes and aliases.
- 99 stale Sushi Ben pages from the nine former non-English output trees.

The locale-aware generator remains intact. Future translations will regenerate complete Incogent locale trees from current source.

## Removed: Obsolete Source

- Four Sushi Ben templates: `home.tpl`, `secondary.tpl`, `legal.tpl`, and `404.tpl`.
- Four inherited English secondary-page partials.
- Six Sushi Ben localization CSV files.
- Three Sushi Ben localization/export synchronization scripts.
- `styles.css`, `secondary.css`, and `script.js`, which were unused by all active Incogent pages.
- The obsolete existing-pattern inventory that documented those deleted reference files.

## Removed: Obsolete Assets

Removed 65 assets used only by Sushi Ben, including:

- Sushi Ben logos, cover art, screenshots, stickers, media ZIP, background art, and favicon.
- Sushi Ben cast headshots.
- Sushi Ben store/platform logos and partner/technology logos.
- The Sushi Ben social share image.

No asset referenced by the active Incogent templates, generated pages, CSS, JavaScript, or manifest was removed.

## Safeguards

- The site validator fails if any of the 113 removed page paths reappear.
- CI regenerates the site and fails if generated output differs from the committed result.
- CI then checks internal paths, fragments, local assets, canonical host, sitemap, critical Worker routes, basic accessibility markup, and obsolete download references.
- Localization validation requires unique keys and an English fallback while allowing future locale columns.
