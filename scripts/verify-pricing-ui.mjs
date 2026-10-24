// Run with Playwright installed, or PLAYWRIGHT_PACKAGE_ROOT pointing to its package root.
// Local-only browser checks: external requests are blocked, including all Stripe URLs.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';
import { BLACKBIRD_REGIONS, BLACKBIRD_TIERS, formatPrice } from './blackbird-pricing.mjs';
import { renderPricing, renderRegionMenu } from './render-pricing.mjs';

const require = createRequire(path.resolve(process.env.PLAYWRIGHT_PACKAGE_ROOT || '.', 'package.json'));
const { chromium } = require('playwright');
const root = process.cwd();
const screenshots = process.env.PRICING_SCREENSHOT_DIR;
if (screenshots) fs.mkdirSync(screenshots, {recursive:true});
const template = fs.readFileSync('templates/blackbird-pricing.tpl','utf8');
// An in-memory enabled preview exercises real render/switch code without changing
// the committed false sales gate, generated pages, Stripe state or production.
const menuTemplate=fs.readFileSync('templates/region-menu.tpl','utf8');
const enabled = (renderRegionMenu(menuTemplate,key=>key.split('.').at(-1),{purchasingEnabled:true}) + renderPricing(template, key=>key.split('.').at(-1), {purchasingEnabled:true}))
  .replace(/{{t:([a-z._]+)}}/gi, (_match,key)=>key.split('.').at(-1));
