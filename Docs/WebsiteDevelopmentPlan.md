# Incogent Website Development Plan

Last updated: 2026-10-25

> Current functional status, download architecture, and prioritized next work are recorded in [SiteAuditAndCompletionPlan.md](SiteAuditAndCompletionPlan.md). That audit is authoritative where it adds newer implementation findings to this original development plan.

2026-10-25 macOS download UX (published for review): the product page's two download
locations and the confirmation page share `templates/blackbird-downloads.tpl`,
expanded by the existing localized build. Windows retains its EXE/MSI Worker URLs;
macOS is an informational panel with no link or interactive control. The approved
planned package is a DMG for macOS 15+ on Apple silicon (M1 or newer). Intel Macs
and Linux are outside the current release target. No Mac download endpoint is
configured. Requirements and package metadata must be verified against a published
distributable before launch, with any resolver/reporting work owned by the companion
Cloudflare repository. Current validation and launch follow-up are in the completion
plan. User authorized publication on 2026-10-25; released in `4c8edf9` from an
isolated current-production checkout, preserving newer header/region improvements.
GitHub validation, Pages deployment and live content checks succeeded.

2026-10-24 regional checkout architecture (prepared, unpublished): one shared catalog
in `scripts/blackbird-pricing.mjs` maps each of US/CA/EUROZONE/GB/AU/DEFAULT and
Indie/Studio/Enterprise to its approved amount, explicit currency, tax wording and
exact prepared live URL from Blackbird's handoff. A shared build renderer feeds the
product/shop pages. An explicit saved country/region replaces currency-only selection;
US USD adds tax while DEFAULT USD includes it. Missing/invalid preferences, blocked
storage and no JavaScript use DEFAULT. No currency hint is requested, because the
existing endpoint cannot distinguish those two USD offers. The website adds no tax
calculation. Permanent use, identical features, all future updates and USD-based
eligibility remain. Confirmation/support describe emailed redemption codes. The
false build-time sales gate omits all checkout URLs/buttons; enabling sales and
publishing require separate authorization. The task branch preserves the current
Pages deployment from main. Final hosted-total checks are blocked by inactive live
links and are tracked with validation evidence in the current completion plan.

2026-10-23 pricing decision (published; checkout deferred): Blackbird's
`Docs/LicenseOperations.md` is the catalog authority. One-time USD per-seat
permanent licenses are Indie $59 (under $200K), Studio $249 ($200K–$5M inclusive)
and Enterprise $499 (over $5M), based on annual gross revenue plus cumulative
funding. Every tier includes identical features, permanent use and all future
updates, without an expiration, update deadline or version cap. No annual offer
or subscription. This supersedes the historical regional and limited-update
offers below. Product/shop pages share the same pricing template and English
localization. Checkout remains paused; final live Stripe links and production
fulfillment readiness must be verified before publishing purchase buttons. Sandbox
links must never appear publicly. Current validation and remaining work are in
the completion plan.

2026-10-22 download resilience: GitHub can return an empty release list despite
published installers. The existing edge resolver retries a missing channel once
with a fresh query; repeated empty results are temporary failures and all download
errors are noncacheable. Static download URLs and exact asset validation remain.
Validation and production deployment evidence live in the current completion plan
and companion `Docs/DownloadResolverDeployment.md`.

2026-10-12 reporting decision: display received counts with coverage instead of withholding
whole periods. Launch-day/capped website events retain recorded values. Download reports
expose selectable release lines with a download-type filter; Daily data retains file
counter differences and explicit reset/gap notices. Purchase and
license inventory records share Sales & Licenses; the separate license dashboard now
supports paginated browsing as well as code lookup. This uses
existing reads/cache and does not add event collection or database writes. See the current
completion plan for validation and deployment evidence.

