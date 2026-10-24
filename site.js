const THEME_KEY="incogent_theme";
// Only explicit region choices are saved. Currency cannot distinguish US from
// DEFAULT USD; a missing/invalid preference always uses tax-inclusive DEFAULT.
function initRegionalPricing(){
  const pricing=document.querySelector('[data-regional-pricing]');
  if(!pricing)return;
  const select=pricing.querySelector('[data-purchase-region]');
  const tax=pricing.querySelector('[data-pricing-tax]');
  const key='incogent_pricing_region';
  const apply=(region)=>{
    const option=Array.from(select.options).find(item=>item.value===region);
    if(!option)return false;
    select.value=region;
    for(const amount of pricing.querySelectorAll('[data-tier-price]')){
      amount.textContent=option.getAttribute(`data-price-${amount.dataset.tierPrice}`);
    }
    tax.textContent=option.dataset.tax;
    for(const buy of pricing.querySelectorAll('[data-tier-checkout]')){
      buy.href=option.getAttribute(`data-checkout-${buy.dataset.tierCheckout}`);
    }
    return true;
  };
  // Explicitly reset browser-restored form state before applying our region key.
  apply('DEFAULT');
  try{apply(localStorage.getItem(key));}catch(_error){}
  select.addEventListener('change',()=>{
    if(!apply(select.value))apply('DEFAULT');
    try{localStorage.setItem(key,select.value);}catch(_error){}
  });
  pricing.querySelector('[data-region-control]').hidden=false;
}
initRegionalPricing();

const themeButtons=Array.from(document.querySelectorAll("[data-theme-toggle]"));
let turnstileLoadAttempts=0;

function currentTheme(){
  const selectedTheme=document.documentElement.getAttribute("data-theme");
  if(selectedTheme==="dark"||selectedTheme==="light")return selectedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
}

function renderTurnstileWidgets(force=false){
  const widgets=Array.from(document.querySelectorAll(".cf-turnstile"));
  if(!widgets.length)return;
  if(!window.turnstile||typeof window.turnstile.render!=="function"){
    if(turnstileLoadAttempts>=40)return;
    turnstileLoadAttempts+=1;
    window.setTimeout(()=>renderTurnstileWidgets(force),250);
    return;
  }

  const theme=currentTheme();
  widgets.forEach((widget)=>{
    const sitekey=widget.dataset.sitekey;
    if(!sitekey)return;
    const widgetId=widget.dataset.widgetId;
    if(!force&&widget.dataset.renderedTheme===theme&&widgetId)return;
    if(widgetId&&typeof window.turnstile.remove==="function"){
      try{window.turnstile.remove(widgetId);}catch(_error){}
    }
    widget.innerHTML="";
    try{
      const nextId=window.turnstile.render(widget,{sitekey,theme});
      widget.dataset.widgetId=String(nextId);
      widget.dataset.renderedTheme=theme;
    }catch(_error){}
  });
}

window.onTurnstileLoad=()=>{
  turnstileLoadAttempts=0;
  renderTurnstileWidgets(true);
};

function applyTheme(theme,persist=false){
  const finalTheme=theme==="dark"?"dark":"light";
  document.documentElement.setAttribute("data-theme",finalTheme);
  if(persist){
    try{localStorage.setItem(THEME_KEY,finalTheme);}catch(_error){}
  }
  themeButtons.forEach((button)=>{
    const isDark=finalTheme==="dark";
    const label=isDark?button.dataset.lightLabel:button.dataset.darkLabel;
    button.textContent=isDark?"\u2600":"\u263e";
    button.setAttribute("aria-pressed",String(isDark));
    button.setAttribute("aria-label",label);
    button.setAttribute("title",label);
    button.classList.toggle("is-dark",isDark);
  });

  document.querySelectorAll("iframe[data-discord-widget]").forEach((widget)=>{
    const guild=widget.dataset.discordGuild;
    if(!guild)return;
    const nextSrc=`https://discord.com/widget?id=${encodeURIComponent(guild)}&theme=${finalTheme}`;
    if(widget.src!==nextSrc)widget.src=nextSrc;
  });
  renderTurnstileWidgets();
}

themeButtons.forEach((button)=>{
  button.addEventListener("click",()=>applyTheme(currentTheme()==="dark"?"light":"dark",true));
});

