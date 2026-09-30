# Incogent Site Completion Plan

Last updated: 2026-09-30

## Product pricing, site icon and public copy (2026-09-30)

- Pricing is integrated into the Blackbird product page at #pricing, retaining the
  approved regional prices, country hint, currency selector and matching checkout links.
  Existing shop pages remain accessible but are unlisted in navigation and the sitemap;
  the site's purchase links now point directly to product pricing.
- Added the existing app Incogent icon verbatim as favicon.ico and PNG/touch icon.
- Replaced all 57 public media-production briefs with short image descriptions and
  removed the public brief inventory. Removed internal review/test-status wording from
  provider guides, simplified awkward reference copy, and replaced unfinished About/home
  copy with factual customer-facing text. Technical Action-authoring instructions remain.
  The footer no longer advertises unfinished website work. Actual images remain to be added.
- Policy, localization, build, site and documentation checks passed; EULA hashes match.
  Browser checks at 390/1440px passed for regional pricing, manual currency/checkout,
  navigation, concise captions, favicon links and retained shop pages. Publication in progress.

## Regional currency display (2026-09-30)

- Completed: country-based currency hint from existing incogent-edge GET /api/currency,
  with USD fallback and manual USD/CAD/EUR/GBP/AUD selector. Only the explicit preference
  is saved locally. No location permission, external geolocation service or location storage.
- One price at a time: US$149 / C$219 / EUR159 / GBP139 / A$239. USD/CAD tax-exclusive;
  EUR/GBP/AUD tax-inclusive. Manual selection wins over a late country response.
- Five fixed-currency Managed Payments links use the existing approved Price, license
  metadata, quantity selection, terms consent and confirmation redirect. The old general
  link remains valid; website uses the currency-specific links. Existing fulfillment accepts
  these currencies and the same price ID without licensing changes.
- Edge deployed as 1579b4ea-45a3-4d21-913f-1f3c3a4722cb; all 84 backend tests pass.
  Website policy/i18n/build/site/documentation checks pass and authoritative EULA hashes match.
  Browser checks passed at 390/1440px, all five currency/price/link/tax combinations,
  stored preference, late-response race, failure/unknown fallback and JavaScript disabled.
  All five live checkouts show the corresponding approved amounts. No payment was made.
- Published in eb79d95; validation 36665117189 and Pages 36665117262 succeeded.
  Live mobile browser verified the selector, C$219 price and matching CAD checkout.
  Live currency endpoint returned HTTP 200/private/no-store; contact remains 405 on GET
  and Windows download remains 302. No additional user setup required.

## Purchase page simplification (2026-09-30)

- User requested simpler marketing presentation. Show one prominent US$149 per-seat price,
  one-time purchase/tax qualifier, buy button and a short license-terms link in one centered card.
- Removed the country list, quantity limits, delivery/recovery instructions and detailed terms prose
  from this page. Recovery remains on support/confirmation pages. Regional checkout pricing is unchanged.
- CSS cache version bumped. Policy, i18n, build, site and documentation checks pass; EULA hashes match.
  Browser checks at 390/1440px show no overflow, a single USD price and the correct live checkout link.
  Published in b03bbed; GitHub validation 36664230591 and Pages deployment 36664229661 succeeded.
  Live HTTP checks confirm the simplified card, correct checkout link and removal of the country/quantity copy.

## Production purchasing rollout (2026-09-30 UTC)

- User-confirmed activation remains complete; no repeat is required without a material activation change.
  User verified the refunded purchase's resend enters review/payment_blocked without an email.
- Production backend enabled as 77dfda7a-a772-47f9-a20a-8abc1552e8cb. All three runtime secrets
  are installed. Live Stripe account authentication and Resend acceptance passed using its simulated
  delivery address; no real payment or license issuance was performed during this check.
- Private D1 backup and isolated restore passed integrity checks: 612 licenses, including 600 dated
  commercial seats (20 per UTC purchase date September 30 through October 29). Migrations through
  0008 and 12 existing token fingerprints are complete. Replenishment remains an offline operation.
- Branded refund confirmations and daily failure/inventory alerts are deployed; 80 backend checks pass.
  The existing activation system is unchanged. The desktop updater gate is implemented but unpublished.
- Live Managed Payments link plink_1ULDqjL5NhSelnQXa2o77QV9 uses all five approved regional prices,
  1–10 seats, mandatory published terms consent, and the existing confirmation-page redirect.