Website redemption-code lookup searches live and sandbox through the private reader,
including redeemed and refunded records; results label the environment and payment
hold. Existing analytics/purchase aggregates remain live-only. Website code formatting
matches the private Query Blackbird License Action; lookup does not redeem a code.
Lookup results lead with a color-coded overview showing Windows and macOS redemption
independently and the linked purchase's recorded refund/payment status. Full returned
details remain available in a native expandable section. Status reads use the
existing private reader and do not change license or purchase state. The license
dashboard supports live/sandbox database records with 25/50/100-row keyset pages
(default live as of 2026-10-28, with explicit sandbox/all filters),
combined license-type/redemption filters applied before counts/pagination,
environment selection, retained codes and status badges. Old hash-only codes are
labeled as not stored. Code display is explicitly authorized in this private table;
tokens, hashes and restoration secrets remain excluded. Detail links scope the
record ID to its environment without putting redemption codes in URLs.

The owner-only dashboard also searches exact purchase emails across live/sandbox,
with 25 matching purchases per page, every assigned code and both platform statuses.
Confirmed resend uses the saved buyer address and existing codes through the commerce
processor, with current payment verification. Confirmed resets clear Windows or macOS
independently, including its old restoration credential; installed offline grants,
the other platform, assignments and payment holds remain intact. These support actions
write through the independently authenticated private service. Email/code search stays
out of URLs and report caches. Lost-email changes and automated old-license replacement are excluded.

Confirmed **Revoke code** in details is deployed under explicit owner approval.
An independent migration 0013 revocation record blocks
redemption and restoration, including saved credentials and successful-attempt
retries, on both platforms. Revoked status appears in details, inventory/filter and
purchase-code rows while purchase/payment state stays unchanged. Existing licenses,
offline use, update eligibility and Stripe refunds are unaffected. Both database
migrations and licensing Workers preceded the private reader/dashboard deployment.
Confirmed undo and compact inventory-row revoke/undo actions are deployed with
migration 0014 and the matching private reader/dashboard. They retain table
filters/paging and existing platform/payment state, with safe stale/duplicate retries;
no licensing Worker change is required.
The table's current redesign uses checkbox selection and batch Copy codes/Revoke/
Undo revocation controls instead of per-row forms. Details expand below their row
without navigation. These UI/private-reader changes need no schema/licensing Worker
change; current rollout evidence is in the completion plan.

The grant reference becomes general editable Notes in its own inventory column
(2026-10-29), also available for purchased/legacy licenses, expanded details and
purchase-email results. Migration 0015 seeds independent note metadata from grant
references; edits leave original issuance settings and signed licenses untouched.
The private reader handles bounded multiline saves, explicit clearing, safe retries
and stale edits. Creation retains its existing one-line reference contract under
the Notes label. Current rollout evidence is in the completion plan.

Owner-issued tester/complimentary generation is deployed under explicit owner
approval. The portal invokes an independently private
signing entrypoint through its authenticated reader. Explicit owner_grants metadata
stores grant kind, tier, expiration, reference and idempotent request identity alongside
the existing license. Tester defaults to 30 days with an editable UTC expiration;
complimentary grants are permanent without a tier choice. One form uses a license-type
dropdown, conditional tester expiration, quantity and optional reference. Batches
return individual codes and Copy all, with stable per-position retries and visible
partial results if interrupted. Codes are generated on demand
and copyable immediately on a separate Create license page. Owner grants always use
the live database, with no environment chooser and server rejection of sandbox
issuance. License lookup/inventory/support has its own page and still reads existing
records from both databases. The sandbox remains for commerce testing; no data is
moved or deleted. No fake purchases or inventory pools are created. Both
databases need migration 0012 and both licensing entrypoints must deploy before the
reader/dashboard; that rollout is complete. Grant rows share the existing license
inventory with purchase codes and are explicitly labeled. Public purchasing and the
existing licensing Actions/settings stay unchanged. Current validation/deployment
evidence is in the completion plan.

Charts display raw daily series by default, with individual metric checkboxes to isolate
series; scale, legends and optional trends follow only the selected metrics. Average overlays are removed; optional linear
trend overlays use recorded days and start disabled, with no extra database reads.

Download polling supports a dedicated read-only GitHub credential stored as the Worker
secret GITHUB_DOWNLOADS_TOKEN. Daily reports surface fixed collection failure reasons
using the existing history query; no additional polling on dashboard visits is added.

