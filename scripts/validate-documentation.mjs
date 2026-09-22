import fs from 'node:fs';
import assert from 'node:assert/strict';
import { DOCUMENTATION_PAGES, renderDocumentation } from './documentation.mjs';
const { pages } = JSON.parse(fs.readFileSync(new URL('../i18n/docs/en.json', import.meta.url), 'utf8'));
assert.equal(new Set(pages.map(p => p.slug)).size, pages.length, 'Duplicate article slug');
assert(DOCUMENTATION_PAGES.every(p => p.includeInSitemap !== false && !p.robots?.includes('noindex')), 'Public guides must be discoverable');
assert(renderDocumentation('', 'en').includes('id="docs-media-items"'), 'Keep the public media inventory');
assert(fs.readFileSync('en/products/blackbird/index.html', 'utf8').includes('href="/en/products/blackbird/docs/"'), 'Product page must link to documentation');
for (const page of pages) {
  assert(page.title && page.description && page.group, `Missing metadata: ${page.slug}`);
  assert(page.body.split(/\s+/).length > 100, `Incomplete article: ${page.slug}`);
  assert(page.media.length > 100, `Missing media brief: ${page.slug}`);
  assert(page.related.length > 0, `Missing related guides: ${page.slug}`);
  assert(!/E:\\GitHub|C:\\Users\\Brian|DeveloperPackages/.test(page.body), `Private source reference: ${page.slug}`);
  for (const match of page.body.matchAll(/```json\n([\s\S]*?)\n```/g)) {
    const value = match[1].trim();
    JSON.parse(value.startsWith('"') ? '{' + value + '}' : value);
  }
  const html = renderDocumentation(page.slug, 'en');
  assert(html.includes('id="media-brief"'), `Missing public media placeholder: ${page.slug}`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, new Set(ids).size, `Duplicate anchor: ${page.slug}`);
  assert(fs.existsSync(`en/products/blackbird/docs/${page.slug}/index.html`), `Missing built article: ${page.slug}`);
}
for (const [slug, id] of [['authoring/first-action', 'report-output-directory'], ['authoring/shared-settings', 'count-output-files']]) {
  const body = pages.find(p => p.slug === slug).body;
  const script = /```powershell\n([\s\S]*?)\n```/.exec(body)[1] + '\n';
  assert.equal(fs.readFileSync(`assets/blackbird/docs/examples/${id}/run.ps1`, 'utf8').replaceAll('\r\n', '\n'), script, 'Download differs from tutorial');
  const manifest = JSON.parse(fs.readFileSync(`assets/blackbird/docs/examples/${id}/package.json`, 'utf8'));
  assert.equal(manifest.parameters[0].id, 'example.outputDirectory');
  assert.equal(manifest.parameters[0].scope, 'project');
}
console.log(`Documentation validation passed: ${pages.length} guides, media briefs, rendered anchors, JSON examples and downloadable scripts.`);
