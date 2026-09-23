# Incogent Site Completion Plan

Last updated: 2026-09-22

This is the authoritative current website plan. WebsiteDevelopmentPlan.md preserves the original architecture and historical roadmap; this document supersedes its outdated status and open decisions.

## Complete

- [x] Static GitHub Pages site with generated English pages, locale-aware templates, canonical URLs, sitemap, redirects, and automated validation.
- [x] Incogent branding and responsive layout; wide homepage video with narrow text columns; narrow section introductions with wider contact and feature grids.
- [x] Blackbird-first navigation: Shop goes directly to the Blackbird shop and the footer links directly to Blackbird.
- [x] YouTube embeds on the homepage and below the Blackbird downloads, with muted autoplay, looping, and native controls.
- [x] Public Privacy Policy and authoritative Blackbird EULA rendered with working URL/email links and legal-page switch buttons. EULA synchronization instructions recorded in AGENTS.md.
- [x] Public shop language explains that purchasing is coming soon.
- [x] Developer documentation and build sources excluded from Pages deployment while retained in Git.
- [x] Deployed EXE/MSI downloads, contact delivery, mobile navigation, legal links, and deployment exclusions verified. Completion is based on the user's confirmation on 2026-09-09; do not reopen these as unverified because older audits say otherwise.
- [x] Practical Blackbird website copy drafted in BlackbirdPracticalInfoDraft.md.
- [x] Marketing clip suggestions prepared in MarketingClipBrief.md.

## Next: practical product information

- [ ] Review and publish the practical copy draft: installation, prerequisites, updates, release notes, alpha expectations, and support.
- [ ] Confirm minimum Windows version, supported CPU architectures, and meaningful hardware/storage requirements before publishing specific numbers.
- [ ] Confirm draft behavior against the publicly distributed build; source-repo features can precede a release.
- [ ] Link release notes from authoritative published release data; never publish ReleaseNotes/draft.md.
- [x] Link documentation beside the download controls at the top and bottom of the Blackbird product page. The documentation agent owns full documentation and worked examples.

## Deferred by user

- [ ] Final About, Services, homepage About/contact copy, and company proof. Still to come; do not invent experience or shipped work.
- [ ] Pricing, purchasing, license option presentation, and checkout/fulfillment. Not ready; retain coming-soon messaging.
- [ ] User records short marketing clips and supplies approved assets. Use MarketingClipBrief.md as options, not a required production checklist.
- [ ] Replace the long YouTube video with those curated assets when supplied. Keep hosting essentially free and avoid services with automatic usage overages. GitHub Pages is the agreed direction for small self-hosted assets.
- [ ] Additional locales after English content and product vocabulary settle.

## Later quality improvements

- [ ] Add automated browser/accessibility regression coverage and performance budgets as the site stabilizes. This is additional automation, not a claim that the verified user journeys are broken.
- [ ] Add product social-sharing imagery and accurate SoftwareApplication metadata.
- [ ] Revisit production monitoring/security headers with the companion Cloudflare project where useful.

## Boundaries and maintenance

The Cloudflare repository owns contact, downloads, and analytics infrastructure. Do not infer its current deployment status from the September 3 audit. Analytics activation and operational details belong in that repository's current plans.

For each substantive website change, update this plan's date and affected status, validation evidence, remaining work, or decisions in the same change. Distinguish implemented, verified, drafted, and deferred work. User-confirmed verification is valid evidence and should be labeled as such.

## Companion developer portal update — 2026-09-09

2026-09-10 publication dates: Published (UTC) column deployed in analytics using
GitHub release publication time. Snapshot refreshed; 24 targeted tests and
desktop/mobile layout checks passed. Backend deployment record contains version
ID; authenticated owner visual verification remains outstanding. No public-site change.

2026-09-10 collector repair: removed redundant GitHub calls (normally one request
per collection), added safe scheduled-failure categories and a later same-day
retry that skips successful days. Cloudflare scheduled-handler test saved fresh
production counts; next natural cron remains to be observed. Deployment/test
evidence is maintained in the backend Docs/GitHubDownloadReporting.md. No public
website build, app collection changes, or paid-service upgrades are involved.