2026-10-13 action-bundle reporting: Blackbird-packages uses the same dedicated GitHub
read secret, with separate atomic snapshot/history tables and independent daily polls.
Downloads contains both chart types, daily detail and cumulative releases. Only payload
ZIPs count as bundle downloads; support manifests/catalogs are excluded. Authenticated
Cloudflare-runtime reads and production D1 storage were verified. See the current plan.

2026-10-13 dashboard preference decision: reloads return to a rolling Last Week. Custom
periods are temporary views; fixed date parameters are removed from browser report URLs.
Historical collection warnings live in a dismissible notification menu, with local browser
preferences and persistent source history in Daily data. No extra chart/control requests.

2026-10-13 download reporting correction: explicit completed-day reportDate is separate
from actual collectedAt. First known totals initialize from an explicitly labeled zero
opening balance; subsequent reports subtract stored counters. Recovery intervals retain
provenance instead of claiming exact calendar-day activity across a missed observation.

2026-10-13 daily download presentation: use a compact daily totals list beside one
selected-day breakdown, stacked on narrow screens with direct navigation to details
and back to days. Exact filenames are an optional local toggle; per-source collection
provenance belongs in the selected-day panel. Preserve counts, counter arithmetic and
missing/reset explanations without expanding every day into a large table row. These
controls reuse the saved report without new requests. Validation/deployment lives in
the completion plan and companion Docs/MarketingFunnel.md.

2026-10-13 package labels: download analytics describe app-package files, separating full
packages (version contained) from delta patches (target version), rather than completed
updates. Recovered comparisons expose their actual collection interval above details.
GitHub counters include build/test traffic and cannot establish starting installations,
customer identity or successful upgrades. Existing counter data remains unchanged.

## Purpose

2026-10-10 marketing architecture: the static product page sends bounded aggregate
view/click events to the existing edge Worker at /api/marketing. Fixed source groups
are determined in the browser; no identifiers, raw campaign names or URLs are stored.
The analytics D1 database retains daily event totals and GitHub snapshot history for
90 days. Access-protected reporting reads commerce through the private license reader,
keeping independent populations explicit rather than linking visitors to licenses.
See the current completion plan and companion Docs/MarketingFunnel.md for evidence.

2026-10-01 purchase reporting: the existing authenticated analytics portal now reads
confirmed commerce orders through its private license-reader binding. Reporting keeps
currencies separate and excludes customer identities and license material. Production
commerce independently announces seat counts to Discord through a private Worker secret.
No purchase data is accepted through public usage ingestion. The current completion plan
links to deployment and validation evidence; on-demand signing is still under design.

2026-09-30 navigation and content: purchase controls live on the Blackbird product
page at #pricing. Legacy shop pages remain accessible but are absent from navigation
and the sitemap. Public documentation contains concise media descriptions; production
briefs and internal review notes are not part of the reader-facing documentation.

2026-09-30 regional pricing: the static shop requests a currency hint from the existing
Cloudflare edge Worker at /api/currency. It shows one approved fixed price and a manual
currency selector, with USD fallback. Currency-specific Managed Payments links keep
checkout aligned. No additional geolocation provider or location storage is introduced.

2026-09-09 analytics architecture update: rolling 2.0.0 remains compatible with the
new version-aware 2.1.0 contract. Daily v1 is retired. Version reporting uses revised
consent and aggregate app-days with no persistent installation identity; see the
companion UsageAnalyticsAppVersionHandoff.md for client integration requirements.

Website/backend usage analytics is now tracked in the companion Cloudflare repository:
[`UsageAnalyticsImplementationPlan.md`](../../incogent-cloudflare/Docs/UsageAnalyticsImplementationPlan.md).
The [client integration handoff](../../incogent-cloudflare/Docs/UsageAnalyticsHandoff.md) contains the
candidate contract and local endpoint instructions. The first local ingestion slice is implemented;
final privacy text, hosted staging, distribution collection and private dashboard remain pending.
As of 2026-09-05 the user's priority is basic, inexpensive tracking: candidate draft 2 reduces
collection to five daily counters and stores them together in one aggregate row. Detailed feature,
onboarding and performance tracking is deferred.

