# Incogent Site Audit and Completion Plan

Last updated: 2026-09-03

## Executive Summary

The Incogent scaffold is deployed and its nine manifest-managed English pages render successfully. The shared shell, navigation, responsive CSS, theme control, Discord integration, metadata generation, sitemap generation, and basic build validation are present.

The site is not yet production-complete. First-party contact and download Worker code and site wiring are implemented, but production Worker configuration and deployment remain. Privacy and EULA pages still contain explicit draft warnings.

The Cloudflare Worker was published separately and the first-party site wiring was implemented on 2026-09-03. Sushi Ben-specific pages and unused inherited source were removed after audit while the locale-aware architecture was retained. The next operational step is Worker configuration and deployment, followed by legal content and browser/deployment checks.

## Audit Scope and Evidence

The original observations below cover the repository at commit `7c0d45c`, the deployed site on 2026-09-03, and the public `Incogent/Blackbird-Releases` release feed. Items explicitly marked resolved were corrected later on 2026-09-03.

Verified observations:

- `https://www.incogent.io/`, `/en/`, and `/en/products/blackbird/` return HTTP 200.
- Requests to the apex host redirect to `www.incogent.io`.
- `https://www.incogent.io/download/blackbird/windows` currently returns HTTP 404.
- The four published Blackbird releases are prereleases. The newest is `v0.8.3-alpha.1`, published 2026-09-02.
- The newest release contains `BlackbirdSetup.exe` and `Incogent.Blackbird-win.msi`, and both assets download successfully.
- GitHub's `/releases/latest/download/BlackbirdSetup.exe` returns HTTP 404 because GitHub's `latest` route excludes prereleases.
- The generated Blackbird page still uses deleted `v0.8.0-alpha.15` assets as its non-JavaScript fallback; those URLs return HTTP 404.
- Repository validation passes for nine manifest-managed routes and one locale.
- At audit time the repository contained 145 tracked HTML/template files and publicly served inherited Sushi Ben output such as `/en/cast/`. The 113 published Sushi Ben pages were subsequently removed.

## Functional Inventory

### Working

| Area | Status | Notes |
| --- | --- | --- |
| Hosting and TLS | Working | Cloudflare fronts GitHub Pages and the `www` host serves the site. |
| Active routes | Working | Home, Products, Blackbird, Shop, Blackbird Shop, Services, About, Privacy, and EULA are generated under `/en/`. |
| Shared shell | Working | Desktop/mobile navigation, footer, skip link, responsive layout, and shared styles are present. |
| Theme control | Working in code | Light/dark selection persists in local storage and updates embedded widgets. Browser interaction still needs automated coverage. |
| Blackbird page content | Substantially present | The product page has useful alpha-stage marketing copy and two installer choices. |
| Current release assets | Working | The current prerelease has valid EXE and MSI assets. |
| Client-side release selection | Working under ideal conditions | JavaScript chooses the newest stable release, or the newest prerelease when no stable release exists. |
| Discord | Present | Invite and server widget are configured. External availability should be monitored rather than assumed by the build. |
| Build generation | Working | Templates, English strings, nested route generation, canonical tags, JSON-LD, robots, and sitemap output are generated. |
| Basic validation | Working but narrow | Encoding, unresolved token, expected-file, and canonical checks pass. |
| Disabled checkout state | Working as designed | The shop clearly says checkout is not configured rather than accepting an unusable purchase. |

### Partially Complete

| Area | Status | Missing work |
| --- | --- | --- |
| Homepage | Scaffold | Blackbird, Services, About, and Contact sections exist, but several passages explicitly describe future content. |
| Products catalog | Scaffold | Blackbird is listed; product imagery, version/support information, documentation links, and stronger calls to action are absent. |
| Services | Scaffold | Categories exist, but proof, engagement model, representative work, and inquiry routing need production copy. |
| About | Scaffold | Company, experience, and approach cards are placeholders. |
| Shop/licensing | Scaffold | Editions, eligibility, pricing, licensing terms, checkout, fulfillment, and support policy remain undecided. |
| SEO/social metadata | Basic | Titles, descriptions, canonicals, hreflang, sitemap, and simple JSON-LD exist. Social share imagery, richer product schema, and canonical-host consistency are missing. |
| Localization | English only | The architecture supports locales but only `en` is active and the language switcher is hidden. |
| Accessibility | Basic structure only | Skip link, labels, semantic sections, and status regions exist. Keyboard, contrast, zoom, screen reader, reduced-motion, and automated audits have not been recorded. |
| 404 page | Minimal | It works as a fallback but omits the normal header, footer, search/help paths, and useful recovery links. |

### Broken or Unsafe to Treat as Production

