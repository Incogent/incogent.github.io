// Approved catalog: Blackbird/Docs/LicenseOperations.md, Paid license offers.
// Exact inactive LIVE URLs: blackbird-license-api/COMMERCE.md, website handoff.
// Enabling sales and publishing the website require separate authorization.
export const BLACKBIRD_PURCHASING_ENABLED = false;
export const BLACKBIRD_TIERS = ['indie', 'studio', 'enterprise'];
export const BLACKBIRD_REGIONS = {
  US: {
    currency: 'USD', tax: 'sales_added', amounts: [59, 249, 499],
    urls: ['https://buy.stripe.com/fZu6oI1AK8jf9VvfVj6Ri06', 'https://buy.stripe.com/bJefZicfo8jfd7H24t6Ri0c', 'https://buy.stripe.com/9B6eVeenwarnebLgZn6Ri0i'],
  },
  CA: {
    currency: 'CAD', tax: 'added', amounts: [79, 349, 699],
    urls: ['https://buy.stripe.com/eVqcN61AKczv4Bb24t6Ri07', 'https://buy.stripe.com/aFafZicfo2YV1oZ4cB6Ri0d', 'https://buy.stripe.com/5kQ8wQenw6b7ffP9wV6Ri0j'],
  },
  EUROZONE: {
    currency: 'EUR', tax: 'vat_included', amounts: [59, 249, 499],
    urls: ['https://buy.stripe.com/bJeeVegvE7fbd7H4cB6Ri08', 'https://buy.stripe.com/fZuaEYfrAczv9Vv10p6Ri0e', 'https://buy.stripe.com/aFaaEY0wGbvrffP38x6Ri0k'],
  },
  GB: {
    currency: 'GBP', tax: 'vat_included', amounts: [49, 199, 399],
    urls: ['https://buy.stripe.com/14AaEYbbk7fbaZzgZn6Ri09', 'https://buy.stripe.com/00w14ocfo9nj3x724t6Ri0f', 'https://buy.stripe.com/28E9AUdjs42Zd7HeRf6Ri0l'],
  },
  AU: {
    currency: 'AUD', tax: 'gst_included', amounts: [99, 399, 799],
    urls: ['https://buy.stripe.com/cNi14ogvE7fb9Vv7oN6Ri0a', 'https://buy.stripe.com/5kQ3cw2EOarnc3DgZn6Ri0g', 'https://buy.stripe.com/6oUdRa6V4arnc3D5gF6Ri0m'],
  },
  DEFAULT: {
    currency: 'USD', tax: 'included', amounts: [59, 249, 499],
    urls: ['https://buy.stripe.com/fZu6oI6V4fLH9VveRf6Ri0b', 'https://buy.stripe.com/00w00k93cgPLaZzfVj6Ri0h', 'https://buy.stripe.com/dRm5kE0wGdDzebLaAZ6Ri0n'],
  },
};

export function validatePricingCatalog(regions = BLACKBIRD_REGIONS) {
  const urls = new Set();
  for (const [region, offer] of Object.entries(regions)) {
    if (offer.amounts.length !== 3 || offer.urls.length !== 3) throw new Error(`Incomplete pricing: ${region}`);
    for (const [index, url] of offer.urls.entries()) {
      if (!/^https:\/\/buy\.stripe\.com\/(?!test_)[a-zA-Z0-9]+$/i.test(url) || urls.has(url)) {
        throw new Error(`Invalid, sandbox or duplicate checkout URL: ${region}/${BLACKBIRD_TIERS[index]}`);
      }
      if (!Number.isSafeInteger(offer.amounts[index]) || offer.amounts[index] <= 0) throw new Error(`Invalid price: ${region}`);
      urls.add(url);
    }
  }
  if (urls.size !== 18) throw new Error('Expected 18 regional live checkout URLs');
}

export function formatPrice(region, tier) {
  const offer = BLACKBIRD_REGIONS[region];
  return `${offer.currency} ${offer.amounts[BLACKBIRD_TIERS.indexOf(tier)]}`;
}