Build `www.incogent.io` as the static marketing, product, services, and commerce front end for Incogent while retaining a locale-aware generation workflow.

The site will eventually introduce Incogent, make Blackbird its primary focus, present Incogent's development services, and sell Blackbird. Content, branding, and visual changes will happen deliberately in later phases rather than during structural planning.

This document is the durable source of truth for decisions, remaining work, and implementation progress.

## Current Foundation

The active Incogent implementation is intentionally self-contained. Sushi Ben-specific pages, templates, copy, scripts, styles, and assets were removed after dependency review; the original remains recoverable from its own repository and history.

- Use `templates/site.tpl` and `templates/pages/` as the active layout foundation.
- Use `site.css` and `site.js` as the active presentation and behavior foundation.
- Preserve the CSV-driven localization system and generated `/{locale}/` page structure.
- Keep the static generation and localization design pattern while allowing the route and template implementation to evolve for Incogent.
- Keep English as the only active locale until Incogent translations are ready; add future locale columns and metadata without copying generated pages by hand.

## Agreed Decisions

- 2026-09-29: use Stripe Managed Payments with a default-hosted Payment Link for
  initial one-time Blackbird purchases. Existing Blackbird licensing remains the
  fulfillment authority; server-verified paid webhooks trigger code delivery.
  Sandbox tooling and a $149 USD per-seat alpha offering are configured. Purchases
  include 12 months of updates and perpetual use of covered versions, using offline
  signed batches for specific purchase dates. The sandbox fulfillment Worker is
  implemented and deployed; credentials, dated inventory, real payment/email/activation
  validation and live configuration remain pending. See [StripeCheckoutIntegration.md](StripeCheckoutIntegration.md).

- 2026-09-29: regional prices approved: USD 149 and CAD 219 before applicable tax;
  EUR 159, GBP 139 and AUD 239 inclusive of applicable VAT/GST. Entitlements remain
  identical. Currency options are configured and independently read back on both
  existing sandbox/live prices. Hosted checkout validation and matching website tax
  presentation remain pending; the user requests the website update once Stripe
  checkout and fulfillment work. Stripe Automatic uses currency, not jurisdiction.

- Keep locale-prefixed generated pages such as `/en/`.
- Keep translatable text separate from templates so additional locales can be generated later.
- Keep the current localization design even if only English receives new Incogent content initially.
- Make Blackbird the primary focus of the eventual homepage and navigation.
- Nest Blackbird under `/products/blackbird/` so additional products fit naturally.
- Separate product information from the shop and purchase flow.
- Add an About page for Incogent.
- Add a Services page covering Unreal Engine, XR, console development, consulting, porting, and contract work.
- Retain Privacy Policy and EULA pages.
- Keep the site deployable as static files on GitHub Pages.
- Use an external commerce provider or secure backend for payments, license fulfillment, and secrets. GitHub Pages will host only the storefront portion.

## Target Information Architecture

```text
/
`-- en/
    |-- index.html
    |-- products/
    |   |-- index.html
    |   `-- blackbird/
    |       `-- index.html
    |-- shop/
    |   |-- index.html
    |   `-- blackbird/
    |       `-- index.html
    |-- services/
    |   `-- index.html
    |-- about/
    |   `-- index.html
    |-- privacy/
    |   `-- index.html
    `-- eula/
        `-- index.html
```

The root page continues to detect an available browser locale and redirect to the matching generated locale, falling back to `/en/`.

### Eventual Primary Navigation

- Blackbird -> `/{locale}/products/blackbird/`
- Services -> `/{locale}/services/`
- About -> `/{locale}/about/`
- Shop -> `/{locale}/shop/`
- Contact -> `/{locale}/#contact`

This navigation will be implemented by adapting the existing desktop and mobile navigation markup, not by replacing the header layout.

### Eventual Footer Navigation