| Priority | Area | Problem | User impact |
| --- | --- | --- | --- |
| P0 | Download fallback | Generated HTML points to deleted `v0.8.0-alpha.15` assets. | Downloads fail when JavaScript does not run or cannot resolve a release. |
| P0 | Download dependency | The browser calls the unauthenticated GitHub API and requires both EXE and MSI assets before updating either link. | Rate limiting, API failure, CSP/privacy tooling, or one missing asset leaves both dead fallbacks in place. |
| P0 | First-party download route | `/download/blackbird/windows` does not exist. | There is no durable public URL for docs, marketing, support, or historical links. |
| P0 | Contact form | The form action is `https://REPLACE_WITH_YOUR_WORKER.workers.dev/`. | Submissions cannot succeed. |
| P0 | Legal pages | Privacy and EULA pages publish explicit draft warnings. | The site lacks production legal terms for data collection and Blackbird use. |
| Resolved | Inherited public pages | 113 Sushi Ben pages and their unused source dependencies were removed. | Validation now fails if those paths reappear. |
| Resolved | Canonical host | Generated canonicals, hreflang, structured data, robots, and sitemap now use `https://www.incogent.io`. | The apex remains available through its existing redirect. |
| P1 | Root routing | `/` is an HTTP 200 page with a meta refresh to `/en/`, not a server-side redirect. | Slower navigation, weaker caching/SEO semantics, and dependence on HTML refresh behavior. |
| Partially resolved | Validation coverage | CI now checks generation drift, routes, internal links, fragments, local assets, metadata, critical Worker URLs, duplicate IDs, image alt attributes, HTTPS, and forbidden legacy paths. | Browser accessibility and deployed smoke coverage remain. |
| Resolved | Repository identity | `README.md` now documents the Incogent source, generation, validation, Worker boundary, and localization workflow. | — |
| P2 | Deployment ownership | No Worker source/config or deployment workflow is stored here. | Download and contact infrastructure cannot be reproduced or reviewed with the site. |

## Recommended Download URL Contract

Use first-party URLs with channel and installer type represented in the path:

| URL | Meaning |
| --- | --- |
| `/download/blackbird/windows` | Recommended Windows installer and recommended channel. During alpha this resolves to the newest prerelease EXE. The channel can later become stable without changing the marketing URL. |
| `/download/blackbird/windows/prerelease` | Newest published non-draft prerelease EXE. |
| `/download/blackbird/windows/prerelease/msi` | Newest published non-draft prerelease MSI. |
| `/download/blackbird/windows/stable` | Newest published non-draft full-release EXE. Return a clear 404 until one exists. |
| `/download/blackbird/windows/stable/msi` | Newest published non-draft full-release MSI. Return a clear 404 until one exists. |

The short recommended URL should be used for the primary website button. The explicit prerelease URL should be used anywhere the alpha channel must remain pinned even after stable releases begin. Keeping installer type last makes the default EXE path short while preserving a predictable MSI variant.

## Cloudflare Worker Design

The Worker should redirect; it should not proxy 50 MB installer bodies.

1. Match only the documented product/platform/channel/installer combinations.
2. Fetch releases from `Incogent/Blackbird-Releases` through the GitHub API.
3. Exclude drafts and select by `prerelease` state and `published_at`.
4. Select the exact allow-listed asset name: `BlackbirdSetup.exe` or `Incogent.Blackbird-win.msi`.
5. Validate that the returned asset URL belongs to the expected GitHub repository release path.
6. Return a temporary redirect to `browser_download_url`. A 302 is appropriate because the target changes as releases are published.
7. Cache the resolved result at the edge for a short interval, such as 5-15 minutes, and use stale-if-error behavior where practical.
8. Store a fine-grained read-only GitHub token as a Worker secret to avoid relying on the low unauthenticated API rate limit.
9. If resolution fails, return a small human-readable 503 page linking to the repository's Releases page. Never fall back to a deleted or guessed version.
10. Emit structured logs containing route, selected channel, selected tag, selected asset, cache state, and failure reason, without recording visitor-identifying data.

The Worker can initially serve both download resolution and contact submission, but the handlers should be separate modules and routes so either can be changed independently.

## Site Integration Changes

After the Worker is deployed:

- Replace `DOWNLOAD_URLS` with the first-party routes above.
- Make the server-rendered `href` values authoritative and functional without JavaScript.
- Remove the GitHub Releases API lookup and local-storage download cache from `site.js`; client-side resolution becomes unnecessary.
- Label the primary action `Download Blackbird Alpha for Windows` while prerelease is the recommended channel.
- Retain the MSI alternative and point it directly to the first-party prerelease MSI route.
- Add visible alpha/version expectations near the download action: prerelease status, supported Windows versions, approximate size, update behavior, release notes, checksum/signing guidance, and support link.
- Add the primary download action to the homepage and Products card so users do not have to discover it only on the product page.

## Prioritized Completion Plan

