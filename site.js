const THEME_KEY="incogent_theme";
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
    if(action.toLowerCase().includes("replace_with_your_worker")){
      setFormStatus(supportForm.dataset.statusUnconfigured,"error");
      return;
    }

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

const BLACKBIRD_RELEASES_API="https://api.github.com/repos/Incogent/Blackbird-Releases/releases?per_page=100";
const BLACKBIRD_DOWNLOAD_CACHE_KEY="incogent_blackbird_downloads";
const BLACKBIRD_DOWNLOAD_CACHE_TTL=5*60*1000;

function applyBlackbirdDownloads(downloads){
  document.querySelectorAll('[data-blackbird-download="exe"]').forEach((link)=>link.href=downloads.exe);
  document.querySelectorAll('[data-blackbird-download="msi"]').forEach((link)=>link.href=downloads.msi);
}

function validBlackbirdAssetUrl(url){
  return typeof url==="string"&&(
    url.startsWith("https://github.com/Incogent/Blackbird-Releases/releases/download/")||
    url.startsWith("https://github.com/Incogent/Blackbird-Releases/releases/latest/download/")
  );
}

async function resolveBlackbirdDownloads(){
  if(!document.querySelector("[data-blackbird-download]"))return;

  try{
    const cached=JSON.parse(localStorage.getItem(BLACKBIRD_DOWNLOAD_CACHE_KEY));
    if(Date.now()-cached.savedAt<BLACKBIRD_DOWNLOAD_CACHE_TTL&&validBlackbirdAssetUrl(cached.exe)&&validBlackbirdAssetUrl(cached.msi)){
      applyBlackbirdDownloads(cached);
      return;
    }
  }catch(_error){}

  try{
    const response=await fetch(BLACKBIRD_RELEASES_API,{headers:{Accept:"application/vnd.github+json"}});
    if(!response.ok)return;
    const releases=(await response.json())
      .filter((release)=>!release.draft&&release.published_at)
      .sort((left,right)=>Date.parse(right.published_at)-Date.parse(left.published_at));
    const stableRelease=releases.find((release)=>!release.prerelease);
    const release=stableRelease??releases[0];
    if(!release)return;

    const exeAsset=release.assets?.find((asset)=>asset.name==="BlackbirdSetup.exe");
    const msiAsset=release.assets?.find((asset)=>asset.name==="Incogent.Blackbird-win.msi");
    if(!exeAsset||!msiAsset)return;

    const downloads=stableRelease?{
      exe:"https://github.com/Incogent/Blackbird-Releases/releases/latest/download/BlackbirdSetup.exe",
      msi:"https://github.com/Incogent/Blackbird-Releases/releases/latest/download/Incogent.Blackbird-win.msi",
    }:{exe:exeAsset.browser_download_url,msi:msiAsset.browser_download_url};
    if(!validBlackbirdAssetUrl(downloads.exe)||!validBlackbirdAssetUrl(downloads.msi))return;

    applyBlackbirdDownloads(downloads);
    try{localStorage.setItem(BLACKBIRD_DOWNLOAD_CACHE_KEY,JSON.stringify({...downloads,savedAt:Date.now()}));}catch(_error){}
  }catch(_error){}
}

resolveBlackbirdDownloads();