- Website purchase copy/control is ready. Policy, i18n, build, site and documentation checks pass;
  authoritative EULA bytes match. Browser checks at 390/1440px show no overflow and the correct link.
  Hosted live checkout displays Blackbird Alpha, $149/seat, quantity selection and terms/privacy links.
- Published in a6a63d7. GitHub validation 36663440477 and Pages deployment 36663440247 succeeded.
  Public shop returns HTTP 200 with the active live link and all five prices; confirmation and policy
  routes return 200. Production has no failed work or orders from deployment checks. Checkout uses
  Incogent logo/green background are now verified live; coral accent is saved, while the Link payment button remains green.
- Operational instructions and deployment evidence: Blackbird/LicenseServer/blackbird-license-api/COMMERCE.md.

## Mobile theme control (2026-09-29)

- Moved the theme toggle after Menu in the shared header, matching desktop order and keyboard navigation. Kept the compact dropdown and left-aligned labels.
- Policy, localization, generated-site and documentation checks pass; authoritative EULA bytes match. Published as e3996da; Pages 36647202834 and validation 36647203725 succeeded. Live support page confirms Menu precedes the theme toggle.

## Support layout refinement (2026-09-29)

- Moved missing-license reassurance above the contact button so the action ends the section.
- Removed Discord buttons from both Blackbird download action groups. Discord remains
  prominent on the support page and homepage contact section. User reviewed the right-aligned dropdown and requested restoring left-aligned text.
  Left alignment restored. Reduced dropdown minimum width from 13rem to 9rem, with
  content-sized width and a viewport cap; retained 1rem padding. CSS cache version bumped.
- Policy, localization, build, site and documentation validation pass (69 pages); EULA hashes
  match. Included in the ongoing authorized website publication.

## App wordmark synchronization (2026-09-29)

- Copied the current app's Incogent_Wordmark.png and Incogent_Wordmark_Dark.png verbatim
  into website assets. Both are 314 x 80 pixels, suitable for 157 x 40 display at 2x density.
  Header switches between dark artwork for light mode and white artwork for dark mode,
  including automatic OS theme; CSS cache version bumped. All localized pages rebuilt.
- Email template uses the new white wordmark at 157 x 40. Local email preview uses the
  local asset until publication. Website publication is authorized and release validation passes. Deploy the revised
  email Worker only after verifying the published asset URL.
- Policy, localization, build and site validation pass (69 pages); authoritative EULA
  hashes match. All 52 backend checks pass. No higher-resolution source is needed for
  current placements; a 628 x 160 export would support larger 314 x 80 displays at 2x.

## Complete

- [x] Static GitHub Pages site with generated English pages, locale-aware templates, canonical URLs, sitemap, redirects, and automated validation.
- [x] Incogent branding and responsive layout; wide homepage video with narrow text columns; narrow section introductions with wider contact and feature grids.
- [x] Blackbird-first navigation: Shop goes directly to the Blackbird shop and the footer links directly to Blackbird.
- [x] YouTube embeds on the homepage and below the Blackbird downloads, with muted autoplay, looping, and native controls.
- [x] Public Privacy Policy and authoritative Blackbird EULA rendered with working URL/email links and legal-page switch buttons. EULA synchronization instructions recorded in AGENTS.md.
- [x] Public shop published with approved regional pricing, entitlement details and live Stripe purchase link.
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

## Blackbird purchasing setup (2026-09-29)

- User confirmed the resend arrived with identical codes, then completed the two-seat sandbox
  refund. Both assigned codes are held and their deployed update-eligibility checks return false;
  the earlier single-seat purchase remains eligible. The test exposed an incorrect livemode
  requirement on Stripe Refund objects. Fixed the handler and test fixtures; all 76 backend
  checks pass. Sandbox Worker 2fbe9c2c-a3ee-4bd4-9730-de3aba4aee9e deployed. The user completed the new resend check: review/payment_blocked with no email. Existing activation is user-verified; current production status is recorded above.

- [x] Backend-owned immediate manual resends deployed to sandbox Worker
  acad7ffd-fb4e-4b63-b337-e16e6f7e7370 after private backup and migration 0007. The existing
  support tool persists the job, then uses a short-lived single-use trigger; scheduled recovery
  remains the fallback. All 73 backend checks pass. Live authorization/replay checks passed
  without sending email or changing the original purchases. No website UI change or new paid
  service. Action-only handoff is in Blackbird Docs/CommerceRecoveryActionHandoff.md; the other
  agent owns only the private Blackbird Action. Production commerce remains disabled.

