<!doctype html>
<html lang="{{HTML_LANG}}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <title>{{PAGE_TITLE}}</title>
  <meta name="description" content="{{PAGE_DESCRIPTION}}">
  <meta name="robots" content="{{ROBOTS}}">
  <meta property="og:site_name" content="{{SITE_NAME}}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="{{OG_LOCALE}}">
  <meta property="og:title" content="{{PAGE_TITLE}}">
  <meta property="og:description" content="{{PAGE_DESCRIPTION}}">
  <meta property="og:url" content="{{CANONICAL_URL}}">
  <link rel="canonical" href="{{CANONICAL_URL}}">
  {{HREFLANG_LINKS}}
  <link rel="stylesheet" href="/site.css?v=20260805-foundation">
  <script type="application/ld+json">{{ORG_JSON_LD}}</script>
  <script type="application/ld+json">{{WEBPAGE_JSON_LD}}</script>
</head>
<body class="{{BODY_CLASS}}">
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header">
    <div class="wrap header-row">
      <a class="brand" href="{{HOME_URL}}" aria-label="{{SITE_NAME}} home">{{SITE_NAME}}</a>
      <nav class="primary-nav" aria-label="Primary navigation">
        <a href="{{BLACKBIRD_URL}}">{{NAV_BLACKBIRD}}</a>
        <a href="{{SERVICES_URL}}">{{NAV_SERVICES}}</a>
        <a href="{{ABOUT_URL}}">{{NAV_ABOUT}}</a>
        <a href="{{SHOP_URL}}">{{NAV_SHOP}}</a>
        <a class="nav-cta" href="{{CONTACT_URL}}">{{NAV_CONTACT}}</a>
      </nav>
      <details class="mobile-nav"><summary>{{NAV_MENU}}</summary><nav aria-label="Mobile navigation">
        <a href="{{BLACKBIRD_URL}}">{{NAV_BLACKBIRD}}</a><a href="{{SERVICES_URL}}">{{NAV_SERVICES}}</a><a href="{{ABOUT_URL}}">{{NAV_ABOUT}}</a><a href="{{SHOP_URL}}">{{NAV_SHOP}}</a><a href="{{CONTACT_URL}}">{{NAV_CONTACT}}</a>
      </nav></details>
    </div>
  </header>
  <main id="main-content">{{PAGE_BODY}}</main>
  <footer class="site-footer">
    <div class="wrap footer-grid">
      <div><a class="brand footer-brand" href="{{HOME_URL}}">{{SITE_NAME}}</a><p>{{SITE_TAGLINE}}</p><p class="development-note">{{FOOTER_STATUS}}</p></div>
      <nav aria-label="Footer navigation"><a href="{{PRODUCTS_URL}}">{{NAV_PRODUCTS}}</a><a href="{{PRIVACY_URL}}">{{NAV_PRIVACY}}</a><a href="{{EULA_URL}}">{{NAV_EULA}}</a><a href="{{CONTACT_URL}}">{{NAV_CONTACT}}</a></nav>
      <div class="locale-switcher"><span>{{NAV_LANGUAGE}}</span><ul>{{LANGUAGE_LINKS}}</ul></div>
    </div>
    <div class="wrap copyright">&copy; <span data-current-year></span> {{FOOTER_RIGHTS}}</div>
  </footer>
  <script src="/site.js?v=20260805-foundation"></script>
</body>
</html>
