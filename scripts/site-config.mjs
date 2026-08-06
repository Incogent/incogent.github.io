export const SITE_URL = "https://incogent.io";
export const SITE_NAME = "Incogent";
export const DEFAULT_LOCALE = "en";

export const DISCORD_INVITE_URL = "https://discord.gg/AxxpQ8h";
export const DISCORD_GUILD_ID = "367221582009204737";

// Replace these when the Incogent Cloudflare Worker and Turnstile widget are ready.
export const CONTACT_FORM_ENDPOINT = "https://REPLACE_WITH_YOUR_WORKER.workers.dev/";
export const TURNSTILE_SITE_KEY = "0x4AAAAAACysjnCgiwuIZ0kL";

export const DOWNLOAD_URLS = {
  blackbird_windows_exe: "https://github.com/Incogent/Blackbird-Releases/releases/download/v0.8.0-alpha.15/BlackbirdSetup.exe",
  blackbird_windows_msi: "https://github.com/Incogent/Blackbird-Releases/releases/download/v0.8.0-alpha.15/Incogent.Blackbird-win.msi",
};

export const LOCALES = {
  en: { htmlLang: "en", hreflang: "en", ogLocale: "en_US", nativeName: "English" },
};

export const PAGES = [
  { route: "", source: "home", titleKey: "page.home.title", descriptionKey: "page.home.description", bodyClass: "home-page" },
  { route: "products", source: "products", titleKey: "page.products.title", descriptionKey: "page.products.description", bodyClass: "products-page" },
  { route: "products/blackbird", source: "blackbird", titleKey: "page.blackbird.title", descriptionKey: "page.blackbird.description", bodyClass: "blackbird-page" },
  { route: "shop", source: "shop", titleKey: "page.shop.title", descriptionKey: "page.shop.description", bodyClass: "shop-page" },
  { route: "shop/blackbird", source: "blackbird-shop", titleKey: "page.blackbird_shop.title", descriptionKey: "page.blackbird_shop.description", bodyClass: "blackbird-shop-page" },
  { route: "services", source: "services", titleKey: "page.services.title", descriptionKey: "page.services.description", bodyClass: "services-page" },
  { route: "about", source: "about", titleKey: "page.about.title", descriptionKey: "page.about.description", bodyClass: "about-page" },
  { route: "privacy", source: "privacy", titleKey: "page.privacy.title", descriptionKey: "page.privacy.description", bodyClass: "legal-page privacy-page", robots: "noindex,nofollow", includeInSitemap: false },
  { route: "eula", source: "eula", titleKey: "page.eula.title", descriptionKey: "page.eula.description", bodyClass: "legal-page eula-page", robots: "noindex,nofollow", includeInSitemap: false },
];

export function localePath(locale, route = "") {
  const suffix = route ? `${route.replace(/^\/+|\/+$/g, "")}/` : "";
  return `/${locale}/${suffix}`;
}

export function canonicalUrl(locale, route = "") {
  return `${SITE_URL}${localePath(locale, route)}`;
}