- [x] Private verified-purchase resends preserve assigned codes and delivery history; original
  Stripe event reconciliation preserves purchase dates. Refund/dispute restrictions now cover
  recovery, redemption and the new built-in updater download gate. Sandbox Worker
  5ec1f010-de8c-4222-8cf5-280b237980e9 deployed after backup and migration 0006; 24 token
  fingerprints populated. All 64 backend checks pass. Desktop Debug/Release builds and focused
  updater/licensing/trial/redemption tests pass; the app is not published. Deployed endpoint
  accepts a known assigned license and rejects malformed/unknown requests. Existing two sent
  orders are intact. Owner alerts and live purchase setup are now completed as recorded above; historical sandbox evidence remains valid. Operational commands live in Blackbird's COMMERCE.md.

- Email palette aligned with website CSS and deployed to sandbox: #2F665E to #7EB8AE
  header gradient, #B9564C primary action, matching website neutral/text colors. All 52
  backend tests pass; two-code desktop/mobile layout previews reviewed. User confirmed near-immediate inbox delivery on September 29. Multi-code contents
  and the new-logo email remain supplemental checks.

- [x] User-approved multiple-code purchases: sandbox quantity selector enabled for 1–10
  seats with quantity-aware validation, complete atomic allocation, one email with all
  codes, stable retries and full-order refund holds. Migration 0005 and Worker deployed;
  52 tests pass and existing purchase preserved. Next user test is two seats.
- [x] Refined sandbox Stripe product name and entitlement description. Managed Payments
  rejects custom checkout text. Logo/colors require a Dashboard step because the connector
  does not expose account branding; hosted visual confirmation remains pending.

- [x] Stripe plugin installed and MCP OAuth verified for Incogent sandbox and live.
  Stripe's implementation planner accepted Managed Payments Payment Links for the
  initial one-time hosted checkout.
- [x] Configured and read back the sandbox alpha offering: $149 USD per seat,
  one-time, with 12 months of updates and perpetual use of covered versions.
  Sandbox Payment Link confirms Managed Payments enabled and Stripe-issued invoices.
  Applicable tax is added; one seat per purchase initially. No public purchase CTA.
- [x] User selected continued offline signing. Blackbird's commerce/licensing plans
  now record Stripe and purchase-date-specific license batches. The update cutoff
  must be based on purchase, not generation/redemption time. Online signing is deferred.
- [x] Implement and deploy isolated sandbox webhook, dated existing-license allocation,
  retryable Resend delivery and refund/dispute holds in the Blackbird license Worker.
  API signature smoke checks pass; automated D1 tests cover duplicates, concurrency,
  missing stock, email failures and refund blocking. Production licensing is unchanged.
- [x] Configure runtime credentials and signed sandbox inventory; verify a sandbox payment,
  license assignment and inbox delivery (user confirmed September 29).
- [x] Deploy branded HTML/plain-text email and immediate post-persistence fulfillment,
  retaining five-minute recovery. All 48 backend tests pass; desktop and 390px mobile
  previews reviewed. Next purchase checks the new inbox appearance and delivery timing.
  Email refined with a shorter friendly welcome, documentation button, existing app Discord
  support link and gradient header. No sandbox banner in the body. 48 tests and refreshed
  desktop/mobile previews pass. Missing-email support/resend remains launch follow-up;
  self-service recovery is proposed, not implemented.
- [ ] Complete activation, updater revocation and generated purchase/success pages.
  Final tax presentation, production eligibility and purchase-to-redemption validation remain outstanding.
- [x] Sandbox Stripe runtime key configured as an encrypted Worker secret; verified
  expected account and sandbox price access. Resend secret and sender/recipient settings
  are now saved and their binding types/formats verified. Dated sandbox inventory for
  September 29/30 is imported and read back; payment/email validation is complete.
- [x] Live catalog product and $149 USD one-time price created and verified after
  an empty live catalog check. Managed Payments onboarding remains in progress;
  no live purchase link or website sales enabled. Stripe IDs are in the integration record.