### Milestone 1 - Reliable Downloads and Critical Trust Fixes

- [x] Implement the Cloudflare Worker download resolver for `www.incogent.io/download/*`.
- [x] Add stable and prerelease route tests using fixture release payloads, including no stable release and invalid asset URLs.
- [x] Replace both generated fallback links with first-party routes and remove browser-side GitHub API resolution.
- [ ] Publish and deploy the separate Worker repository, configure its secrets, and verify the production routes.
- Add a deployed smoke test that verifies the first-party endpoint redirects to the expected current tag and filename without downloading the body.
- [x] Align `SITE_URL`, canonicals, sitemap, robots, and structured data with `https://www.incogent.io`.
- [x] Remove inherited Sushi Ben routes and make validation fail if they return.

Exit criteria: downloads work with JavaScript disabled; explicit prerelease EXE/MSI routes resolve; stable routes fail clearly until a stable release exists; no Incogent URL serves Sushi Ben-branded content; canonical URLs require no host redirect.

### Milestone 2 - Contact, Legal, and Operational Basics

- Implement the contact Worker handler with Turnstile server-side verification, schema/size validation, rate limiting, safe email or ticket delivery, and generic client errors.
- Verify the configured Turnstile site key is restricted to the production and test hostnames.
- Add a direct support email fallback for users who cannot use the form.
- Replace the Privacy Policy and EULA placeholders with reviewed production text before collecting messages or presenting Blackbird as generally available.
- Add logging/alerting for download resolution and contact-delivery failures.
- Rewrite `README.md` for Incogent, including generation, validation, deployment, Worker setup, secrets, and rollback.

Exit criteria: contact submissions are end-to-end tested; legal links contain approved content; maintainers can reproduce deployment from repository documentation.

### Milestone 3 - Content Completion

- Replace homepage, Products, Services, and About placeholder copy with final English copy.
- Add Blackbird screenshots or short workflow media, release notes, documentation, system requirements, installation/update behavior, security/signing information, support, and a concise alpha expectations section.
- Decide whether Shop should remain visible during alpha. If there is nothing to buy, consider replacing prominent purchase calls with download, documentation, or waitlist actions until licensing is defined.
- Add company proof appropriate for Services and About: shipped work, platform/engine capabilities, engagement model, and a clear inquiry path.
- Add product-specific social share imagery and richer `Product`/`SoftwareApplication` structured data where accurate.

Exit criteria: no public-facing Incogent page describes itself as a placeholder or future section; every primary call to action leads to a working destination.

### Milestone 4 - Quality Gates and Launch Readiness

- Extend validation to crawl manifest-managed pages and verify internal paths, fragments, local assets, canonical host, forbidden placeholders, and unexpected legacy routes.
- Add HTML validation, accessibility automation, and a browser smoke suite for desktop and mobile navigation, theme switching, downloads, contact, and 404 recovery.
- Establish performance budgets and optimize images, fonts, third-party embeds, and script loading.
- Add security headers through Cloudflare where GitHub Pages cannot provide them directly, including a tested Content Security Policy.
- Decide analytics/consent requirements, uptime monitoring, release-endpoint alerting, and ownership for incidents and content updates.
- Test Windows installer reputation/signing presentation and document checksum verification.

Exit criteria: automated production checks cover all critical user journeys and a release checklist names the owner and rollback for each external dependency.

### Milestone 5 - Commerce and Localization

- Finalize editions, license eligibility, pricing, upgrades, refunds, taxes, fulfillment, customer support, and account/portal requirements before enabling checkout.
- Select and integrate a hosted commerce/licensing provider; keep secrets and authoritative fulfillment off the static site.
- Add locales only after the English product, legal, download, support, and checkout vocabulary is stable.

Exit criteria: checkout and fulfillment are production-tested, and any enabled locale is complete across navigation, product, legal, support, and transactional paths.

## Immediate Implementation Order

1. Download Worker and first-party URLs.
2. Replace dead fallback links and remove client-side release discovery.
3. Canonical-host alignment and inherited-route cleanup.
4. Contact Worker and support fallback.
5. Production Privacy Policy and EULA.
6. Final content and Blackbird documentation/media.
7. Expanded automated quality gates.
8. Commerce, then additional locales.

## Decisions Still Required

- Whether `www.incogent.io` or `incogent.io` is the permanent canonical host.
- Whether `/download/blackbird/windows` should automatically switch to stable after the first full release or remain on prerelease until a deliberate configuration change. The safer recommendation is a deliberate configuration flag in the Worker.
- Whether the current MSI remains publicly promoted or moves to an administrator/documentation page.
- Whether the Shop remains in primary navigation before editions and checkout exist.
- Where contact messages are delivered and who owns response expectations.
- Final Privacy Policy, EULA, licensing, pricing, refund, and support terms.
