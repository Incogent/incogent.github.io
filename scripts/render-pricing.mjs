import {
  BLACKBIRD_PURCHASING_ENABLED, BLACKBIRD_REGIONS, BLACKBIRD_TIERS,
  formatPrice, validatePricingCatalog,
} from './blackbird-pricing.mjs';

const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');

export function renderRegionMenu(template, t, { purchasingEnabled = BLACKBIRD_PURCHASING_ENABLED } = {}) {
  validatePricingCatalog();
  let fallback = '';
  const options = Object.entries(BLACKBIRD_REGIONS).map(([region, offer]) => {
    const data = BLACKBIRD_TIERS.map((tier, index) =>
      `data-price-${tier}="${formatPrice(region, tier)}"` +
      (purchasingEnabled ? ` data-checkout-${tier}="${offer.urls[index]}"` : '')).join(' ');
    const attributes = `data-currency="${offer.currency}" data-tax="${escapeHtml(t(`pricing.tax.${offer.tax}`))}" ${data}`;
    const label = `${escapeHtml(t(`pricing.region.${region.toLowerCase()}`))} (${offer.currency})`;
    if (region === 'DEFAULT') {
      fallback = `<span data-region-fallback hidden ${attributes}>${label}</span>`;
      return '';
    }
    return `<option value="${region}" ${attributes}>${label}</option>`;
  }).join('\n');
  return template.replace('{{REGION_OPTIONS}}', options)
    .replace('{{REGION_FALLBACK}}', fallback)
    .replace(/{{t:([a-z0-9._-]+)}}/gi,(_match,key)=>escapeHtml(t(key)));
}

export function renderPricing(template, t, { purchasingEnabled = BLACKBIRD_PURCHASING_ENABLED } = {}) {
  validatePricingCatalog();
  let html = template.replace('{{DEFAULT_TAX}}', escapeHtml(t('pricing.tax.included')));
  for (const [index, tier] of BLACKBIRD_TIERS.entries()) {
    const checkout = purchasingEnabled
      ? `<a class="button primary" data-tier-checkout="${tier}" href="${BLACKBIRD_REGIONS.DEFAULT.urls[index]}">${escapeHtml(t(`pricing.buy.${tier}`))}</a>`
      : '';
    html = html.replace(`{{PRICE_${tier.toUpperCase()}}}`, formatPrice('DEFAULT', tier))
      .replace(`{{CHECKOUT_${tier.toUpperCase()}}}`, checkout);
  }
  return html.replace('{{PRICING_AVAILABILITY}}', purchasingEnabled ? ''
    : `<p class="pricing-availability">${escapeHtml(t('blackbird_shop.checkout.disabled'))}</p>`)
    .replace(/[ \t]+$/gm, '');
}