- Products
- Privacy Policy
- EULA
- Contact/support
- Locale selector

This will retain the existing footer structure and styling while its links and labels are adapted later.

## Active Template Mapping

The active site uses these sources:

| Incogent destination | Existing foundation |
| --- | --- |
| All page shells | `templates/site.tpl` |
| Homepage | `templates/pages/home.html` |
| Products and Blackbird | `templates/pages/products.html` and `templates/pages/blackbird.html` |
| Shop and Blackbird purchase | `templates/pages/shop.html` and `templates/pages/blackbird-shop.html` |
| Services and About | `templates/pages/services.html` and `templates/pages/about.html` |
| Privacy Policy and EULA | `templates/pages/privacy.html` and `templates/pages/eula.html` |
| 404 and redirects | Generated directly by `scripts/build-i18n.mjs` |

## Page Responsibilities

### Homepage

- Lead with Blackbird.
- Introduce its core value and primary action.
- Preview major Blackbird capabilities.
- Preview Incogent's development and consulting services.
- Establish company credibility.
- Provide contact and purchase calls to action.

### Products

- Provide a scalable catalog for current and future Incogent products.
- Initially feature Blackbird as the sole product.

### Blackbird

- Explain the product, intended audience, capabilities, workflows, and supported integrations.
- Link to purchasing, documentation, support, and downloads as those become available.

### Shop

- Provide a scalable catalog of purchasable products.
- Explain purchasing and licensing at a high level.

### Blackbird Purchase Page

- Present editions, license types, prices, and purchase actions.
- Hand off payment to a secure commerce provider.
- Never place commerce secrets or authoritative purchase validation in client-side code.

### Services

- Unreal Engine development
- XR development
- Console development
- Porting and optimization
- Technical consulting
- Contract engineering and production support

### About

- Describe Incogent's purpose, experience, approach, and team/company identity.

### Legal

- Publish an Incogent Privacy Policy.
- Publish the Blackbird EULA at `/{locale}/eula/` initially.
- Revisit a product-specific legal hierarchy if future products require different agreements.

## Commerce Flow

```text
Product page
  -> shop/product page
  -> license or edition selection
  -> secure hosted checkout
  -> verified payment event
  -> license and download fulfillment
  -> receipt, support, and license management
```

Provider selection is intentionally deferred. The evaluation must cover payment processing, taxes/VAT, refunds, license-key generation, download delivery, customer email, account/portal needs, webhooks, regional availability, fees, and data-processing obligations.

## Technical Approach

- Continue using static HTML, CSS, and JavaScript hosted through GitHub Pages.
- Continue committing generated HTML so deployment requires no server-side build.
- Extend `scripts/build-i18n.mjs` in small steps while retaining its parsing, fallback, metadata, alias, and output patterns.
- Keep user-facing text in CSV files with `key`, `context`, and locale columns.
- Keep English as the required fallback for untranslated new keys.
- Add nested-route path handling to the existing generator before adding nested product pages.
- Reuse the existing templates and CSS classes wherever their semantics fit.
- Add CSS only when an Incogent page genuinely needs a new component or variation.
- Preserve canonical URLs, `hreflang`, Open Graph data, sitemap generation, structured data, and localized 404 behavior.
- Validate generated output after every structural change.

## Phases and Progress

### Phase 0 - Baseline and Planning

- [x] Duplicate the committed Sushi Ben site into the Incogent repository.
- [x] Preserve the Incogent repository identity and configure `CNAME` for `incogent.io`.
- [x] Agree on the initial information architecture.
- [x] Confirm locale-prefixed generated routes.
- [x] Record the development plan and architectural decisions.
- [x] Confirm that the original layout, formatting, content, and assets remain the baseline.

### Phase 1 - Provisional Incogent Scaffold

