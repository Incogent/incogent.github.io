import fs from 'node:fs';
import path from 'node:path';
const contentPath=new URL('../i18n/docs/en.json',import.meta.url);
const content=JSON.parse(fs.readFileSync(contentPath,'utf8'));
const pages=content.pages;
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const base=locale=>`/${locale}/products/blackbird/docs/`;
const id=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const DOCUMENTATION_PAGES=[{slug:'',title:'Blackbird documentation',description:'Guides for using Blackbird and creating your own Actions.'},...pages].map(p=>({route:'products/blackbird/docs'+(p.slug?'/'+p.slug:''),source:'docs:'+p.slug,titleKey:'page.docs.'+(p.slug.replaceAll('/','.')||'index')+'.title',descriptionKey:'page.docs.'+(p.slug.replaceAll('/','.')||'index')+'.description',bodyClass:'docs-page'}));

function inline(text){
 let result='',at=0;
 const pattern=/`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^\s)]+)\)/g;
 for(const m of text.matchAll(pattern)){
  result+=escape(text.slice(at,m.index));
  if(m[1]!==undefined)result+='<code>'+escape(m[1])+'</code>';
  else if(m[2]!==undefined)result+='<strong>'+escape(m[2])+'</strong>';
  else {if(!/^(https:\/\/|\/|\.\.\/)/.test(m[4]))throw Error('Unsafe link '+m[4]);result+='<a href="'+escape(m[4])+'">'+escape(m[3])+'</a>';}
  at=m.index+m[0].length;
 }
 return result+escape(text.slice(at));
}
function markdown(text){
 const lines=text.split('\n'),out=[];let i=0;
 while(i<lines.length){
  const line=lines[i];if(!line.trim()){i++;continue;}
  if(line.startsWith('```')){const lang=line.slice(3);const code=[];i++;while(i<lines.length&&!lines[i].startsWith('```'))code.push(lines[i++]);if(i===lines.length)throw Error('Unclosed code block');i++;out.push('<pre><code class="language-'+escape(lang)+'">'+escape(code.join('\n'))+'</code></pre>');continue;}
  const h=/^(#{2,3}) (.+)$/.exec(line);if(h){out.push(`<h${h[1].length} id="${id(h[2])}">${inline(h[2])}</h${h[1].length}>`);i++;continue;}
  if(line.startsWith('|')){const rows=[];while(i<lines.length&&lines[i].startsWith('|'))rows.push(lines[i++].split('|').slice(1,-1).map(s=>s.trim()));if(!rows[1]?.every(s=>/^[-:]+$/.test(s)))throw Error('Bad table');out.push('<div class="docs-table" tabindex="0" role="region" aria-label="Reference table"><table><thead><tr>'+rows[0].map(s=>'<th scope="col">'+inline(s)+'</th>').join('')+'</tr></thead><tbody>'+rows.slice(2).map(r=>'<tr>'+r.map(s=>'<td>'+inline(s)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>');continue;}
  if(/^(\d+\. |- )/.test(line)){const tag=line.startsWith('- ')?'ul':'ol',items=[];const regex=tag==='ul'?/^- /:/^\d+\. /;while(i<lines.length&&regex.test(lines[i]))items.push('<li>'+inline(lines[i++].replace(regex,''))+'</li>');out.push('<'+tag+'>'+items.join('')+'</'+tag+'>');continue;}
  const p=[];while(i<lines.length&&lines[i].trim())p.push(lines[i++]);out.push('<p>'+inline(p.join(' '))+'</p>');
 }
 return out.join('\n');
}
function groups(){return [...new Set(pages.map(p=>p.group))];}
function nav(slug,locale){return '<nav class="docs-nav" aria-label="Documentation"><a class="docs-overview" href="'+base(locale)+'">Documentation overview</a><label for="docs-search">Search documentation</label><input id="docs-search" type="search" placeholder="Search guides and examples" autocomplete="off" data-index="'+base(locale)+'search.json"><p id="docs-search-status" class="docs-search-status" aria-live="polite"></p><div id="docs-search-results"></div><div id="docs-sections">'+groups().map(group=>'<details '+(pages.find(p=>p.slug===slug)?.group===group?'open':'')+'><summary>'+escape(group)+'</summary>'+pages.filter(p=>p.group===group).map(p=>'<a '+(p.slug===slug?'aria-current="page" ':'')+'href="'+base(locale)+p.slug+'/">'+escape(p.title)+'</a>').join('')+'</details>').join('')+'</div></nav>';}
const review='<p class="docs-review">Based on '+escape(content.version)+'. Updated '+escape(content.reviewed)+'. Some features may differ from your installed version.</p>';
function media(p){return '<section class="docs-media" aria-labelledby="media-brief"><h2 id="media-brief">Image and video brief</h2><p>'+escape(p.media)+'</p><p class="docs-caption">Production placeholder. Use public builds, synthetic data, readable text, descriptive alt text, and user-controlled playback. No capture has been created for this brief.</p></section>';}
function mediaPlan(locale){return '<details class="docs-media-plan"><summary>Review all image and video briefs</summary><label for="docs-media-search">Filter media briefs</label><input id="docs-media-search" type="search" placeholder="Article or capture details"><div id="docs-media-items">'+pages.map(p=>'<section><h3><a href="'+base(locale)+p.slug+'/#media-brief">'+escape(p.title)+'</a></h3><p>'+escape(p.media)+'</p></section>').join('')+'</div></details>';}
export function renderDocumentation(slug,locale){
 if(locale!=='en')throw Error('Documentation translation required for '+locale);
 const p=pages.find(p=>p.slug===slug);
 if(slug&&!p)throw Error('Unknown documentation page '+slug);
 const headings=p?[...p.body.matchAll(/^## (.+)$/gm)].map(m=>m[1]):groups();
 const toc='<details class="docs-toc" open><summary>On this page</summary>'+headings.map(h=>'<a href="#'+id(h)+'">'+escape(h)+'</a>').join('')+(p?'<a href="#media-brief">Image and video brief</a>':'')+'</details>';
 const body=p?'<p class="docs-breadcrumb"><a href="'+base(locale)+'">Documentation</a> / '+escape(p.group)+'</p><h1>'+escape(p.title)+'</h1><p class="lede">'+escape(p.description)+'</p>'+review+markdown(p.body)+media(p)+'<section class="docs-related"><h2>Related guides</h2><ul>'+p.related.map(slug=>{const r=pages.find(p=>p.slug===slug);if(!r)throw Error('Unknown related page '+slug);return '<li><a href="'+base(locale)+r.slug+'/">'+escape(r.title)+'</a></li>';}).join('')+'</ul></section>':
 '<p class="docs-breadcrumb"><a href="/'+locale+'/products/blackbird/">Blackbird</a> / Documentation</p><h1>Blackbird documentation</h1><p class="lede">Using Blackbird, solving problems, and creating your own Actions.</p>'+review+groups().map(group=>'<section><h2 id="'+id(group)+'">'+escape(group)+'</h2><ul class="docs-guide-list">'+pages.filter(p=>p.group===group).map(p=>'<li><a href="'+base(locale)+p.slug+'/">'+escape(p.title)+'</a><p>'+escape(p.description)+'</p></li>').join('')+'</ul></section>').join('');
 return '<div class="wrap docs-layout">'+nav(slug,locale)+'<article class="docs-article">'+body+(p?'':mediaPlan(locale))+'</article>'+toc+'</div><script src="/assets/blackbird/docs/Documentation.js?v=20260922-full" defer></script>';
}
export function writeDocumentationSearch(){
 const target=new URL('../en/products/blackbird/docs/search.json',import.meta.url);
 fs.mkdirSync(path.dirname(target.pathname.replace(/^\/(\w:)/,'$1')),{recursive:true});
 fs.writeFileSync(target,JSON.stringify(pages.map(p=>({title:p.title,url:base('en')+p.slug+'/',group:p.group,text:p.description+' '+p.body}))), 'utf8');
}
