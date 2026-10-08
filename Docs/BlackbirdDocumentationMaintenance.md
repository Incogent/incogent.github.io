# Blackbird documentation maintenance

The English guide source is `i18n/docs/en.json`. `scripts/documentation.mjs` renders it through
the existing `build-i18n.mjs` shell. Page titles/descriptions also use `i18n/strings-site.csv`.
The renderer and site config derive routes/navigation from that source. Do not edit generated
`en/products/blackbird/docs/` HTML. Additional locales need translated guide content and renderer
support before enabling those routes; there is no silent English fallback for article prose.

Each page has a stable slug, group, title, description, body, a concise image description, and related
guide slugs. Body markup supports headings, lists, tables, fenced code, emphasis, and links.
Image descriptions are placeholders for future captures; do not publish internal production briefs
or imply that screenshots or recordings already exist.
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

Review baseline: Blackbird 0.8.4-alpha.1, 2026-10-08. The documentation version and review date
live in `i18n/docs/en.json`. This is the release label, not an upcoming-feature notice.
Provider minimum-version certification remains unestablished; do not fabricate version claims.
Check gated vendor access and tool versions separately. Guides are indexable and included in the
sitemap. Do not publish private repository documentation.

Package examples use manifest schema 2 with shared-library-owned definitions. Definition documents
and discovery responses still use their separate schema 1 contracts. Keep all three tutorial package
folders in `shared-settings.zip`, and validate references and revisions alongside the script examples.
