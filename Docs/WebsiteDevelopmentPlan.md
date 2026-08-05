# Incogent Website Development Plan

Last updated: 2026-08-05

## Purpose

Adapt the duplicated Sushi Ben website into `incogent.io` while preserving the original site's proven layout, responsive behavior, formatting, templates, localization workflow, and implementation patterns.

The site will eventually introduce Incogent, make Blackbird its primary focus, present Incogent's development services, and sell Blackbird. Content, branding, and visual changes will happen deliberately in later phases rather than during structural planning.

This document is the durable source of truth for decisions, remaining work, and implementation progress.

## Reference Foundation and Current Preview

The committed Sushi Ben-derived site remains the recoverable reference implementation. The current working version is a provisional Incogent scaffold intended for remote review before its visual direction is finalized.

- Preserve `templates/home.tpl`, `templates/secondary.tpl`, and `templates/legal.tpl` as the layout foundations.
- Preserve `styles.css`, `secondary.css`, and `script.js` as the formatting and responsive-behavior foundations.
- Preserve the existing header, navigation, section composition, cards, panels, calls to action, footer, forms, lightbox, theme behavior, and mobile behavior until each is intentionally adapted.
- Preserve the CSV-driven localization system and generated `/{locale}/` page structure.
- Retain the inherited content and art assets in the repository as references while the provisional English scaffold is evaluated.
- Create new page types by duplicating and adapting the closest existing template or secondary-page pattern.
- Keep the static generation and localization design pattern while allowing the route and template implementation to evolve for Incogent.
- Do not remove inherited routes, source content, or assets until their replacement is implemented and explicitly verified.

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

## Existing Pattern Mapping

The new site should reuse these established structures:

| Incogent destination | Existing foundation |
| --- | --- |
| Homepage | `templates/home.tpl` and its existing section/component patterns |
| Products index | `templates/secondary.tpl` plus a secondary body partial modeled on the current Shop page |
| Blackbird product page | Homepage feature, media, review, buy, and final-CTA section patterns |
| Shop index | Existing localized Shop page and shop-card styling |
| Blackbird purchase page | Existing Shop page structure, extended for license/edition selection |
| Services | `templates/secondary.tpl` with existing panel/card patterns |
| About | `templates/secondary.tpl`, based on the current Team/About presentation patterns |
| Privacy Policy | `templates/legal.tpl` and `i18n/strings-privacy.csv` |
| EULA | `templates/legal.tpl` and `i18n/strings-eula.csv` |
| 404 and redirects | Existing generated redirect and localized 404 patterns |

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
