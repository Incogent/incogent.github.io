import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { BLACKBIRD_REGIONS, BLACKBIRD_TIERS, formatPrice, validatePricingCatalog } from './blackbird-pricing.mjs';
import { renderPricing } from './render-pricing.mjs';

// Independent approved handoff fixture, Indie / Studio / Enterprise order.
const approved = {
  US: ['USD', [59,249,499], 'sales_added', ['fZu6oI1AK8jf9VvfVj6Ri06','bJefZicfo8jfd7H24t6Ri0c','9B6eVeenwarnebLgZn6Ri0i']],
  CA: ['CAD', [79,349,699], 'added', ['eVqcN61AKczv4Bb24t6Ri07','aFafZicfo2YV1oZ4cB6Ri0d','5kQ8wQenw6b7ffP9wV6Ri0j']],
  EUROZONE: ['EUR', [59,249,499], 'vat_included', ['bJeeVegvE7fbd7H4cB6Ri08','fZuaEYfrAczv9Vv10p6Ri0e','aFaaEY0wGbvrffP38x6Ri0k']],
  GB: ['GBP', [49,199,399], 'vat_included', ['14AaEYbbk7fbaZzgZn6Ri09','00w14ocfo9nj3x724t6Ri0f','28E9AUdjs42Zd7HeRf6Ri0l']],
  AU: ['AUD', [99,399,799], 'gst_included', ['cNi14ogvE7fb9Vv7oN6Ri0a','5kQ3cw2EOarnc3DgZn6Ri0g','6oUdRa6V4arnc3D5gF6Ri0m']],
  DEFAULT: ['USD', [59,249,499], 'included', ['fZu6oI6V4fLH9VveRf6Ri0b','00w00k93cgPLaZzfVj6Ri0h','dRm5kE0wGdDzebLaAZ6Ri0n']],
};
const template = fs.readFileSync(new URL('../templates/blackbird-pricing.tpl', import.meta.url), 'utf8');
const displayed = {
  US: ['$59', '$249', '$499'],
  CA: ['$79', '$349', '$699'],
  EUROZONE: ['€59', '€249', '€499'],
  GB: ['£49', '£199', '£399'],
  AU: ['$99', '$399', '$799'],
  DEFAULT: ['$59', '$249', '$499'],
};

test('all 18 catalog mappings match the approved regional amounts, currency, tax behavior and exact live URL', () => {
  validatePricingCatalog();
  assert.deepEqual(Object.keys(BLACKBIRD_REGIONS), Object.keys(approved));
  for (const [region, [currency, amounts, tax, ids]] of Object.entries(approved)) {
    assert.deepEqual(BLACKBIRD_REGIONS[region], {currency, amounts, tax, urls: ids.map(id => `https://buy.stripe.com/${id}`)});
    for (const [index, tier] of BLACKBIRD_TIERS.entries()) assert.equal(formatPrice(region,tier), displayed[region][index]);
  }
});

test('US and DEFAULT are separate USD offers with distinct tax behavior and URLs', () => {
  assert.equal(formatPrice('US','indie'), formatPrice('DEFAULT','indie'));
  assert.notEqual(BLACKBIRD_REGIONS.US.tax, BLACKBIRD_REGIONS.DEFAULT.tax);
  BLACKBIRD_TIERS.forEach((_,index) => assert.notEqual(BLACKBIRD_REGIONS.US.urls[index], BLACKBIRD_REGIONS.DEFAULT.urls[index]));
});

test('catalog guard rejects sandbox, duplicate, missing and non-Stripe checkout mappings', () => {
  for(const url of ['https://buy.stripe.com/test_guard', 'https://buy.stripe.com/TEST_guard', BLACKBIRD_REGIONS.CA.urls[0], 'https://example.com/checkout']) {
    const altered=structuredClone(BLACKBIRD_REGIONS);
    altered.US.urls[0]=url;
    assert.throws(()=>validatePricingCatalog(altered),/Invalid, sandbox or duplicate/);
  }
  const altered=structuredClone(BLACKBIRD_REGIONS);
  altered.DEFAULT.urls.pop();
  assert.throws(()=>validatePricingCatalog(altered),/Incomplete pricing/);
});

