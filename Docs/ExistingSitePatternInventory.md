# Existing Site Pattern Inventory

Last updated: 2026-08-05

This inventory identifies Sushi Ben-derived structures available for reuse as the provisional Incogent scaffold evolves. The original templates, styles, scripts, content, and assets remain in the repository as references, although the active English scaffold currently uses `templates/site.tpl`, `templates/pages/`, and `site.css`.

## Shared Page Shell

All current page families share these established elements:

- Sticky `.site-header` with `.wrap.nav-row`
- Image-based `.brand` treatment
- Desktop `.nav-links`
- Responsive `<details class="nav-menu">` navigation
- `<details class="lang-switcher">` locale selector
- `.theme-toggle` and stored light/dark theme behavior
- `.site-footer` with `.footer-row`, social links, legal links, metadata links, and copyright
- Shared button variants: `.btn`, `.btn-primary`, and `.btn-secondary`
- Shared width primitives: `.wrap` and `.narrow`
- Responsive transition at the existing 880-pixel breakpoint

These elements should be adapted in place for Incogent rather than replaced with a different shell.

## Homepage Template

Source: `templates/home.tpl`

The homepage provides the richest set of reusable site components:

1. `.hero` with `.hero-grid`, hero copy, hero art, and `.cta-row`
2. Purchase section using `.soft-panel` and `.store-grid`
3. Media section using `.media-grid`, trailer embed, `.shots-grid`, and screenshot lightbox triggers
4. Feature/highlight presentation within the homepage panels
5. Soundtrack-style promotional panel, suitable as a model for a focused secondary product callout
6. About section using `.narrow.soft-panel`
7. Review section using `.review-grid` and `.review-card`
8. Contact/support section using `.support-grid`, `.support-card`, and `.contact-form`
9. `.section-final-cta` with logo/art and primary action
10. Native `<dialog>` screenshot lightbox

### Planned Reuse

- The Blackbird-led Incogent homepage will retain this overall section rhythm and panel system.
- Blackbird's eventual product page can reuse the hero, feature/media, review/proof, purchase, and final-CTA patterns.
- Services and About homepage previews can reuse existing soft panels and CTA rows.
- The existing contact area remains the structural model for Incogent inquiries.

## Secondary Page Template

Source: `templates/secondary.tpl`

The shared secondary template provides:

- The same global header, responsive navigation, locale selector, theme control, and footer as the homepage
- `.secondary-page` plus page-specific `secondary-{{PAGE_SLUG}}-page` body classes
- A constrained `.legal-wrap` content region
- Localized body partial insertion through `{{PAGE_BODY}}`
- Page-specific canonical, Open Graph, structured-data, and `hreflang` generation

The localized English secondary bodies under `i18n/secondary/en/` demonstrate several reusable component families.

### Panel Content

Sources: Team, Cast, and Press Kit partials

- `.secondary-group`
- `.secondary-panel`
- `.secondary-panel-narrow`
- `.secondary-panel-mid`
- `.secondary-intro`
- `.secondary-list`

These are the default foundation for Products, Services, and About.

### Card and Grid Content

Sources: Team and Cast partials

- `.credit-grid`
- `.credit-card`
- `.credit-name`
- `.credit-role`
- Headshot/card variations

These patterns can support service categories, product capabilities, company principles, team members, or platform expertise without inventing a new card system.

### Partner and Logo Content

Source: Team partial

- `.logo-stack`
- `.logo-card`
- `.partner-logo`
- `.logo-copy`

These patterns can support Blackbird integrations, supported platforms, technology partners, or company credentials.

### Store Content

Source: `i18n/secondary/en/shop.html`

- `.merch-grid`
- `.merch-card`
- `.merch-card-featured`
- `.merch-art`
- `.merch-copy`
- `.merch-description`
- `.merch-price`
- `.merch-note`

This is the foundation for the Products catalog, Shop catalog, and Blackbird license/edition presentation. Commerce behavior will change later, but the established layout and formatting should be retained.

## Legal Template

Source: `templates/legal.tpl`

The legal page family provides:

- The shared global header and footer
- `.legal-wrap`
- `.legal-switch` for switching between agreements
- Button state and `aria-current` handling
- `.legal-text` for preserving long-form legal formatting
- Localized legal bodies from dedicated CSV files

Privacy Policy and EULA should continue using this family. The fan-content entry can be removed only when the Incogent navigation and legal switcher are intentionally adapted.

## 404 and Redirect Patterns

Sources: `templates/404.tpl` and `scripts/build-i18n.mjs`

- Browser-language selection and supported-locale normalization
- Default English fallback
- Localized 404 strings
- Shared navigation and footer reconstruction
- Canonical and locale-aware redirect generation
- Legacy route aliases

Nested Incogent routes should extend these behaviors rather than bypass them.

## Existing Styling and Behavior

### `styles.css`

- Global tokens, typography, buttons, navigation, theme controls, homepage layout, panels, grids, forms, footer, lightbox, and responsive rules
- Existing light and dark theme variants
- Existing mobile navigation transition at 880 pixels

### `secondary.css`

- Legal layout
- Secondary-page panels and widths
- Store/product cards
- Credit/team/cast grids
- Partner/logo cards
- Page-specific decoration and responsive variations

### `script.js`

- Theme preference behavior
- Navigation/details interactions
- Current-year footer behavior
- Screenshot lightbox behavior
- Contact-form behavior and status handling

Any later removal or replacement must be based on a confirmed lack of use after the Incogent pages exist.

## Page-to-Pattern Selection

| Destination | Selected existing pattern |
| --- | --- |
| Homepage | Existing homepage template and section rhythm |
| Products index | Secondary template plus current Shop grid/card pattern |
| Blackbird product | Homepage hero, panels, media, proof, purchase, and final CTA |
| Shop index | Current Shop secondary page pattern |
| Blackbird purchase | Featured and standard Shop cards plus ordering-information panel |
| Services | Secondary panels plus credit/card grids |
| About | Secondary panels plus team/partner card patterns |
| Privacy Policy | Existing legal template and privacy CSV |
| EULA | Existing legal template and EULA CSV |

## Current Review Step

The nested route scaffold is implemented. The next decision should follow review of the served site on desktop and mobile: identify which inherited visual patterns should be reintroduced or adapted before production copy, final art, and commerce work begin.
