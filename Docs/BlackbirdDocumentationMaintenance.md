# Blackbird documentation maintenance

The English guide source is `i18n/docs/en.json`. `scripts/documentation.mjs` renders it through
the existing `build-i18n.mjs` shell. Page titles/descriptions also use `i18n/strings-site.csv`.
The renderer and site config derive routes/navigation from that source. Do not edit generated
`en/products/blackbird/docs/` HTML. Additional locales need translated guide content and renderer
support before enabling those routes; there is no silent English fallback for article prose.

Each page has a stable slug, group, title, description, body, a detailed media brief, and related
guide slugs. Body markup supports headings, lists, tables, fenced code, emphasis, and links.
Media briefs are deliberate review placeholders, not assets or claims of completed recordings.
The user explicitly requested keeping them visible on the published pages for later replacement.
The home is a contents page; the final landing-page design remains undecided.
On mobile, the sidebar and article contents use sticky disclosure menus. Preserve native
keyboard/no-JavaScript access, viewport-bounded panels, and header clearance for anchor links.

Build with `node scripts/validate-i18n.mjs`, `node scripts/build-i18n.mjs`, and
`node scripts/validate-site.mjs`. Run `node scripts/validate-documentation.mjs` for guide-specific
checks. Inspect changed pages at desktop/mobile widths and both themes. Update the relevant
guide when app behavior, parameter identities, or supported tool contracts change.

The public example source lives under `assets/blackbird/docs/examples/`. Keep its manifests,
scripts, ZIP and tutorial code synchronized. These are source examples, not Import-format archives.
Test read-only examples in an isolated context and never modify the active user library to do so.

Review baseline: 0.8.3-alpha.4 development checkout, 2026-09-22. This does not certify a released
installer or live provider uploads. Provider minimum-version certification remains explicitly
unestablished; do not fabricate version claims. Check gated vendor access and tool versions during
publication review. Publication was authorized on 2026-09-22 with a visible development-version
notice; release-build verification remains outstanding. Guides are indexable and included in the
sitemap. Do not publish private source documentation.