App-version reporting update: backend accepts the new rolling 2.1.0 contract;
the revised privacy policy is published (b4f45da, live content verified), and old
2.0.0 reports remain compatible. Production Worker version is
6e73920f-7c56-4ea5-86a2-8a9abc99fd60; 77 tests and staging acceptance/retry checks pass.
Daily v1 UI/ingestion is retired without deleting historical data. Version counts
are sealing-date reporting app-days, not unique installations. App integration
and revised consent are required; handoff and deployment evidence belong in
incogent-cloudflare/Docs/UsageAnalyticsAppVersionHandoff.md. Policy rendering,
i18n and site validation passed; authoritative EULA and website copy match.

License dashboard improvements are deployed to production in incogent-cloudflare: recent allocation references, compact UTC expirations, and short redemption-code lookup. Deployed 2026-09-09 after 74 tests passed. Standing backend deployment authorization is recorded in AGENTS.md. Track implementation and validation in that repository’s Docs/DeveloperPortalLicensingPlan.md; this does not change the public shop or enable purchases.


## Blackbird documentation draft (2026-09-22)

- Completed the authorized full writing pass: 57 guides plus a neutral contents page at
  `/en/products/blackbird/docs/`, covering everyday use, setup, common tasks, providers,
  packages, authoring, troubleshooting, and reference.
- Canonical prose is `i18n/docs/en.json`, rendered through the existing site build and theme;
  CSV retains page metadata. Navigation, full-text search, section anchors and related guides
  work across the complete draft. The home-page design remains open for user review.
- Every guide has a specific media brief; the overview has a filterable production inventory.
  No screenshots or videos were produced. Two read-only shared-setting example packages are
  downloadable source, with installation and testing instructions in the authoring sequence.
- Validation: localization and generated-site validation pass (67 pages); focused documentation
  validation checks all articles, media briefs, links, JSON examples and sample consistency.
  Both downloadable scripts passed in Windows PowerShell with an isolated context; ZIP contents
  match the source downloads. The overview passed 1440px/390px overflow and anchor checks in
  both themes. Search and media filtering passed an isolated DOM harness; the test browser blocks
  page JavaScript, so ordinary browser interaction and full-page visual review remain supplemental checks.
- Publication authorized by the user on 2026-09-22. Documentation links are present at the top and
  bottom of the product page; all 58 documentation routes are indexable and included in the sitemap.
  Development-version notices remain visible. At the user's explicit request, image/video briefs
  and the overview media inventory remain visible for later replacement. Release-build review, media production and vendor tool-version/live-upload
  verification remain follow-up; no certified minimum versions are claimed.
- Publication validation: policy, i18n, build, site and documentation checks pass (67 pages,
  65 sitemap URLs). Authoritative EULA SHA-256 matches the website copy. Edge/Playwright checks
  at 1440px and 390px passed for the product page, documentation overview and installation guide
  without horizontal overflow; screenshots reviewed, both product links present, and live local
  search returned 13 guides for "shared settings". Documentation checks now run in CI and guard
  discoverability and retention of media placeholders.
- Published in commit `62ab1f3`; GitHub validation run `35792263362` and Pages deployment
  `35792262732` both succeeded. Production HTTP 200 checks passed for the documentation overview,
  installation guide, product page, search index, documentation script, example ZIP and sitemap.
  Live product links and the installation guide's media placeholder were confirmed.
- Maintain the content using [BlackbirdDocumentationMaintenance.md](BlackbirdDocumentationMaintenance.md).

## Mobile documentation navigation (2026-09-22)

- Collapsed the mobile sidebar into a sticky Browse guides control with search and section groups.
  On this page opens beside it; only one panel stays open. Panels scroll within the viewport,
  close on selection, outside click or Escape, and preserve keyboard focus for section links.
  The desktop sidebar remains expanded. Native disclosure controls also work without JavaScript.
- Kept all image/video placeholders and the media inventory. Bumped CSS and documentation script
  cache versions. No article wording or release-version claims changed.
- Validation: policy, localization, build, site and all 57 guide checks passed; source EULA hashes
  match. Edge/Playwright checked 320, 390, 720, 900 and 1440px widths without horizontal overflow.
  Mobile article titles appear near the top (198px); search, panel switching, anchor clearance,
  Escape, desktop resize and no-JavaScript browsing passed. Light/dark screenshots reviewed.
- Published in `bb14201`; Pages run `35816312463` and validation run `35816313854` succeeded.
  A production mobile browser confirmed the collapsed sidebar, working search (13 results for
  "shared settings"), and preserved media placeholder. Release-build review and media production
  remain outstanding as above.
