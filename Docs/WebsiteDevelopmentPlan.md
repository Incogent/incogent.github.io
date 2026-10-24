# Incogent Website Development Plan

Last updated: 2026-10-24

> Current functional status, download architecture, and prioritized next work are recorded in [SiteAuditAndCompletionPlan.md](SiteAuditAndCompletionPlan.md). That audit is authoritative where it adds newer implementation findings to this original development plan.

2026-10-24 regional checkout architecture (published; purchasing paused): one shared catalog
in `scripts/blackbird-pricing.mjs` maps each of US/CA/EUROZONE/GB/AU/DEFAULT and
Indie/Studio/Enterprise to its approved amount, explicit currency, tax wording and
exact prepared live URL from Blackbird's handoff. A shared build renderer feeds the
product/shop pages. An explicit saved country/region replaces currency-only selection;
US USD adds tax while DEFAULT USD includes it. Missing/invalid preferences, blocked
storage and no JavaScript use DEFAULT. No currency hint is requested, because the
existing endpoint cannot distinguish those two USD offers. The website adds no tax
calculation. Permanent use, identical features, all future updates and USD-based
eligibility remain. Confirmation/support describe emailed redemption codes. The
false build-time sales gate omits all checkout URLs/buttons. The user-authorized
website publication is verified live with purchasing paused; new Stripe products/links
remain inactive and sales activation still needs separate authorization.
Final hosted-total checks are blocked by inactive live
links and are tracked with validation evidence in the current completion plan.

2026-10-24 currency presentation: format prices with each currency's familiar local
symbol using `Intl.NumberFormat` and regional English locales. Show whole amounts
without redundant decimals. Retain ISO currency codes in the country/region selector
to identify USD/CAD/AUD when their local price symbol is `$`. This display correction
does not change approved numeric amounts, tax behavior, region selection or checkout.

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

## Purpose

2026-10-10 marketing architecture: the static product page sends bounded aggregate
view/click events to the existing edge Worker at /api/marketing. Fixed source groups
are determined in the browser; no identifiers, raw campaign names or URLs are stored.
The analytics D1 database retains daily event totals and GitHub snapshot history for
90 days. Access-protected reporting reads commerce through the private license reader,
keeping independent populations explicit rather than linking visitors to licenses.
See the current completion plan and companion Docs/MarketingFunnel.md for evidence.

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
