// Run with Playwright installed, or PLAYWRIGHT_PACKAGE_ROOT pointing to its package root.
// Local-only browser checks: external requests are blocked, including all Stripe URLs.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';
import { BLACKBIRD_REGIONS, BLACKBIRD_TIERS, formatPrice } from './blackbird-pricing.mjs';
import { renderPricing } from './render-pricing.mjs';

const require = createRequire(path.resolve(process.env.PLAYWRIGHT_PACKAGE_ROOT || '.', 'package.json'));
const { chromium } = require('playwright');
const root = process.cwd();
const screenshots = process.env.PRICING_SCREENSHOT_DIR;
if (screenshots) fs.mkdirSync(screenshots, {recursive:true});
const template = fs.readFileSync('templates/blackbird-pricing.tpl','utf8');
// An in-memory enabled preview exercises real render/switch code without changing
// the committed false sales gate, generated pages, Stripe state or production.
const enabled = renderPricing(template, key=>key.split('.').at(-1), {purchasingEnabled:true})
  .replace(/{{t:([a-z._]+)}}/gi, (_match,key)=>key.split('.').at(-1));
const preview = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/site.css"></head><body>${enabled}<script src="/site.js"></script></body></html>`;
const types = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.svg':'image/svg+xml'};
const server = http.createServer((req,res)=>{
  const url = new URL(req.url,'http://localhost');
  if(url.pathname==='/checkout-preview') {res.writeHead(200,{'content-type':'text/html'});res.end(preview);return;}
  const name=path.resolve(root,'.'+decodeURIComponent(url.pathname));
  if(!name.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  const target=url.pathname.endsWith('/')?path.join(name,'index.html'):name;
  if(!fs.existsSync(target)||!fs.statSync(target).isFile()){res.writeHead(404);res.end();return;}
  res.writeHead(200,{'content-type':types[path.extname(target)]||'application/octet-stream'});
  fs.createReadStream(target).pipe(res);
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
let browser;
const expectedTax={US:'Applicable sales tax added at checkout.',CA:'Applicable tax added at checkout.',EUROZONE:'Includes applicable VAT.',GB:'Includes applicable VAT.',AU:'Includes applicable GST.',DEFAULT:'Includes applicable tax.'};
try {
  browser=await chromium.launch({channel:process.env.PLAYWRIGHT_BROWSER_CHANNEL||'msedge',headless:true});
  const context=await browser.newContext();
  await context.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
  const page=await context.newPage();
  for(const width of [320,390,900,1440]) for(const theme of ['light','dark']) {
    await page.setViewportSize({width,height:1000});
    await page.emulateMedia({colorScheme:theme});
    for(const route of ['products/blackbird','shop/blackbird']) {
      await page.goto(`${origin}/en/${route}/`,{waitUntil:'networkidle'});
      for(const [region, offer] of Object.entries(BLACKBIRD_REGIONS)) {
        await page.selectOption('[data-purchase-region]',region);
        assert.deepEqual(await page.locator('[data-tier-price]').allTextContents(),BLACKBIRD_TIERS.map(tier=>formatPrice(region,tier)));
        assert.equal(await page.locator('[data-pricing-tax]').innerText(),expectedTax[region]);
        assert.deepEqual(await page.locator('.pricing-threshold').allTextContents(),['Under $200K','$200K–$5M','Over $5M']);
        assert.deepEqual(await page.locator('.pricing-note').allTextContents(),Array(3).fill('Annual gross revenue + cumulative funding (USD)'));
        assert.ok((await page.locator('.pricing-intro').innerText()).includes('all future updates'));
        assert.equal(await page.locator('[data-tier-checkout]').count(),0);
        assert.ok(!(await page.content()).includes('https://buy.stripe.com/'));
        assert.equal(await page.locator('.pricing-availability').innerText(),'Purchasing temporarily unavailable');
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width}/${theme}/${route}/${region} overflow`);
        const select=page.locator('[data-purchase-region]');
        assert.equal(await select.inputValue(),region);
        // Full-page screenshots avoid element-capture artifacts from sticky headers.
        if(screenshots && route==='shop/blackbird' && [390,1440].includes(width)) {
          await page.screenshot({path:path.join(screenshots,`${region}-${width}-${theme}.png`),fullPage:true});
        }
      }
    }
  }
  // An explicit selection survives reload; old currency-only preferences are ignored.
  await page.selectOption('[data-purchase-region]','US');
  await page.reload();
  assert.equal(await page.locator('[data-purchase-region]').inputValue(),'US');
  assert.equal(await page.locator('[data-pricing-tax]').innerText(),expectedTax.US);
  for(const stored of [null,'USD','UNKNOWN','__proto__']) {
    await page.evaluate(value=>{localStorage.clear();localStorage.setItem('incogent_currency','USD');if(value!==null)localStorage.setItem('incogent_pricing_region',value);},stored);
    await page.goto(`${origin}/en/products/blackbird/?region=US&currency=USD&checkout=true`);
    assert.equal(await page.locator('[data-purchase-region]').inputValue(),'DEFAULT');
    assert.equal(await page.locator('[data-pricing-tax]').innerText(),expectedTax.DEFAULT);
    assert.equal(await page.locator('[data-tier-checkout]').count(),0);
  }
  await page.evaluate(()=>localStorage.clear());
  await page.goto(`${origin}/checkout-preview`);
  for(const [region,offer] of Object.entries(BLACKBIRD_REGIONS)) {
    await page.selectOption('[data-purchase-region]',region);
    assert.deepEqual(await page.locator('[data-tier-checkout]').evaluateAll(links=>links.map(a=>a.href)),offer.urls);
    assert.deepEqual(await page.locator('[data-tier-price]').allTextContents(),BLACKBIRD_TIERS.map(tier=>formatPrice(region,tier)));
  }
  // Keyboard selection updates price, wording and the matching links together.
  await page.selectOption('[data-purchase-region]','US');
  await page.locator('[data-purchase-region]').focus();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('[data-purchase-region]').inputValue(),'CA');
  assert.deepEqual(await page.locator('[data-tier-checkout]').evaluateAll(links=>links.map(a=>a.href)),BLACKBIRD_REGIONS.CA.urls);
  for(const route of ['support','shop/blackbird/confirmation']) {
    await page.goto(`${origin}/en/${route}/`);
    const text=await page.locator('main').innerText();
    assert.match(text,/redemption codes/i);
    assert.ok(!/download.{0,20}license|license file|\.bblicense|import license/i.test(text));
  }
  await context.close();
  const blocked=await browser.newContext();
  await blocked.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
  await blocked.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new Error('Storage blocked');}}));
  const blockedPage=await blocked.newPage();
  await blockedPage.goto(`${origin}/en/products/blackbird/`);
  assert.equal(await blockedPage.locator('[data-purchase-region]').inputValue(),'DEFAULT');
  await blockedPage.selectOption('[data-purchase-region]','CA');
  assert.deepEqual(await blockedPage.locator('[data-tier-price]').allTextContents(),['$79','$349','$699']);
  await blocked.close();
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
  await nojs.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
  const fallback=await nojs.newPage();
  for(const route of ['products/blackbird','shop/blackbird']) {
    await fallback.goto(`${origin}/en/${route}/`);
    assert.deepEqual(await fallback.locator('[data-tier-price]').allTextContents(),['$59','$249','$499']);
    assert.equal(await fallback.locator('[data-pricing-tax]').innerText(),expectedTax.DEFAULT);
    assert.ok(await fallback.locator('[data-region-control]').isHidden());
    assert.ok(await fallback.locator('noscript').isVisible());
    assert.ok(await fallback.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  }
  await nojs.close();
  console.log('PASS: six regions / 18 tier mappings; both pricing pages at 320/390/900/1440px light/dark; paused output; authorized in-memory links; keyboard, saved/invalid/blocked storage, legacy USD, URL-parameter and no-JS fallback; confirmation/support redemption-code wording. No external requests permitted.');
} finally {await browser?.close();await new Promise(resolve=>server.close(resolve));}
