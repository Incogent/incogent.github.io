<div class="wrap pricing-options" data-regional-pricing>
  <h2>{{t:pricing.heading}}</h2>
  <p class="pricing-intro">{{t:pricing.common}}</p>
  <label class="pricing-region" data-region-control hidden>{{t:pricing.region.label}}
    <select data-purchase-region>{{REGION_OPTIONS}}</select>
  </label>
  <p class="pricing-tax" data-pricing-tax aria-live="polite">{{DEFAULT_TAX}}</p>
  <noscript><p class="pricing-fallback">{{t:pricing.no_js}}</p></noscript>
  <div class="pricing-grid">
    <article class="card pricing-tier">
      <h3>{{t:pricing.indie.name}}</h3>
      <dl class="pricing-terms">
        <div><dt>{{t:pricing.permanent}}</dt><dd data-tier-price="indie">{{PRICE_INDIE}}</dd></div>
      </dl>
      <p class="pricing-threshold">{{t:pricing.indie.threshold}}</p>
      <p class="pricing-note">{{t:pricing.thresholds}}</p>
      {{CHECKOUT_INDIE}}
    </article>
    <article class="card pricing-tier">
      <h3>{{t:pricing.studio.name}}</h3>
      <dl class="pricing-terms">
        <div><dt>{{t:pricing.permanent}}</dt><dd data-tier-price="studio">{{PRICE_STUDIO}}</dd></div>
      </dl>
      <p class="pricing-threshold">{{t:pricing.studio.threshold}}</p>
      <p class="pricing-note">{{t:pricing.thresholds}}</p>
      {{CHECKOUT_STUDIO}}
    </article>
    <article class="card pricing-tier">
      <h3>{{t:pricing.enterprise.name}}</h3>
      <dl class="pricing-terms">
        <div><dt>{{t:pricing.permanent}}</dt><dd data-tier-price="enterprise">{{PRICE_ENTERPRISE}}</dd></div>
      </dl>
      <p class="pricing-threshold">{{t:pricing.enterprise.threshold}}</p>
      <p class="pricing-note">{{t:pricing.thresholds}}</p>
      {{CHECKOUT_ENTERPRISE}}
    </article>
  </div>
  {{PRICING_AVAILABILITY}}
  <p class="purchase-terms"><a href="{{url:eula}}">{{t:blackbird_shop.license_terms}}</a></p>
</div>