- [x] User approved regional pricing: US $149 USD before applicable sales tax;
  Canada C$219 before applicable tax; euro area EUR 159, UK GBP 139 and Australia
  AUD 239 inclusive of applicable VAT/GST. Entitlements are unchanged.
- [x] Configured regional currency options on the existing sandbox and live prices.
  Independent API readback confirms USD 149 / CAD 219 exclusive and EUR 159 /
  GBP 139 / AUD 239 inclusive, active one-time prices, and no recurring interval.
  Stripe access is working; existing product/price IDs and metadata are preserved.
- [ ] Validate hosted currency selection and tax presentation, including European
  buyers paying in USD. Update website prices and purchase flow once Stripe checkout
  and fulfillment work, as requested by the user. Public shop remains coming soon.
  Account defaults were not changed. Documentation whitespace checks passed;
  no live purchase link or production fulfillment enabled.
- Incogent Resend sender is configured on updates.incogent.io; inbox delivery is verified.
- Purchasing work is authorized; the public shop remains coming soon until
  fulfillment is verified. Sandbox Worker deployment and operations evidence are in
  `E:/GitHub/Blackbird/LicenseServer/blackbird-license-api/COMMERCE.md`.
  See [StripeCheckoutIntegration.md](StripeCheckoutIntegration.md) for the draft
  design, Stripe object IDs, planner evidence and remaining sequence. Documentation
  whitespace checks passed; no desktop runtime changes or production licenses.

## Missing-license help (2026-09-29)

- Added a generated support page with a Didn't receive your license? section, private
  contact instructions and existing documentation/Discord links. Support is linked from
  the shared footer and both Blackbird download sections.
- Added an informational purchase confirmation page with the missing-license link.
  It neither verifies payment nor issues licenses; webhook fulfillment remains authoritative.
- Policy, localization, generation and site validation pass (69 pages, 66 sitemap URLs).
  Authoritative EULA and website copy hashes match. These pages are included in the authorized website release;
  connect the Stripe redirect only after verifying publication. Authenticated resend tooling and
  self-service recovery are still unimplemented.
- Cost constraint: retain existing Worker/D1/Resend services and free-plan compatibility;
  no paid upgrade, queue service or always-running server authorized. Faster sending uses
  the existing webhook invocation with waitUntil and the existing five-minute recovery cron.

## Discord support visibility (2026-09-29)

- Added Get support on Discord buttons beside documentation at both Blackbird download
  sections, using the configured invite confirmed by the user (`AxxpQ8h`). Updated the
  homepage Discord card to explicitly offer direct Blackbird support.
- Generated pages included in the authorized GitHub Pages release. Policy, localization,
  build and site checks pass (67 pages). Source and website EULA hashes match.
- Email uses the same confirmed invite and is deployed to the sandbox Worker. Email design
  and missing-email recovery status are recorded in the Blackbird commerce operations guide.

## Deferred by user

- [ ] Final About, Services, homepage About/contact copy, and company proof. Still to come; do not invent experience or shipped work.
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

## Website publication (2026-09-29)

- User authorized publication. Policy, localization, build, site and documentation checks pass
  (69 pages, 66 sitemap URLs); EULA hashes match. Desktop/mobile layouts checked without
  horizontal overflow. Automated browser did not load image assets; copied logo bytes match
  the app source. Public asset verification follows deployment.
- Release includes app wordmarks, theme-aware header, Discord/support links, missing-license
  help and informational confirmation page. Public purchases remain disabled. Unrelated
  AGENTS.md and draft-document changes are excluded from the release commit.
- User reports sandbox email arrived nearly immediately; this is confirmed inbox evidence.

### Publication result

Published in ef14af1. GitHub validation 36644462706 and Pages deployment 36644462345
succeeded. Production product/support/confirmation pages return HTTP 200 with new logo
markup; both public wordmark files match repository/app bytes. Live mobile light/dark
checks select the correct logo and show no overflow. The automated browser blocks image
loading even after its temporary profile setting was changed; visual image loading remains
a browser limitation, not verified by that check. Asset HTTP/content checks passed.
Sandbox Worker 675bbb9b-e812-4b17-a6a5-5ca45adf3502 now uses the published wordmark;
sandbox Payment Link redirects to the verified public confirmation page. D1 confirms
one sent single-seat order and one sent two-seat order, with three assigned codes.
User confirms near-immediate inbox delivery. Live purchases remain disabled.
