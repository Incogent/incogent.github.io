<details class="region-menu" data-region-menu hidden>
  <summary data-region-summary data-label="{{t:pricing.region.label}}" aria-label="{{t:pricing.region.label}}">
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg>
    <span data-region-code>USD</span>
  </summary>
  <div class="region-panel">
    <label>{{t:pricing.region.label}}<select data-purchase-region><option value="" disabled selected hidden>{{t:pricing.region.choose}}</option>{{REGION_OPTIONS}}</select></label>
    {{REGION_FALLBACK}}
    <p data-region-status aria-live="polite" data-auto="{{t:pricing.region.detected}}" data-manual="{{t:pricing.region.manual}}" data-fallback="{{t:pricing.region.fallback}}" data-detecting="{{t:pricing.region.detecting}}">{{t:pricing.region.fallback}}</p>
    <button type="button" data-region-auto>{{t:pricing.region.auto}}</button>
  </div>
</details>
