import fs from "node:fs";
import path from "node:path";
import {
  canonicalUrl,
  CONTACT_FORM_ENDPOINT,
  DOWNLOAD_URLS,
  LOCALES,
  PAGES,
  SITE_URL,
  TURNSTILE_SITE_KEY,
} from "./site-config.mjs";

const root = process.cwd();
const errors = [];
const warnings = [];
const generatedFiles = [];
const expectedSitemapUrls = [];

if (SITE_URL !== "https://www.incogent.io") {
  errors.push(`SITE_URL must use the preferred www host, received ${SITE_URL}`);
}
if (CONTACT_FORM_ENDPOINT !== `${SITE_URL}/api/contact`) {
  errors.push(`Contact endpoint must be ${SITE_URL}/api/contact`);
}
if (!TURNSTILE_SITE_KEY || /replace|placeholder/i.test(TURNSTILE_SITE_KEY)) {
  errors.push("Turnstile site key is not configured");
}

const expectedDownloads = {
  blackbird_windows_exe: `${SITE_URL}/download/blackbird/windows`,
  blackbird_windows_msi: `${SITE_URL}/download/blackbird/windows/prerelease/msi`,
};
for (const [key, expected] of Object.entries(expectedDownloads)) {
  if (DOWNLOAD_URLS[key] !== expected) {
    errors.push(`${key} must use the first-party Worker route ${expected}`);
  }
}

for (const locale of Object.keys(LOCALES)) {
  for (const page of PAGES) {
    const file = path.join(root, locale, page.route, "index.html");
    if (!fs.existsSync(file)) {
      errors.push(`Missing ${relative(file)}`);
      continue;
    }
    generatedFiles.push(file);
    if (page.includeInSitemap !== false) expectedSitemapUrls.push(canonicalUrl(locale, page.route));

    const html = fs.readFileSync(file, "utf8");
    if (/{{[^}]+}}/.test(html)) errors.push(`Unresolved token in ${relative(file)}`);
    if (!html.includes(`href="${canonicalUrl(locale, page.route)}"`)) {
      errors.push(`Missing canonical in ${relative(file)}`);
    }
    if (/REPLACE_WITH|v0\.8\.0-alpha\.15|api\.github\.com\/repos\/Incogent\/Blackbird-Releases/i.test(html)) {
      errors.push(`Forbidden placeholder or obsolete download reference in ${relative(file)}`);
    }
    validateDocumentLinks(file, html);
  }
}

validateRedirect("index.html", "/en/", canonicalUrl("en", ""));
for (const page of PAGES.filter((item) => item.route)) {
  validateRedirect(`${page.route}/index.html`, `/en/${page.route}/`, canonicalUrl("en", page.route));
}

const sitemap = read("sitemap.xml");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (JSON.stringify(sitemapUrls) !== JSON.stringify(expectedSitemapUrls)) {
  errors.push("sitemap.xml does not exactly match the manifest-managed indexable routes");
}
if (sitemap.includes("https://incogent.io/")) {
  errors.push("sitemap.xml contains the non-canonical apex host");
}

const robots = read("robots.txt");
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
  errors.push("robots.txt does not reference the canonical sitemap URL");
}

const siteJs = read("site.js");
if (/BLACKBIRD_RELEASES_API|api\.github\.com\/repos\/Incogent\/Blackbird-Releases/.test(siteJs)) {
  errors.push("site.js still performs client-side GitHub release discovery");
}

const legacyPublishedPages = [
  "cast/index.html",
  "fan-content/index.html",
  "merch/index.html",
  "press-kit/index.html",
  "presskit/index.html",
  "team/index.html",
  "voice-actors/index.html",
  "en/cast/index.html",
  "en/fan-content/index.html",
  "en/fan-content-policy/index.html",
  "en/merch/index.html",
  "en/press-kit/index.html",
  "en/presskit/index.html",
  "en/team/index.html",
];
for (const locale of ["de", "es", "fr", "it", "ja", "ko", "pt-br", "zh-hans", "zh-hant"]) {
  for (const route of [
    "",
    "cast",
    "eula",
    "fan-content-policy",
    "fan-content",
    "merch",
    "press-kit",
    "presskit",
    "privacy",
    "shop",
    "team",
  ]) {
    legacyPublishedPages.push(`${locale}/${route ? `${route}/` : ""}index.html`);
  }
}
const presentLegacyPages = legacyPublishedPages.filter((file) => fs.existsSync(path.join(root, file)));
if (presentLegacyPages.length) {
  errors.push(`${presentLegacyPages.length} forbidden Sushi Ben pages were restored`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
for (const warning of warnings) console.warn(`Warning: ${warning}`);
console.log(
  `Site validation passed: ${generatedFiles.length} generated page(s), ${expectedSitemapUrls.length} sitemap URL(s), internal links and assets checked.`,
);

function validateDocumentLinks(file, html) {
  const documentPath = `/${relative(file).replaceAll("\\", "/")}`;
  const documentUrl = new URL(documentPath, `${SITE_URL}/`);
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  const allIds = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  if (ids.size !== allIds.length) errors.push(`Duplicate id in ${relative(file)}`);
  if (!/<html\s[^>]*lang="[^"]+"/i.test(html)) errors.push(`Missing html lang in ${relative(file)}`);
  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\salt="[^"]*"/i.test(image[0])) errors.push(`Image missing alt text in ${relative(file)}`);
  }
  for (const link of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)) {
    if (!/\srel="[^"]*noopener[^"]*"/i.test(link[0])) {
      errors.push(`New-window link missing rel=noopener in ${relative(file)}`);
    }
  }

  for (const match of html.matchAll(/\s(?:href|src|action)="([^"]+)"/g)) {
    const raw = decodeHtml(match[1]);
    if (!raw || /^(mailto:|tel:|data:|about:)/i.test(raw)) continue;
    let url;
    try {
      url = new URL(raw, documentUrl);
    } catch {
      errors.push(`Invalid URL ${raw} in ${relative(file)}`);
      continue;
    }
    if (url.protocol === "http:") errors.push(`Insecure HTTP URL ${raw} in ${relative(file)}`);
    if (url.origin !== SITE_URL) continue;
    if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/download/")) continue;

    const target = localTarget(url.pathname);
    if (!fs.existsSync(target)) {
      errors.push(`Missing internal target ${url.pathname} linked from ${relative(file)}`);
      continue;
    }
    if (url.hash) {
      const fragment = decodeURIComponent(url.hash.slice(1));
      if (url.pathname === documentUrl.pathname) {
        if (!ids.has(fragment)) errors.push(`Missing fragment #${fragment} in ${relative(file)}`);
      } else if (target.endsWith(".html")) {
        const targetHtml = fs.readFileSync(target, "utf8");
        if (!new RegExp(`\\sid=["']${escapeRegex(fragment)}["']`).test(targetHtml)) {
          errors.push(`Missing fragment #${fragment} at ${url.pathname} linked from ${relative(file)}`);
        }
      }
    }
  }
}

function validateRedirect(file, destination, canonical) {
  const html = read(file);
  if (!html.includes(`content="0;url=${destination}"`)) errors.push(`${file} has the wrong redirect target`);
  if (!html.includes(`href="${canonical}"`)) errors.push(`${file} has the wrong canonical URL`);
}

function localTarget(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return path.join(root, "__invalid_url_encoding__");
  }
  const relativePath = decoded.replace(/^\/+/, "");
  const candidate = path.join(root, relativePath);
  if (path.extname(candidate)) return candidate;
  return path.join(candidate, "index.html");
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function relative(file) {
  return path.relative(root, file);
}

function decodeHtml(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'");
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