applyTheme(currentTheme());
document.querySelectorAll("[data-current-year]").forEach((element)=>{element.textContent=String(new Date().getFullYear());});

const supportForm=document.getElementById("support-form");
const formStatus=document.getElementById("form-status");

function setFormStatus(message,state="neutral"){
  if(!formStatus)return;
  formStatus.textContent=message;
  formStatus.classList.toggle("is-error",state==="error");
  formStatus.classList.toggle("is-success",state==="success");
}

if(supportForm){
  supportForm.addEventListener("submit",async(event)=>{
    event.preventDefault();
    setFormStatus("");
    if(!supportForm.reportValidity())return;

    const honey=supportForm.querySelector('[name="website"]');
    if(honey?.value.trim())return;

    const action=supportForm.action;

    const turnstileResponse=supportForm.querySelector('[name="cf-turnstile-response"]');
    if(!turnstileResponse?.value.trim()){
      setFormStatus(supportForm.dataset.statusVerification,"error");
      return;
    }

    const submitButton=supportForm.querySelector('[type="submit"]');
    const payload={
      name:supportForm.elements.name.value.trim(),
      email:supportForm.elements.email.value.trim(),
      category:supportForm.elements.category.value,
      message:supportForm.elements.message.value.trim(),
      token:turnstileResponse.value.trim(),
      website:honey?.value.trim()??"",
      page:"contact",
      locale:supportForm.elements.locale.value,
      sourceUrl:window.location.href,
      submittedAt:new Date().toISOString(),
    };

    submitButton.disabled=true;
    setFormStatus(supportForm.dataset.statusSending);
    try{
      const response=await fetch(action,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(payload)});
      if(!response.ok){
        setFormStatus(supportForm.dataset.statusError,"error");
        return;
      }
      supportForm.reset();
      renderTurnstileWidgets(true);
      setFormStatus(supportForm.dataset.statusSuccess,"success");
    }catch(_error){
      setFormStatus(supportForm.dataset.statusError,"error");
    }finally{
      submitButton.disabled=false;
    }
  });
}

// Aggregate product funnel, without cookies, identifiers or raw campaign data.
function initMarketing(){
 if(!document.body.classList.contains('blackbird-page')||navigator.doNotTrack==='1'||window.doNotTrack==='1'||navigator.globalPrivacyControl===true)return;
 const params=new URLSearchParams(location.search),medium=(params.get('utm_medium')||'').toLowerCase();
 const group=value=>/^(cpc|ppc|paid|paid_social|display|retargeting)$/.test(value)?'paid':/^(email|newsletter)$/.test(value)?'email':/^(social|organic_social)$/.test(value)?'social':/^(organic|search)$/.test(value)?'search':null;
 const knownSource=value=>/^(google|bing|duckduckgo|yahoo)$/.test(value)?'search':/^(facebook|instagram|twitter|x|linkedin|reddit|youtube|discord|tiktok)$/.test(value)?'social':null;
 let source=group(medium)||knownSource((params.get('utm_source')||'').toLowerCase());
 if(!source){let host='';try{host=new URL(document.referrer).hostname.replace(/^www\./,'');}catch(_error){}
  source=params.has('utm_source')||params.has('utm_medium')?'other':!host||host===location.hostname.replace(/^www\./,'')?'direct':/(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com|yahoo\.com)$/.test(host)?'search':/(^|\.)(facebook\.com|instagram\.com|twitter\.com|x\.com|linkedin\.com|reddit\.com|youtube\.com|discord\.com|tiktok\.com)$/.test(host)?'social':'other';
 }
 const send=event=>{try{const body=JSON.stringify({event,source});fetch('/api/marketing',{method:'POST',body,credentials:'omit',referrerPolicy:'no-referrer',keepalive:true}).catch(()=>{});}catch(_error){}};
 // Avoid pre-rendered pages being counted before they are visited.
 const view=()=>send('product_view');
 if(document.prerendering)document.addEventListener('prerenderingchange',view,{once:true});else view();
 document.addEventListener('click',event=>{const a=event.target.closest?.('a[href]');if(!a)return;const url=new URL(a.href,location.href);
  if(url.origin===location.origin&&url.pathname.startsWith('/download/blackbird/windows'))send('download_click');
  else if(url.hostname==='buy.stripe.com')send('checkout_click');
 });
}
initMarketing();