- [x] Inventory the reusable sections and components in the existing home, secondary, legal, and 404 templates.
- [x] Document the existing patterns available for later reuse.
- [x] Add manifest-driven nested routes such as `products/blackbird`.
- [x] Add English routes for Products, Blackbird, Services, About, Shop, Privacy Policy, and EULA.
- [x] Keep user-facing scaffold text in an English localization CSV.
- [x] Add generation checks for expected routes and unresolved tokens.
- [x] Render and verify the scaffold through a local HTTP server with Chrome.
- [ ] Review the deployed scaffold on desktop and mobile before choosing which inherited visual patterns to reintroduce.

### Phase 2 - Incogent Content Architecture

- [ ] Define the final section outline for each page using the selected existing patterns.
- [ ] Define Blackbird feature and workflow taxonomy.
- [ ] Define product editions and licensing concepts without committing to prices.
- [ ] Define service categories and desired contact paths.
- [ ] Draft production English copy in the localization source files.
- [ ] Replace Sushi Ben legal content with reviewed Incogent Privacy Policy and Blackbird EULA text.

### Phase 3 - Focused Visual Adaptation

- [ ] Replace branding and art assets while preserving the established responsive layout.
- [ ] Adapt colors, typography, spacing, and component styling only where Incogent's identity requires it.
- [ ] Add Blackbird screenshots, diagrams, video, and social-sharing assets.
- [ ] Remove unused inherited content and assets only after replacements are complete.
- [ ] Verify responsive layouts, accessibility, reduced motion, keyboard use, and contrast.

### Phase 4 - Commerce and Fulfillment

- [ ] Document product editions, license terms, upgrade rules, refunds, and fulfillment requirements.
- [ ] Evaluate commerce, tax, licensing, download, and customer-portal options.
- [ ] Select the checkout and fulfillment architecture.
- [ ] Implement product/price configuration without exposing secrets.
- [ ] Implement checkout handoff and verified webhooks.
- [ ] Implement license issuance and secure download delivery.
- [ ] Implement success, cancellation, receipt, support, and license-management experiences.
- [ ] Test successful payments, failures, retries, refunds, disputes, and duplicate webhooks.

### Phase 5 - Localization

- [ ] Choose the next supported locales.
- [ ] Translate shared navigation, metadata, page copy, product data, checkout messaging, and legal text.
- [ ] Validate locale fallbacks and language switching on every route.
- [ ] Confirm locale-aware commerce behavior and legal requirements.

### Phase 6 - Launch Readiness

- [ ] Complete SEO metadata and structured data.
- [ ] Validate sitemap, robots directives, redirects, and custom domain behavior.
- [ ] Run link, HTML, accessibility, performance, and browser checks.
- [ ] Verify contact, checkout, fulfillment, and support flows in production-like environments.
- [ ] Establish analytics, consent, monitoring, backups, and incident ownership as required.
- [ ] Perform final legal, security, and content review.

## Open Decisions

- Blackbird's exact positioning and primary audience.
- Product editions, licensing model, pricing, trials, and upgrade policy.
- Checkout, tax, licensing, download, and customer-portal providers.
- Whether customers need Incogent accounts or a provider-hosted portal.
- Contact form, support, and sales routing.
- Documentation and download hosting.
- Final social channels and public company information.
- Initial post-English localization priorities.

## Change Log

- 2026-08-05: Created the plan and confirmed locale-prefixed routing, product nesting, the initial sitemap, and the commerce boundary.
- 2026-08-05: Clarified that the committed Sushi Ben-derived layout, formatting, templates, content, and assets are the preserved baseline. Reverted an unsuitable generic-layout rewrite before it was committed.
- 2026-08-05: Added an inventory mapping each planned Incogent destination to existing homepage, secondary, shop, team, legal, 404, CSS, and JavaScript patterns.
- 2026-08-05: Reinstated the provisional Incogent scaffold for served-browser evaluation after confirming the earlier unstyled view was caused by an isolated HTML preview. Prepared it for remote mobile review.


## Daily report caching decision (2026-10-10)