test('paused output exposes all regional prices with inclusive DEFAULT and no checkout URLs or controls', () => {
  const html = renderPricing(template, key=>key, {purchasingEnabled:false});
  assert.ok(!html.includes('https://buy.stripe.com/'));
  assert.ok(!/data-checkout-|data-tier-checkout|class="button/.test(html));
  assert.match(html, /value="DEFAULT"[^>]* selected/);
  assert.match(html, /data-pricing-tax[^>]*>pricing.tax.included</);
  assert.ok(html.includes('blackbird_shop.checkout.disabled'));
  for (const [region, [currency]] of Object.entries(approved)) {
    const option = html.match(new RegExp(`<option value="${region}"[^>]*>`))[0];
    BLACKBIRD_TIERS.forEach((tier,index)=>assert.ok(option.includes(`data-price-${tier}="${displayed[region][index]}"`)));
    assert.ok(html.includes(`(${currency})</option>`), 'Currency stays explicit in the region selector');
  }
});

test('authorized render path wires all 18 live URLs and starts with the three inclusive DEFAULT links', () => {
  const html = renderPricing(template, key=>key, {purchasingEnabled:true});
  for(const [region, [,,tax,ids]] of Object.entries(approved)) {
    const option=html.match(new RegExp(`<option value="${region}"[^>]*>`))[0];
    assert.ok(option.includes(`data-tax="pricing.tax.${tax}"`));
    BLACKBIRD_TIERS.forEach((tier,index)=>assert.ok(option.includes(`data-checkout-${tier}="https://buy.stripe.com/${ids[index]}"`)));
  }
  BLACKBIRD_TIERS.forEach((tier,index)=>assert.ok(html.includes(`data-tier-checkout="${tier}" href="${BLACKBIRD_REGIONS.DEFAULT.urls[index]}"`)));
  assert.ok(!html.includes('blackbird_shop.checkout.disabled'));
  assert.ok(!/https:\/\/buy\.stripe\.com\/test_/.test(html));
});

test('localized price and region copy is escaped before entering attributes', () => {
  const html=renderPricing(template, ()=>'"<&>', {purchasingEnabled:true});
  assert.match(html,/data-tax="&quot;&lt;&amp;&gt;"/);
});

test('local authoritative handoff and catalog still match when the Blackbird checkout is available', t => {
  const source = new URL('../../Blackbird/LicenseServer/blackbird-license-api/COMMERCE.md', import.meta.url);
  const catalog = new URL('../../Blackbird/Docs/LicenseOperations.md', import.meta.url);
  if (!fs.existsSync(source) || !fs.existsSync(catalog)) return t.skip('Blackbird references not present; approved fixture checks remain active');
  const handoff=fs.readFileSync(source,'utf8').split('### Production preparation and website handoff')[1].split('### Reviewable deployment sequence')[0];
  const offers=fs.readFileSync(catalog,'utf8').split('## Paid license offers')[1].split('## Issuer Key')[0];
  for(const [region,[currency,amounts,,ids]] of Object.entries(approved)) {
    const linkRow=handoff.split('\n').find(line=>line.startsWith(`| ${region} |`));
    assert.deepEqual([...linkRow.matchAll(/https:\/\/buy\.stripe\.com\/([a-zA-Z0-9]+)/g)].map(match=>match[1]),ids);
    const priceRow=offers.split('\n').find(line=>line.startsWith(`| ${region} |`));
    assert.deepEqual(priceRow.split('|').slice(1,6).map(cell=>cell.trim()),[region,currency,...amounts.map(String)]);
  }
});