const preview = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/site.css"></head><body><header>${enabled.slice(0,enabled.indexOf('<div class="wrap pricing-options"'))}</header>${enabled.slice(enabled.indexOf('<div class="wrap pricing-options"'))}<script src="/site.js"></script></body></html>`;
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
async function chooseRegion(page,region){
  const menu=page.locator('[data-region-menu]');
  if(!await menu.evaluate(el=>el.open))await menu.locator('summary').click();
  if(region==='DEFAULT'){
    await page.locator('[data-region-auto]').click();
    await page.waitForFunction(()=>document.querySelector('[data-region-menu]').dataset.source!=='detecting');
    await page.keyboard.press('Escape');
  }else await page.selectOption('[data-purchase-region]',region);
}
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
        await chooseRegion(page,region);
        assert.deepEqual(await page.locator('[data-tier-price]').allTextContents(),BLACKBIRD_TIERS.map(tier=>formatPrice(region,tier)));
        assert.equal(await page.locator('[data-pricing-tax]').innerText(),expectedTax[region]);
        assert.deepEqual(await page.locator('.pricing-threshold').allTextContents(),['Under $200K','$200K–$5M','Over $5M']);
        assert.deepEqual(await page.locator('.pricing-note').allTextContents(),Array(3).fill('Annual gross revenue + cumulative funding (USD)'));
        assert.ok((await page.locator('.pricing-intro').innerText()).includes('all future updates'));
        assert.equal(await page.locator('[data-tier-checkout]').count(),0);
        assert.ok(!(await page.content()).includes('https://buy.stripe.com/'));
        assert.equal(await page.locator('.pricing-availability').innerText(),'Purchasing temporarily unavailable');
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width}/${theme}/${route}/${region} overflow`);
        assert.equal(await page.locator('header [data-region-menu]').count(),1);
        assert.equal(await page.locator('main [data-purchase-region]').count(),0);
        await page.locator('[data-region-summary]').click();
        const panel=await page.locator('.region-panel').boundingBox();
        assert.ok(panel.x>=0&&panel.x+panel.width<=width, 'Header region panel fits viewport');
        if(screenshots&&route==='shop/blackbird'&&region==='US'&&[390,1440].includes(width))await page.screenshot({path:path.join(screenshots,`menu-${width}-${theme}.png`),fullPage:true});
        await page.keyboard.press('Escape');
        const select=page.locator('[data-purchase-region]');
        assert.equal(await select.inputValue(),region==='DEFAULT'?'':region);
        assert.equal(await page.locator('option[value=DEFAULT]').count(),0);
        // Full-page screenshots avoid element-capture artifacts from sticky headers.
        if(screenshots && route==='shop/blackbird' && [390,1440].includes(width)) {
          await page.screenshot({path:path.join(screenshots,`${region}-${width}-${theme}.png`),fullPage:true});
        }
      }
    }
  }
  // An explicit selection survives reload; old currency-only preferences are ignored.
  await chooseRegion(page,'US');
  await page.reload();
  assert.equal(await page.locator('[data-purchase-region]').inputValue(),'US');
  assert.equal(await page.locator('[data-pricing-tax]').innerText(),expectedTax.US);
  for(const stored of [null,'','DEFAULT','USD','UNKNOWN','__proto__']) {
    await page.evaluate(value=>{localStorage.clear();localStorage.setItem('incogent_currency','USD');if(value!==null)localStorage.setItem('incogent_pricing_region',value);},stored);
    await page.goto(`${origin}/en/products/blackbird/?region=US&currency=USD&checkout=true`);
    assert.equal(await page.locator('[data-region-menu]').getAttribute('data-region'),'DEFAULT');
    assert.equal(await page.locator('[data-pricing-tax]').innerText(),expectedTax.DEFAULT);
    assert.equal(await page.locator('[data-tier-checkout]').count(),0);
  }
  await page.evaluate(()=>localStorage.clear());
  await page.goto(`${origin}/checkout-preview`);
  for(const [region,offer] of Object.entries(BLACKBIRD_REGIONS)) {
    await chooseRegion(page,region);
    assert.deepEqual(await page.locator('[data-tier-checkout]').evaluateAll(links=>links.map(a=>a.href)),offer.urls);
    assert.deepEqual(await page.locator('[data-tier-price]').allTextContents(),BLACKBIRD_TIERS.map(tier=>formatPrice(region,tier)));
  }
  // Keyboard selection updates price, wording and the matching links together.
  await chooseRegion(page,'US');
  await page.locator('[data-region-summary]').click();
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
  assert.equal(await blockedPage.locator('[data-region-menu]').getAttribute('data-region'),'DEFAULT');
  await chooseRegion(blockedPage,'CA');
  assert.deepEqual(await blockedPage.locator('[data-tier-price]').allTextContents(),['$79','$349','$699']);
  await blocked.close();
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
  await nojs.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
  const fallback=await nojs.newPage();
  for(const route of ['products/blackbird','shop/blackbird']) {
    await fallback.goto(`${origin}/en/${route}/`);
    assert.deepEqual(await fallback.locator('[data-tier-price]').allTextContents(),['$59','$249','$499']);
    assert.equal(await fallback.locator('[data-pricing-tax]').innerText(),expectedTax.DEFAULT);
    assert.ok(await fallback.locator('[data-region-menu]').isHidden());
    assert.ok(await fallback.locator('noscript').isVisible());
    assert.ok(await fallback.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  }
  await nojs.close();
  // Region-aware automatic detection, not currency inference.
  for(const [region,offer] of Object.entries(BLACKBIRD_REGIONS)) {
    const ctx=await browser.newContext({viewport:{width:390,height:900}});
    await ctx.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());
    await ctx.route('**/api/currency',r=>r.fulfill({json:{region,currency:offer.currency}}));
    const p=await ctx.newPage();
    await p.goto(`${origin}/en/products/blackbird/`);
    await p.waitForFunction(()=>document.querySelector('[data-region-menu]').dataset.source==='auto');
    assert.equal(await p.locator('[data-region-menu]').getAttribute('data-region'),region);
    assert.deepEqual(await p.locator('[data-tier-price]').allTextContents(),BLACKBIRD_TIERS.map(tier=>formatPrice(region,tier)));
    assert.equal(await p.locator('[data-pricing-tax]').innerText(),expectedTax[region]);
    assert.equal(await p.evaluate(()=>localStorage.getItem('incogent_pricing_region')),null,'Automatic hints are not saved as overrides');
    await ctx.close();
  }
  for(const failure of ['legacy','empty','unknown','malformed','http','timeout']) {
    const ctx=await browser.newContext();
    await ctx.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());
    await ctx.route('**/api/currency',async r=>{
      if(failure==='timeout')return;
      if(failure==='http')return r.fulfill({status:503,body:'Unavailable'});
      if(failure==='malformed')return r.fulfill({body:'not JSON'});
      return r.fulfill({json:failure==='legacy'?{currency:'USD'}:{region:failure==='empty'?'':'UNKNOWN',currency:'USD'}});
    });
    const p=await ctx.newPage();
    await p.goto(`${origin}/en/products/blackbird/`);
    await p.waitForFunction(()=>document.querySelector('[data-region-menu]').dataset.source==='fallback');
    assert.equal(await p.locator('[data-region-menu]').getAttribute('data-region'),'DEFAULT');
    assert.equal(await p.locator('[data-pricing-tax]').innerText(),expectedTax.DEFAULT);
    await ctx.close();
  }
  const saved=await browser.newContext({viewport:{width:390,height:900}});
  await saved.addInitScript(()=>localStorage.setItem('incogent_pricing_region','US'));
  await saved.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());
  let hintRequests=0;
  await saved.route('**/api/currency',r=>{hintRequests++;return r.fulfill({json:{region:'CA',currency:'CAD'}});});
  const sp=await saved.newPage();
  await sp.goto(`${origin}/en/products/blackbird/`,{waitUntil:'networkidle'});
  assert.equal(hintRequests,0,'A saved manual override suppresses detection');
  assert.equal(await sp.locator('[data-purchase-region]').inputValue(),'US');
  await sp.locator('[data-region-summary]').click();
  await sp.locator('[data-region-auto]').click();
  await sp.waitForFunction(()=>document.querySelector('[data-region-menu]').dataset.region==='CA');
  assert.equal(await sp.evaluate(()=>localStorage.getItem('incogent_pricing_region')),null);
  assert.equal(hintRequests,1);
  // Mutual exclusion and closing behavior on mobile.
  await sp.locator('.mobile-nav summary').click();
  assert.ok(!await sp.locator('[data-region-menu]').evaluate(el=>el.open));
  await sp.locator('[data-region-summary]').click();
  await sp.waitForFunction(()=>!document.querySelector('.mobile-nav').open);
  assert.ok(!await sp.locator('.mobile-nav').evaluate(el=>el.open));
  await sp.mouse.click(5,500);
  assert.ok(!await sp.locator('[data-region-menu]').evaluate(el=>el.open));
  await saved.close();
  const race=await browser.newContext();
  await race.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());
  let finishHint,started;
  const hintStarted=new Promise(resolve=>{started=resolve;});
  await race.route('**/api/currency',async r=>{started();await new Promise(resolve=>{finishHint=resolve;});try{await r.fulfill({json:{region:'US',currency:'USD'}});}catch{}});
  const rp=await race.newPage();
  await rp.goto(`${origin}/en/products/blackbird/`,{waitUntil:'domcontentloaded'});
  await hintStarted;
  await chooseRegion(rp,'GB');
  finishHint();
  await rp.waitForLoadState('networkidle');
  assert.equal(await rp.locator('[data-purchase-region]').inputValue(),'GB','A late automatic response cannot override a manual choice');
  await rp.goto(`${origin}/en/support/`);
  assert.equal(await rp.locator('[data-purchase-region]').inputValue(),'GB','Header preference applies outside pricing pages');
  await race.close();
  console.log('PASS: six-region detection, five manual choices with no DEFAULT option, header menu at 320/390/900/1440px light/dark, all 18 prepared link mappings, auto reset, overrides and late-response races, malformed/HTTP/timeout fallback, saved/invalid/blocked storage, no JavaScript, keyboard and menu dismissal. Purchasing paused; external requests blocked.');
} finally {await browser?.close();await new Promise(resolve=>server.close(resolve));}