Owner requested daily reports and minimal dashboard database work; UTC buckets remain unchanged. The companion analytics Worker caches protected summary HTML/JSON/CSV in named Workers Cache storage after verifying Access on every request. Defaults exclude ongoing UTC days. Saved reports expire at 00:10 UTC, following the 00:05 download poll; a 03:05 failed-poll retry remains. The next authorized visit builds each report, without a report cron job or database snapshot writes. Cache hits avoid database/reader queries; eviction, different filters/targets and different data centers can rebuild. Live redemption-code and license-ID lookups are excluded. Private browser no-store headers remain. Validation and production version are recorded in SiteAuditAndCompletionPlan.md and companion Docs/MarketingFunnel.md.


## Unified analytics dashboard decision (2026-10-10)

The main private dashboard now presents funnel metrics and a single chart selector covering website, downloads, app reporting/actions/updates, purchases, redemptions and CTR. Server-rendered chart panels are switched locally by one CSP-hash-authorized script with no requests; daily report caching and Access checks remain. Supporting detail and collection schedule use collapsed sections below the main data. Separate record/code lookup tools are retained for administrative work. Backend Docs/MarketingFunnel.md records implementation, validation and deployment; Docs/AnalyticsDataSchedule.md remains the timing reference.


## Analytics category simplification (2026-10-10)

The main selector is reduced to Marketing, Downloads, App Activity and Sales & Licenses. Category-local tabs present charts, daily data and related sources/releases/versions/records without a stack of expandable panels. Only report/schedule information stays collapsed below the data. Reporting Apps describes approximate daily opt-in reporting, including idle apps; its overview card uses the latest day's value. Period sums retain a Daily app reports label and repeated-app explanation. Local selection, Access, UTC daily cache and internal metric definitions are preserved. Companion Docs/MarketingFunnel.md records current validation and deployment.


## Chart-first workspace decision (2026-10-10)

Use a compact sidebar to separate chart presentation from period totals, filters and operational/schedule information. App Activity is the default. Show one plot at a time using a local selector; retain category-specific data/breakdown tabs and saved-report reuse. Desktop charts fit the initial viewport, with auxiliary data scrollable inside the workspace. Mobile uses compact navigation. Website availability must distinguish pre-rollout, partial and genuinely empty periods; rollout is October 10 and natural event observation remains pending. Current validation/deployment evidence lives in the completion plan and companion Docs/MarketingFunnel.md.


## Unified dashboard navigation and record tools (2026-10-10)

Use the sidebar as the single category/destination selector, with one current item. The 2026-10-28 refinement groups Analytics and Licenses, adds accessible icons, and moves desktop collapse into the sidebar header. Collapsed desktop navigation remains a 72px icon rail with a locally saved preference; mobile keeps an icon opener and full labels, with close/focus handling. Date/target controls now share the active analytics header with its tabs (2026-10-28), removing the reserved toolbar row and preserving selection on Apply/shortcuts. Cold reports fetch independent data concurrently and save their private cache after responding; chart state includes only plotted fields, with bounded reads and private timing headers. License and purchase tools share the report shell and load authenticated HTML into the workspace on demand; legacy URLs/forms render the same shell. Statistical cache policies remain; code/detail lookups stay private live reads and codes never enter URLs. A narrowly hashed script plus same-origin connect policy supports local navigation and tool requests. Current evidence: companion Docs/MarketingFunnel.md and the completion plan.

## Analytics single-location decision — 2026-10-10

The license dashboard provides private paginated inventory and redemption-code detail lookup. Purchase records belong to Sales & Licenses → Records; currency monetary totals belong to its Daily data tab. No separate purchase navigation/page or duplicated charts. Existing purchase bookmarks redirect to the canonical Records tab; records reuse the daily saved dashboard response with no additional tab-switch reads. Current validation/deployment evidence is in SiteAuditAndCompletionPlan.md and companion backend Docs/MarketingFunnel.md.

## Download reporting correction — 2026-10-12

Daily observed downloads use per-asset counter subtraction, treating new assets as zero in the prior report; release-window changes no longer erase known activity. Period totals show recorded downloads from available observations. Releases remains the single home for latest cumulative release totals, with a separate observation timestamp and publication metadata labels. Evidence and current deployment status: SiteAuditAndCompletionPlan.md and companion backend Docs/MarketingFunnel.md.
