# Incogent Site Completion Plan

Last updated: 2026-10-29

## Editable general license notes (2026-10-29)

- [x] Replaced the reference beside the code with a dedicated Notes column and
  compact edit dialog for grants, purchased licenses and legacy records. Notes are
  also editable in expanded details and purchase-email code results. Save/Cancel
  preserve table filters, paging, selections and row geometry; saves update cached
  details without navigation. Creation now labels its existing reference input Notes.
- [x] Migration 0015 initializes independent notes from existing grant references.
  Notes support multiline text up to 2,000 characters and explicit clearing, while
  original issuance metadata remains unchanged for retries. Independent Access,
  origin/rate/bounds validation and stale-save checks reuse the private service.
- Validation: 165 backend checks, 135 licensing Worker tests and 32 operator tests
  pass. Four Notes and four inventory compiled browser cases pass at 390/1440px,
  direct/navigation entry, covering grant/purchase edits, cancel/clear, lost-result
  retries, stale edits, persistence, database isolation, Notes placement, preserved
  filters/selections, paging/copy/status/details and CSP/no overflow. Screenshots reviewed.
- [x] Applied migration 0015 to both existing databases, retaining all 15 live
  grant references as notes. Deployed reader `c8425dcf-fca3-485a-84db-89e3afd47598`,
  then dashboard `e7e30bb8-9a57-410f-a8f7-9a6638b05243`, preserving settings.
  Published modules match tested artifacts; settings/bindings/secrets/schedules
  match the baseline. Read-only lookup/inventory/filter and Access GET/POST checks
  pass. All 32 existing licenses, 15 claims and grant/commerce/revocation/undo
  records are unchanged. Notes match the original reference digest; no real note
  was edited during validation. Licensing Workers, public purchasing and public
  website are unchanged; no GitHub Actions. Owner signed-in review is supplemental
  and unavailable to the agent.

## Checkbox license operations and inline details (2026-10-28)

- [x] Replaced inventory-row revocation forms with checkboxes, current-page select
  all and a compact Copy codes/Revoke/Undo revocation toolbar. One short count
  confirmation replaces per-code reason/explanation/checkbox forms. Individual
  left-side copy icons remain. Selection clears on successful refresh or page/filter change.
- [x] Details expand in a separate row below the code, load on demand and stay
  cached until that table refreshes. The code row keeps its height; no detail-page
  navigation or extra revocation explanation is shown. Inline support resets retain
  the current table context. Direct code lookup uses compact revoke/undo buttons.
- [x] Batch support validates up to 100 distinct selected records before writes,
  reuses Access/origin/rate-limit protections and existing revocation/undo storage,
  and uses bounded per-environment transactions. Retries retain request identities;
  partial failures are reported. No schema or licensing Worker change is needed.
- Validation: 162 backend checks pass, including a 100-code cross-environment
  batch, validation/auth/origin/rate rejection, duplicates/stale retries, atomic
  per-database failures and unchanged claims/payments. Four compiled batch browser
  cases and four inventory regressions at 390/1440px, direct/navigation entry,
  cover selection, copy/manual fallback, cancel, revoke/undo, lost responses,
  filters/paging, stable row geometry and cached inline details. Success feedback
  uses a fixed notice without moving the table. Screenshots/documentation reviewed.
- [x] Deployed reader `7b948808-9d90-4c5d-87e3-01f1f6f004cb`, then dashboard
  `8cad9cae-3c0d-4e87-991b-e83b2007352c` with preserved settings. Published modules
  match tested artifacts; binding/secret/schedule/preview/compatibility/log settings
  match the baseline. Live read-only inventory/detail/filter and Access GET/POST
  boundaries pass, including the inline endpoint. All 25 licenses, 13 platform
  claims and commerce/grant/revocation/undo records are unchanged. No real support
  actions ran. Licensing Workers/schema, public purchasing and public website
  are unchanged; no GitHub Actions. Owner signed-in visual review is supplemental
  and unavailable to the agent.

## Undo revocation and inventory actions (2026-10-28)

- [x] Implemented confirmed Undo revocation in details and compact revoke/undo
  controls in every inventory row. Actions retain filters, environment, page size
  and cursor so multiple codes can be managed without opening individual details.
- [x] Undo preserves platform claims, expiration, payment holds and offline use.
  Migration 0014 retains undone request identities; old revoke retries cannot
  reinstate them and stale undo cannot clear a later revocation. Existing public
  licensing Worker checks/contracts need no change.
- Validation: all 158 backend checks, 135 licensing Worker tests and 32 operator
  tests pass. Four compiled desktop/mobile direct/navigation browser cases verify
  multi-code table actions, confirmations, lost-response undo retry, restored
  credentials, preserved claims/payment state, CSP/no-store and no page overflow.
  Filtered second-page actions and stale revoke/undo cycles pass isolated tests.
  Screenshots reviewed; documentation validation passes.
- [x] Applied migration 0014 to both databases, then deployed reader
  `f2a989bb-15a3-4778-ae1f-5c3826209e2a` and dashboard
  `e5a2be60-c41d-48fc-8586-407f7908a8a6` with preserved settings. Live verification
  is recorded in backend Docs/DeveloperPortalLicensingDeployment.md. Licensing
  Workers are unchanged; public purchasing stays inactive. No public website
  publication, real code/support mutations or GitHub Actions. Signed-in owner
  smoke testing remains supplemental and unavailable to the agent.

## Dashboard code revocation (2026-10-28)

- [x] Added a confirmed Revoke code action in license details with an optional
  reason, persistent Revoked status and inventory filter. Email purchase results
  distinguish revoked codes from the unchanged purchase/payment status.
- [x] Independent migration 0013 metadata blocks initial redemption, same-attempt
  retries and restoration with existing credentials on Windows and macOS. Signed
  licenses, redemption history, installed offline use, update eligibility and Stripe
  refunds stay unchanged. Repeated submissions preserve the original revocation.
- Validation: 156 backend checks, 135 licensing Worker checks and 32 operator checks
  pass. Four isolated compiled desktop/mobile browser cases cover confirmation,
  lost-response retry, persistence, status/filter, email results, real public-handler
  redemption/restoration denial, authorization, CSP and unchanged license/claim/
  commerce records. Production/sandbox licensing and reader/dashboard dry builds pass.
  Screenshots reviewed; no real records, emails or payment services were changed.
- [x] With explicit owner approval, applied migration 0013 to both existing
  databases; deployed sandbox licensing `9854a7bd-b476-4347-82c0-e2550bbe16ae`,
  live licensing `329b386a-1859-4cad-9066-a3475529a805`, private reader
  `08852518-5aeb-45f0-bbc7-57387b92d075`, then dashboard
  `4425de1c-d297-4eec-aed2-5d348e55ffcf`, preserving settings. Published modules
  match tested artifacts; binding/secret/schedule/preview/compatibility/log settings
  match the baseline. Live read-only inventory/detail and empty Revoked-filter
  checks, Access GET/POST redirects, absent public admin routes and generic public
  contract checks pass. All 25 existing licenses and 13 platform claims, plus
  commerce/grant records, remain unchanged. No code was issued, revoked or redeemed.
  Signed-in owner smoke testing is supplemental and unavailable to the agent.
  See backend Docs/DeveloperPortalLicensingDeployment.md and Blackbird
  Docs/LicenseOperations.md. Public purchasing remains inactive; no public website
  publication, payment/email action or GitHub Actions.

## Cold analytics load and inline date controls (2026-10-28)

- [x] Moved Dates & targets/notifications into each active analytics header beside
  the tabs (or Totals/Info heading). Removed the empty desktop toolbar row; mobile
  navigation and tool transitions preserve the single control group.
- [x] Cold report reads run concurrently; production cache persistence is deferred
  with waitUntil. Bounded reads/cache lookup and private Server-Timing diagnostics
  prevent unbounded source waits. Missing sources remain unknown/incomplete, not
  zero or a successful cached report. Equivalent default URLs share a cache.
- [x] Chart state includes only plotted fields. Operator replay of production data
  dropped report size 456,538 → 158,524 bytes, build 1,022 → 319–500ms. SQL <2ms;
  rendering 14 → 9ms. This read-only replay does not reproduce or prove the owner's
  reported 45-second signed-in transition; timing headers support further diagnosis.
- Validation: 152 backend checks pass for fan-out, timeouts, persistence, auth/cache
  isolation and payload pruning. Compiled analytics/browser checks verify top
  alignment and controls beside tabs; sidebar cases at 390/900/1440px cover the
  reported license/create → analytics path. Preferences, caching, notifications,
  storage/no-JavaScript fallback and documentation validation pass. Screenshots reviewed.
- [x] Deployed analytics `b60887a2-ed6e-4706-8c8a-4d147d848359` with preserved
  settings. Published code matches tested artifacts; Access/public-route checks
  pass and existing data is unchanged. No collection schedule, database/schema,
  reader/licensing Worker, purchasing or public website changes; no Actions.
- Owner-session retry remains supplemental: the exact 45-second delay is not
  reproduced by the operator replay. Private timing headers now distinguish
  remaining auth/cache/source/build delays without adding product-page text.

## Inline license references and analytics header cleanup (2026-10-28)

- [x] Moved references beside larger 16px code fields, with full-value tooltips
  and ellipsis instead of wrapping underneath. Widened the code column and kept
  row height/alignment consistent; small screens scroll the table horizontally.
- [x] Removed the remaining analytics toolbar date strip, shared Daily activity
  range/Releases introduction and explanatory paragraph above date controls.
  Dates remain available in Dates & targets. Updated CSP and report cache scope.
- Validation: 18 affected checks pass. Four compiled inventory desktop/mobile
  cases verify side-by-side references, 16px codes, row alignment and preserved
  filters/copy/details. Analytics and report-preference cases verify removed header
  boilerplate, chart navigation, dates, notifications and private caching.
  Screenshots reviewed; documentation validation passes.
- [x] Deployed analytics `9d591a88-3653-4d6a-be12-da26c94cc126`, preserving
  settings. Published code matches the tested build; Access/public-route checks
  pass and all existing records are unchanged. No reader/licensing Worker/schema
  changes, real issuance/email sends, public website publication or Actions.
  Public purchasing remains inactive. Signed-in owner visual review is unavailable.

## License inventory filters and cleaner layout (2026-10-28)

- [x] Added combined type/redemption filters across the full inventory, including
  expired testers, complimentary grants, unredeemed codes and platform availability.
  Counts and keyset pages share the filters; selections/UTC expiry cutoff persist
  across pages. Clear filters resets paging; legacy unfiltered cursors still work.
- [x] Removed repeated toolbar/table titles, introductory/format paragraphs and
  implementation footer. One Licenses title and compact searches lead into the
  table. Balanced columns, aligned headings/cells, consistent rows and compact
  UTC dates/references replace uneven automatic spacing and nested panel chrome.
- Validation: 147 backend checks pass, including 160-record isolated combined
  filter/count/paging, expiry/cursor and legacy-claim checks. Four compiled inventory
  desktop/mobile/direct/navigation cases pass for combined filters, clear/empty
  results, filtered paging, measured row/column alignment and removed boilerplate.
  Sidebar, grant, purchase support and analytics/browser event regressions pass.
  Screenshots reviewed; documentation validation passes.
- [x] Deployed reader `4094c951-15fa-4c7a-97ba-a8162e117943`, then analytics
  `4db118ad-db41-45f2-9ef9-87bab0e6f791`, preserving settings. Published modules
  match tested builds; Access/public-route checks pass. Eighteen live database
  filter combinations and the 12-record live default verify without writes; all
  existing records are unchanged. Public purchasing stays inactive; no public
  website publication, licensing Worker/schema changes, real issuance/email sends
  or Actions. Supplemental signed-in owner layout/filter review is unavailable.

## Compact live license inventory and expiry display (2026-10-28)

- [x] Complimentary is yellow; Tester remains purple and changes to Expired at its
  saved UTC expiry. Main inventory omits expiration dates/environment column and
  defaults to live codes; explicit sandbox/all filters remain. Dates are in details.
- [x] Platform table statuses use accessible checkmarked/empty/question-mark
  circles. Copy icons sit on the left; fixed floating copy feedback never shifts
  table rows/columns. Removed the code field's yellow focus ring and highlight
  entire rows on hover, focus and click. Bulk/manual copy remain available.
- Validation: 145 backend checks pass, including UTC boundary/permanent/hold cases
  and the live default. All 12 compiled inventory/grant/support desktop/mobile
  cases pass: measured zero layout shift, accessible icons, row highlight, details
  dates, paging, sandbox lookup and existing resend/reset. Screenshots and docs pass.
- [x] Deployed reader `6ebd252e-f8bb-4611-9844-ecf9f98d81c1`, then analytics
  `938cf164-d7e2-4687-88cf-571690d76cf4` with preserved settings. Published
  modules match tested builds; Access/public-route checks pass. Existing records
  are unchanged (20 licenses including three grants, five orders, 13 claims).
  Live default verified against the databases (12 live records). Public purchasing
  remains inactive; no public website publication, licensing Worker/schema change,
  real license writes/email sends or Actions. Supplemental signed-in owner
  copy/status review is unavailable to the agent.

## Grouped sidebar and icon rail (2026-10-28)

- [x] Split private portal navigation into Analytics and Licenses sections, with
  icons, active-page state and accessible labels/tooltips. Moved desktop collapse
  into the sidebar header; collapsed mode retains a 72px icon rail and remembers
  the preference across navigation/reloads. Mobile uses an icon menu with full labels.
- [x] Keyboard/outside-click close, focus return, breakpoint changes, blocked
  storage and no-JavaScript navigation are covered. Report content and licensing
  contracts are unchanged. Updated CSP and private report presentation scope.
- Validation: 144 backend and 28 affected checks pass; compiled sidebar checks pass
  all three landing pages at 390/900/1440px, blocked storage and no JavaScript.
  Existing owner-grant and analytics/chart/tool desktop/mobile flows pass. Reviewed
  expanded, collapsed and mobile screenshots; documentation validation passes.
- [x] Deployed analytics `55f38109-994a-4f29-b27a-39dc47964eaf` with preserved
  settings; published code matches the tested build. Access/public-route checks
  pass and existing license/commerce data is unchanged. Reader/licensing Workers
  and schema are unchanged. Public purchasing remains inactive; no public website
  publication, real license writes/email sends or Actions. Optional signed-in owner
  collapse/rail/reload review remains supplemental; that session is unavailable.

## Compact license copy controls and grant colors (2026-10-28)

- [x] Replaced large per-code buttons with accessible copy icons beside readonly
  code fields. The same controls now appear in inventory and purchase-email tables;
  missing historical codes do not offer copy. Bulk copy remains available.
- [x] Tester uses purple and Complimentary pink in creation, inventory and details,
  distinct from purchase/refund/missing-record and platform colors. Shared styles
  load for direct URLs and dashboard navigation.
- Validation: 144 backend checks and 20 final affected checks pass; compiled
  desktop/mobile browser checks cover side-by-side sizing, clipboard success/manual
  fallback, pagination, grant colors, auth, CSP and overflow with isolated data.
- [x] Deployed analytics `084acf7c-b507-4e7a-8458-51b395a03e87` with preserved
  settings. All 12 compiled browser cases pass across creation, inventory and
  purchase support. Published code matches the tested build; Access/public-route
  checks pass. Digests confirm existing data unchanged (20 licenses including three
  live owner grants, five orders, 13 claims). Private reader/licensing Workers and
  schema are unchanged. No real issuance/email sends, public website publication,
  purchasing activation or GitHub Actions. Optional owner copy/badge check remains
  supplemental; signed-in owner interaction is unavailable to the agent.

## Simple generator and multiple codes (2026-10-28)

- [x] One generation form now has a Tester/Complimentary dropdown, quantity (1–25),
  optional reference and Generate licenses button. Expiration appears only for
  Tester; Complimentary is permanent. Removed free-grant pricing-tier selection
  and labels because those categories do not change features.
- [x] Batches use stable per-position IDs through the existing live issuer. Per-code
  persistence stays atomic; partial results preserve confirmed codes and the same
  request/quantity for recovery. Individual copy and Copy all codes are available.
  Existing single-code/legacy retries remain supported without new schema or
  licensing Worker changes. Legacy tier metadata is compatibility-only.
- Validation: 144 backend checks and compiled direct/navigation desktop/mobile
  browser cases pass. Tested conditional expiration, tier-free complimentary
  batches, persistence/signatures, interrupted batches, lost response/reload recovery,
  copying/fallback, lookup/status, inventory, CSP and overflow in isolated databases.
- [x] Deployed reader `c5d42165-7b3a-441f-873f-51c912f69fd2`, then analytics
  `f6993f8b-a1a5-48ce-8823-c5bc3026d3a9`, preserving settings/secrets/schedules.
  Published modules match tested builds; Access and absent public issuance routes
  pass. Existing data/metadata are unchanged (17 licenses, five orders, 13 claims).
  No real issuance, migration, licensing Worker deployment, public website publish,
  purchasing activation, paid upgrade or GitHub Actions. All five Actions/settings
  remain retained. Owner-session interaction remains supplemental/unavailable.

## Separate license pages and live-only owner issuance (2026-10-27)

- [x] Split License lookup/inventory/support and Create license into separate
  protected pages with distinct URLs/navigation. Creation has no search/table
  controls or environment chooser; success/retry stays on its page and status links
  open the correct lookup record. Both views bypass saved reports.
- [x] New owner grants always use live; server validation rejects sandbox issuance
  and the sandbox generation binding is removed. Old pending sandbox requests are
  not silently converted. Existing sandbox records/redemption remain for purchase
  testing and support lookup; no migration, deletion or licensing Worker change.
- Validation: 143 backend checks and compiled desktop/mobile creation/lookup browser
  cases pass through direct/navigation entry. Actual private RPC writes only the
  isolated live fixture. Auth, cache, retries, copy fallback, preserved lookup,
  paging, scoped status links, CSP and overflow pass. No real code was issued.
- [x] Deployed reader `2c0899ad-5e32-4963-b9de-932fcb8f12db`, then analytics
  `c90ec41e-f0f5-47ce-9447-de2538ef3720`. Published modules match tested artifacts;
  only the sandbox issuance binding was removed, with other settings preserved.
  Both pages require Access. Existing data is unchanged: 17 licenses, five purchases
  and 13 claims; inventory/support reads pass with no writes. Evidence is in backend
  `Docs/DeveloperPortalLicensingDeployment.md`. Public purchasing stays inactive,
  public website unpublished by this task, all five licensing Actions/settings retained.

## Owner-issued tester and complimentary licenses (2026-10-27)

- [x] Implemented owner-only generation through existing authenticated private
  licensing tools. Tester defaults to 30 UTC calendar days with editable expiration;
  complimentary Indie/Studio/Enterprise grants have no expiration/version/update
  limits. Optional references and explicit grant metadata distinguish intentional
  grants from missing purchase records. Creation now has a dedicated live-only page.
- [x] Licensing Worker reuses signing, code generation and license storage through
  a private OwnerLicensing entrypoint. Atomic license/metadata persistence and
  request UUIDs preserve the same issuance across duplicates, retries and lost
  responses. Success has code copy/manual-copy fallback; uncertain results retain
  the original request. Inventory/code lookup show grant kind/reference/terms.
- [x] API type-check, 32 operator-tool tests, 130 Worker tests, 142 developer-backend
  tests and final affected navigation/grant checks pass. Actual compiled private
  RPC/browser checks pass at 390/1440px, direct/navigation entry, using isolated D1,
  real migrations and ephemeral signing keys. Cover authorization, expiration,
  permanent tiers, duplicates, persistence, lost-response/reload recovery, copy,
  lookup/status, CSP and overflow. No real records were created or modified.
- [x] User approved the rollout. Applied migration 0012 in both databases, then
  deployed sandbox licensing `eb1c8726-61c4-47b5-99b3-46fa921b9499`, production
  licensing `94636104-3e9e-490a-9474-03b7facafd76`, private reader
  `102041b9-c91e-4e00-a1c8-6e903a6f69b6` and dashboard
  `3a01b670-b084-45a6-bb71-6191b585c7e3`, all with preserved variables/secrets.
  Published modules match validated dry-run artifacts. Existing bindings, schedules
  and preview settings are preserved; named issuance bindings are correct. Access
  redirects and absent public issuance routes pass. Comparison hashes confirm
  every existing license/claim/order/payment/notification/recovery record unchanged.
  Both grant tables are empty, leaving owner smoke testing intact. Inventory and
  purchase/code reads pass live: 17 licenses, five orders and 13 explicit claims.
  Tester/complimentary rows share the purchase-code inventory, labeled by grant kind.
  Backend `Docs/DeveloperPortalLicensingDeployment.md` contains deployment evidence.
- Owner smoke-test instructions are prepared in Blackbird
  `LicenseServer/blackbird-license-api/OWNER-GRANTS.md`. Human observations are
  supplemental; signed-in owner interaction is unavailable to the agent. Public purchasing remains disabled in source; no public website
  was published, GitHub Actions triggered, service upgraded or paid operation used.
- User-deferred: retain all five Blackbird licensing Actions and their settings
  until the website workflow is deployed/verified and removal is separately authorized.

## Direct purchase statuses and remaining orphan cleanup (2026-10-27)

- [x] Replaced No refunds recorded with Purchased, No purchase record with No Record
  and the unknown badge with Unknown, consistently across inventory, purchase-email
  results and code details. Refund/dispute/hold statuses retain their meaning;
  Purchased requires the recorded paid state.
- [x] User authorized deletion of the remaining unredeemed records without any
  purchase. Deleted exactly two live August 5 beta licenses with only legacy
  allocation markers. No global redemption/attempt, Windows/macOS claim, order link
  by ID/reference, hold, purchase date, stored code or on-demand seat existed.
  Latest request supersedes earlier retention of these two allocated-only records.
- Validation: real isolated D1 deletion guards cover redemption, purchase links,
  holds, seats, changed targets/count and legacy allocation. Atomic frozen-ID/count
  deletion rechecked eligibility. Full in-memory read-back verifies retained live
  licenses, all sandbox data and every claim/order/payment/notification/recovery
  record are unchanged. No export or backup created. Remaining: nine redeemed
  live beta licenses plus eight purchase licenses, 17 total.
- [x] All 22 affected licensing checks pass. Deployed analytics
  `f8cc1bd1-3eeb-493b-b19d-ca52124ac8e5` with preserved settings/secrets/cron.
  No schema or reader/commerce deployment was needed. Production read-back and
  live checks are recorded in backend `Docs/DeveloperPortalLicensingDeployment.md`.
- Remaining: no requested implementation work; owner-session interaction remains
  unavailable to the agent.

## Purchase support dashboard (2026-10-27)

- [x] Added exact purchase-email lookup across live/sandbox, paginated 25 purchases
  at a time with every assigned code, separate Windows/macOS status, payment/refund,
  original delivery and latest resend status. Search values stay in POST bodies.
- [x] Added confirmed resend of the original codes to the saved buyer address via
  the existing commerce recovery processor. Rechecks Stripe, preserves stable
  request IDs, excludes active/review duplicates and retains scheduled fallback.
  Sandbox retains its configured recipient override. No replacement recipient UI.
- [x] Added confirmed per-platform redemption reset in purchase results and code
  details. Removes only the chosen claim/credential, maintains legacy summary
  markers, rejects stale/racing forms, preserves purchase/allocation/refund/hold
  records and warns that installed offline licenses remain valid.
- Validation: targeted D1 and compiled desktop/mobile browser checks pass, including
  signed independent Access verification, paging, sandbox routing, confirmations,
  CSP and overflow. Actual license-service handlers/migrations pass isolated
  resend/payment/redemption/restoration checks with simulated providers. No real
  emails sent or production claims reset. Full checks and deployment recorded in
  backend `Docs/DeveloperPortalLicensingDeployment.md`.
- [x] Deployed reader `52db0b4f-22a2-4a07-a8c5-cfade5deefd0`, then analytics
  `8336e889-5f00-4c9c-a9bb-6e24c464f3a9`, with existing settings/secrets/cron
  preserved. Authenticated API read-back confirms published modules exactly match
  browser-tested bundles and expected live/sandbox commerce Service bindings.
  Live page/API/support POST still require Access; public license support routes
  return 404. Owner Access-session interaction remains unavailable to the agent.
  SELECT-only checks matched all five current orders/eight linked codes with
  detail platform states; 19 licenses/13 explicit claims remain, zero rows written.
- Rollout complete. Existing Access protection remains; no new customer account,
  schema or secret.
  Lost-email ownership changes/replacement generation are outside this feature.

## Unused beta licenses deleted (2026-10-27)

- [x] User explicitly authorized deleting the 11 beta licenses with neither
  redemption nor allocation, retaining all redeemed and allocated records.
  Deleted exactly 2 live August 5 records and 9 live October 5 records. No
  export/backup was created; no code, schema, configuration or deployment changed.
- [x] Preflight confirmed exactly 11 eligible IDs, held in memory only. One atomic
  deletion used that frozen set, an exact-count guard and eligibility checks for
  beta/hash-only legacy records in the identified cohorts, no global redemption or
  attempt, no Windows/macOS claim, no allocation/reference, no purchase link, no
  payment hold and no on-demand seat. Returned IDs matched the target set exactly.
- Validation: isolated D1 checks verified all protection predicates and that a
  count or redemption change aborts deletion. Read-back confirms every retained
  license, prior global redemption and allocation is preserved; platform claims,
  orders and refunds match their pre-delete state. The complete sandbox snapshot
  is unchanged. Remaining: 11 live plus 8 sandbox licenses, 19 total. Inventory
  reads current data without saved-report caching; refresh shows the new count.

## Unused pre-generated stock deleted (2026-10-27)

- [x] User explicitly authorized deletion of the 621 unused pre-generated records
  and declined an export. Deleted exactly 600 live records from the September 30
  cohort and 21 sandbox records from the September 29 cohort. No export/backup was
  created. No application code, Worker configuration or deployment was changed.
- [x] Preflight fixed the target IDs in memory. Each database deletion used one
  atomic statement with materialized candidates, exact expected-count guard and
  the same eligibility conditions: commercial pre-generated dated stock, stored
  code, no on-demand seat, no global redemption/attempt, no Windows/macOS claim,
  no allocation/reference, no purchase link and no payment hold. Returned deleted
  IDs matched the authorized cohort exactly. No codes/private IDs were logged.
- Validation: isolated D1 guard checks passed, including both platform claims,
  global redemption, legacy attempts, purchase links, allocations, holds and
  changed-eligibility/count aborts. Both live preflights matched 600/21 before any
  deletion. Read-back confirms 22 live plus 8 sandbox records remain (30 total),
  all previously retained license IDs and prior global/platform redemptions are
  preserved, and all purchase/license links and refund records are preserved.
- [x] Retained all 22 manual/support records, 3 previously allocated stock licenses
  and 5 on-demand licenses. Every previously redeemed license remains. Dashboard
  inventory is read live and excluded from saved reports; refresh exposes the new
  count. No new deployment is required for this data-only operation.

## Paginated license dashboard and uniqueness audit (2026-10-27)

- [x] Expanded the owner-only tool into a table of all live/sandbox database
  records, with 25/50/100 rows per page, environment selection, newest-first UTC
  ordering and First/Previous/Next navigation. Rows show retained redemption codes,
  independent Windows/macOS badges, purchase/refund badges and View links to the
  existing overview/full details. Code lookup and formatting remain available;
  there is no internal-ID input. View URLs contain only record ID/environment.
- [x] Implemented bounded keyset pagination across both databases with an
  environment tie-breaker, environment-specific detail reads, strict cursor/page
  validation, explicit projections, authentication/rate limiting before reads and
  private/no-store responses. Inventory never enters saved reports. The request
  authorizes displaying retained codes here; tokens, hashes, restoration secrets,
  delivery payloads and customer emails remain excluded. No schema or record writes.
- Validation: all 130 backend checks pass; the final environment-scoped lookup
  adjustment also passes affected inventory checks. Compiled dashboard + reader
  browser checks use signed synthetic authentication and real isolated D1 data at
  390/1440px through direct entry and dashboard navigation. Pagination, filters,
  page sizes, same-ID environment detail, code lookup, CSP, privacy and overflow
  pass; representative screenshots reviewed. Existing status and marketing
  navigation/browser checks pass. Final compiled checks after the environment-scoped
  lookup adjustment also pass.
- Before the stock cleanup, read-only verification traversed all 651 records across seven
  100-row pages, with no duplicates/skips and verified backward navigation. There
  are 629 retained codes; 22 older live records keep only hashes and show Code not
  stored, with status/details still accessible. No codes or private IDs were logged.
- [x] Audited generation and actual database constraints: license IDs and normalized
  code hashes are unique per database. On-demand insertion rejects collisions
  atomically; order/seat uniqueness preserves retries. Private batch generation
  checks within-batch codes; batch import skips existing code hashes. No global
  live/sandbox uniqueness check is implemented. Current cross-environment audit
  found zero matching code hashes and zero matching license IDs. Issuance behavior
  was inspected, not changed by this dashboard task.
- [x] Deployed reader `14b82906-1611-49d8-8c01-ecb6c528586f` before analytics
  `24181685-c487-4764-9e84-bf58b1ff2749`, preserving production variables,
  bindings, required secret and UTC cron. Authenticated deployment read-back matches
  both compiled artifacts used together in browser checks byte-for-byte. Live
  inventory API, dashboard and detail routes retain Access redirects. Owner-session
  production browser checks remain unavailable to the agent.

## License status overview and platform redemption (2026-10-27)

- [x] Added a color-coded overview at the top of lookup results, with independent
  Windows, macOS and purchase/refund cards, redemption timestamps and an explicit
  Live/Sandbox label. Broad headings distinguish platform redemption, full/partial
  refunds, disputes and payment holds. Text labels accompany all status colors.
- [x] Kept the full returned license record available in a native expandable
  Full license details section. Redemption-code-only input and automatic formatting
  remain. Shared styles cover both direct entry and dashboard navigation; the
  saved-report presentation scope advances so existing dashboards load those styles.
- [x] Reader selects per-platform claim timestamps and linked purchase/payment state
  plus recorded refunds in the purchase currency. It does not equate a generic hold
  with a refund or a missing purchase with a paid license. Legacy globally redeemed
  records map to Windows only when no platform claim exists, matching the service.
  A found record adds one bounded claim query and, when allocated, one purchase
  query; no polling, schema changes, external payment calls or record writes.
- Validation: all 125 backend checks pass. Synthetic D1 checks cover Windows-only,
  macOS-only, both platforms, legacy mapping, full/partial refunds, disputes, holds,
  missing purchase information, secret exclusion and zero record mutation. All 16
  compiled-Worker browser cases pass at 390/1440px through direct entry/dashboard
  navigation, including colors, typing/paste, keyboard disclosure, no extra reads,
  CSP and overflow. Representative screenshots reviewed. SELECT-only operator checks
  confirm live/sandbox data compatibility without printing codes or private IDs.
- [x] Deployed reader `4c7546d0-5c37-42b0-82d5-be2d30cabab7` before analytics
  `af441fff-ee1b-485a-ad7a-e529677954ee`, preserving production variables,
  bindings, required secret and UTC cron. Deployed analytics source is byte-for-byte
  identical to the compiled artifact used for all 16 browser cases. Live dashboard,
  lookup page and detail API retain their Access redirects. Owner-session production
  browser checks remain unavailable to the agent.

## Redemption-code-only lookup (2026-10-27)

- [x] Removed the internal license-ID form and explanatory copy from the website
  lookup tool at the user's request. The page now offers only redemption-code
  lookup and describes no-match results in terms of that code.
- Validation: all nine affected licensing/bundling checks pass. The Wrangler-built
  Worker passes Edge checks at 390/1440px through direct entry and dashboard
  navigation: exactly one lookup form, no ID input/button, preserved typing/paste
  formatting, sandbox/hold results and no CSP errors or horizontal overflow.
- [x] Deployed analytics `87c1fe0c-556e-4511-9175-5b5e4ff2a153`, preserving
  production variables, bindings, required secret and UTC cron. Authenticated
  deployment read-back matches the tested compiled Worker byte-for-byte; the ID
  form is absent. Live lookup page/detail API retain Access redirects. Owner-session
  production browser checks remain unavailable to the agent.

## Compiled dashboard code-format repair (2026-10-26)

- [x] Reproduced the deployment-specific failure reported after the lookup update:
  `Function.toString()` produced different formatter text after Worker bundling,
  invalidating the shared dashboard script's CSP hash. Earlier browser checks used
  unbundled source and did not cover this deployment boundary.
- [x] Replaced generated function text with literal browser-script source, updated
  its CSP hash and advanced the private report presentation scope. A bundling
  regression check verifies exact script/hash stability and input formatting.
- Validation: the Wrangler-built Worker passes Edge checks at 390/1440px through
  both direct license-page entry and dashboard navigation. Checks use signed
  synthetic authentication, local data and intercepted requests, and cover the
  reported lowercase input, grouping, aliases, typing/paste, truncation, replacement
  forms and zero CSP errors. Compiled dashboard screenshot reviewed.
- [x] All 123 backend checks pass. Deployed analytics version
  `03729724-353e-4886-b6fd-2176a969ad47`, preserving production variables,
  bindings, required secret and UTC cron. Downloaded the deployed Worker through
  the authenticated deployment API and verified it is byte-for-byte identical to
  the Wrangler artifact used for browser checks. Live dashboard/license page and
  detail API retain their Access redirects. Owner-session production browser
  verification remains unavailable to the agent.

## Live and sandbox license lookup (2026-10-26)

- [x] Confirmed the user-reported missing codes were on-demand sandbox purchase
  codes. App redemption searches both databases; the portal and private Query
  Blackbird License Action previously searched only live D1. Both lookup tools now
  search live, then sandbox, without redemption/payment-status or issuance-date
  filters. Results label the environment and payment hold; recovery holds remain.
- [x] Added website code-format guidance and typing/paste formatting matching the
  Action: uppercase, four-character groups, whitespace/hyphen handling and Crockford
  aliases. Server normalization also works without JavaScript. Licensing lookups
  remain private, read-only and uncached; codes stay out of URLs, responses and logs.
- Validation: 122 website/backend checks and 32 private commerce-tool checks plus
  121 commerce-runtime tests pass. Operator-authenticated read checks resolve
  existing redeemed and held sandbox codes through the revised portal/reader and
  actual Action query helper. Both databases retain their totals/states; no code
  or token was printed. Edge checks at 390/1440px pass for typing, paste, dynamic
  form replacement, environment/hold display, CSP and overflow; screenshots reviewed.
- [x] Deployed private reader `fbd57134-4148-41f0-a688-7d1b662790e2` before
  analytics `1cb5fc2c-269a-4b6e-af08-179192f39ae4`, preserving production
  variables, existing secret, bindings and UTC cron. Reader binds both existing
  D1 databases and has no public routes or preview URL. Live dashboard/license
  page and report/lookup APIs still redirect to the configured Access host;
  root redirect passes. Owner-session authenticated browser verification remains
  unavailable; operator checks do not substitute for that session.
- [x] Blackbird query helper, private Action result labels and owning guide/plan
  committed and pushed to `Incogent/Blackbird` main in `ee9deae`. The helper is
  resolved from the configured repository folder at Run time. The new private
  Action package labels require the normal explicit Settings > Packages update;
  the user's installed packages were not replaced during this task.

## Analytics root address repair (2026-10-26)

- [x] Reproduced HTTP 404 at `https://analytics.incogent.io/`; the existing
  `/dashboard` route still redirects to the configured Cloudflare Access login.
  Companion backend now redirects root GET/HEAD requests to `/dashboard`, keeping
  query parameters and private dashboard authorization. Other unknown paths and
  root writes remain HTTP 404. Redirect responses use `Cache-Control: no-store`.
- Validation: all 120 backend checks pass, including root redirect behavior,
  unsupported routes and fail-closed dashboard authorization.
- [x] Deployed companion analytics version
  `d5f25d65-f290-460d-9794-ea68fb7e7c15`, retaining existing production variables,
  bindings, `GITHUB_DOWNLOADS_TOKEN` and UTC cron. Live root GET/HEAD return HTTP
  302 to `/dashboard`; query preservation passes. Following the complete chain
  reaches Cloudflare Access sign-in (HTTP 200). Dashboard and private report/lookup
  APIs remain Access protected (HTTP 302); unknown paths remain HTTP 404.
  Authenticated owner-session dashboard checks remain unavailable to the agent.
- [ ] Earlier user-reported Chrome phishing warning remains unverified: the new
  screenshot establishes the root 404 only. This routing repair does not establish
  the flagged URL, clear Google's classification or prove a false positive.


## macOS download UX — published for review (2026-10-25)

- [x] Added a shared Windows/macOS download presentation to both product-page
  download sections and the informational purchase-confirmation page. Windows
  retains the existing first-party EXE/MSI URLs and installer-choice guidance.
- [x] Displayed macOS as **Not yet available**, with no link, disabled button,
  placeholder URL or download handler. Planned delivery is a DMG for macOS 15+
  on Apple silicon (M1 or newer), confirmed against Blackbird's current
  `Docs/CrossPlatformPortabilityPlan.md`, `Docs/MacDevelopment.md` and
  `Docs/MacPackaging.md`. These are planned requirements, not a published release
  or a signing/notarization claim. No release date, version or file size is invented.
- [x] Replaced the Windows-only practical-information heading with platform and
  requirements copy distinguishing the available Windows build from the planned
  Mac target. Intel Macs and Linux remain outside the current release target.
- [x] Kept download copy in the English localization CSV and one shared build
  partial (`templates/blackbird-downloads.tpl`); desktop panels stack on narrow
  screens without JavaScript. Bumped the stylesheet cache version and regenerated
  all pages. Site validation rejects interactive pending-Mac controls and Mac
  download/DMG URLs, and requires the pending panel at each download location.
- Validation: policy, localization, generation, site and documentation checks pass
  (69 pages, 64 sitemap URLs, 57 guides), as do all seven pricing tests. Source and
  website EULA Markdown remain byte-for-byte identical. Edge/Playwright passes
  56 route/layout checks across product/confirmation pages at 320/390/640/641/768/
  900/1440px, light/dark themes and JavaScript enabled/disabled. No page or panel
  overflow; Windows URLs, keyboard order and the purchase pause remain correct.
  Desktop/mobile screenshots reviewed. Negative probes reject an interactive Mac
  placeholder, a Mac resolver URL, an external DMG link and a missing pending panel;
  original generated HTML is restored and validation passes. External browser
  requests were blocked; no downloads, payments or tracking events were sent.
- [ ] Mac launch follow-up: verify the published distributable, final requirements,
  compatible Actions, installation/update instructions, public release notes and
  package metadata before enabling a download. The companion Cloudflare repository
  owns any future download resolver and download reporting changes; no Mac endpoint
  is configured by this UX draft.
- [x] User authorized publication for UX review. Applied the Mac-only changes to
  current production in `E:/GitHub/incogent-macos-publication-20261025` on
  `codex/blackbird-macos-downloads`, preserving newer header/region improvements.
  Purchasing remains paused; Mac package/link activation remains follow-up.
- [x] Published in `4c8edf9` on 2026-10-25. GitHub validation
  `40234682171` and Pages deployment `40234681822` succeeded. Live product,
  confirmation and retained shop HTML plus cache-versioned CSS/JS return HTTP 200
  and match release content after line-ending normalization. Mac status and
  requirements are present with no Mac download link. The new download partial
  and pricing catalog remain excluded from Pages (HTTP 404). Both Windows
  installer HEAD checks return HTTP 302 without downloading installer bodies.
  No payments, app/feed publication, backend deployment or tracking writes occurred.

## Regional checkout integration — prepared, unpublished (2026-10-24)

- [x] Implemented all six regional presentations and all 18 exact prepared LIVE
  purchase URLs from Blackbird's `Docs/LicenseOperations.md` (Paid license offers),
  `LicenseServer/blackbird-license-api/COMMERCE.md` (Production preparation and website
  handoff) and `Docs/CommerceFulfillmentPlan.md` Phase 5. Catalog and live link data
  reside in `scripts/blackbird-pricing.mjs`; product/shop pages share one renderer.

  | Region | Currency | Indie | Studio | Enterprise | Tax wording |
  | --- | --- | ---: | ---: | ---: | --- |
  | US | USD | 59 | 249 | 499 | Applicable sales tax added at checkout |
  | CA | CAD | 79 | 349 | 699 | Applicable tax added at checkout |
  | EUROZONE | EUR | 59 | 249 | 499 | Includes applicable VAT |
  | GB | GBP | 49 | 199 | 399 | Includes applicable VAT |
  | AU | AUD | 99 | 399 | 799 | Includes applicable GST |
  | DEFAULT | USD | 59 | 249 | 499 | Includes applicable tax |

- [x] Replaced currency-only selection with an explicit country/region selector.
  Its saved region updates all three prices and tax wording together; the prepared
  enabled path also updates all three matching live URLs. US and DEFAULT remain
  separate USD offers. The existing currency-only hint cannot distinguish them,
  so the site makes no geolocation request and ignores old currency preferences.
  Unset/invalid preferences, unavailable storage and no JavaScript use DEFAULT USD
  with tax included. The no-JavaScript page explicitly identifies this fallback.
- [x] Preserved permanent use, identical features, all future updates, no annual
  options/subscriptions and eligibility under $200K / $200K–$5M inclusive / over
  $5M based on annual gross revenue plus cumulative funding in USD. Removed blanket
  tax-added copy. No website tax charge or estimate is calculated.
- [x] Confirmation/support and retained purchase wording explicitly describe emailed
  redemption codes (one per seat) and activation in the app, without downloadable
  license-file claims. Earlier user-confirmed delivery/activation evidence is
  retained; this change does not repeat or replace those end-to-end observations.
- [x] `BLACKBIRD_PURCHASING_ENABLED` remains false. Prepared normal output contains
  no checkout URLs/buttons. Configuration/render sources remain excluded by the
  existing Pages configuration. Validation rejects sandbox URLs anywhere in generated
  HTML and any exposed Stripe checkout URL while paused. CSS/JS cache versions bumped.
- Validation: seven pricing tests pass, including exact catalog/handoff comparisons,
  USD tax separation, missing/duplicate/sandbox rejection and both paused/enabled
  render paths. Policy, localization, generation, site and documentation checks pass
  (69 pages, 64 sitemap URLs, 57 guides); EULA bytes match the authoritative source.
  Edge/Playwright checks both pricing routes in all six regions at 320/390/900/1440px
  in light/dark themes, with correct explicit currency, tax wording, thresholds and
  no overflow. Representative screenshots reviewed. Local-only enabled preview
  verifies all 18 link selections; keyboard, reload, old currency preferences,
  invalid values, blocked storage, URL parameters and no-JavaScript fallback pass.
  Confirmation/support code wording passes. External browser requests are blocked;
  no payment, email, license issuance or Stripe activation is performed.
- [ ] Final licensing review: hosted totals for **all 18 live offers** and
  representative billing addresses remain blocked while the prepared links/products
  are inactive, as documented in the authoritative handoff. Check US/CA tax-added
  totals and EUROZONE/GB/AU/DEFAULT tax-inclusive totals, especially DEFAULT USD
  with VAT/GST billing addresses; inclusive totals must not increase after tax is
  calculated. Verify final URLs, quantity 1–10, terms/confirmation redirect and
  redemption-code delivery/support against the compatible signed app releases.
- [ ] Website publication and Stripe activation remain separately user-deferred.
  This task is committed/pushed on `codex/blackbird-regional-checkout`, not `main`,
  to preserve the current public site and purchase pause. Launch authorization is
  required to publish the website, enable new products/links and retire old Alpha
  links. No backend deployment, Stripe/catalog mutation or app publication is part
  of this task. Publication evidence below remains historical completed evidence.

## Permanent pricing publication (2026-10-23)

- [x] Prepared the approved one-time USD per-seat catalog from Blackbird's
  `Docs/LicenseOperations.md`: Indie $59 (under $200K), Studio $249 ($200K–$5M,
  inclusive), Enterprise $499 (over $5M). Eligibility remains annual gross revenue
  plus cumulative funding. All tiers include permanent use, identical features and
  all future updates, with no expiration, update deadline or version cap.
- [x] Removed the one-year option and previous lifetime prices from the shared
  product/shop template. Updated the active English localization, shop metadata,
  purchase overview and license-delivery wording; removed unused regional price
  translations. Additional locales remain user-deferred. These decisions supersede
  the October 9 two-option pricing and earlier regional offers below; completed
  historical purchase/activation evidence remains completed.
- [x] Preserved the purchase-unavailable message and empty checkout configuration.
  Added site validation rejecting sandbox Stripe Payment Link and Checkout URLs.
- Validation: policy, localization, generation, site and documentation checks pass
  (69 pages, 64 sitemap URLs, 57 guides). Website EULA bytes match the authoritative
  Blackbird source; no legal changes. Edge/Playwright verifies both pricing pages
  at 390/1440px in light/dark themes: exact prices and eligibility thresholds,
  one permanent offer per tier, future-update wording, purchase-unavailable message,
  no checkout links/data attributes and no horizontal overflow. Desktop/mobile
  pricing screenshots reviewed. Injected sandbox Payment Link and Checkout URLs
  both fail site validation; generated files were restored after each probe.
- [x] Published the user-authorized pricing release in `fee5c81` on 2026-10-23.
  GitHub validation `40013292926` and Pages deployment `40013292879` succeeded.
  Production product, retained Blackbird shop and shop overview all return HTTP 200
  and match the prepared content after normalizing line endings. Live pricing pages
  show $59 / $249 / $499, permanent licenses, all future updates and the purchase
  pause, with no Stripe checkout URLs or previous update options.
- [ ] Purchase buttons remain deferred until final
  live Stripe links are supplied and verified against each tier. Never publish
  sandbox links or reuse older live offers. Production commerce rollout/readiness
  is tracked in Blackbird's operations documents; this website publication does
  not deploy or modify Stripe, fulfillment, issuer keys or customer licenses.


## GitHub release listing incident and download resilience (2026-10-22)

- Reproduced the reported prerelease download HTTP 404 while other EXE/MSI routes
  returned v0.8.4-alpha.1. GitHub API independently returned HTTP 200 with an empty
  release list while other requests returned eight releases. Owner also observed
  GitHub's Releases page changing after Tags navigation. Releases still exist;
  an upstream response inconsistency is verified, its internal cause is unknown.
- Companion edge Worker now retries a missing channel once with a fresh GitHub
  query and no-cache header. Repeated empty lists/missing prerelease return a
  temporary HTTP 503; download errors are never cached. Successful redirect cache
  namespace advanced; exact installer names and expected stable 404 are preserved.
- Validation: all 120 backend tests pass. Authenticated Cloudflare preview
  recovered from an injected empty response using the actual GitHub API and
  production credential. Policy, localization, build, site and documentation
  checks pass (69 pages, 64 sitemap URLs, 57 guides); EULA bytes match Blackbird.
- Deployed edge version `ca85beb2-9288-4671-bb77-ab0c48da4ce5`, preserving existing
  variables, secrets and bindings. Live GET/HEAD checks of all three prerelease
  routes return HTTP 302 to v0.8.4-alpha.1 across EWR/IAD; both GitHub installer
  asset HEAD requests reach the asset host. Stable probes returned 404 or temporary
  503 during the incident, always no-store. Contact/marketing method guards and
  currency endpoint remain correct; no messages/events were sent. Details:
  companion `incogent-cloudflare/Docs/DownloadResolverDeployment.md`. Existing
  user-confirmed download verification remains historical completed evidence;
  this incident warrants the targeted checks above. Persistent GitHub failures
  can still affect cold-cache lookups; GitHub's listing incident remains external.

## App-package meaning and recovered periods (2026-10-13)

- Clarified package downloads throughout the dashboard as App packages (.nupkg), rather than implied completed Updates. Daily rows identify Full app package vs Delta app patch, explicitly state the version contained/targeted, and label the previous/current arithmetic as total download counters. Exact filenames remain available locally. Counts and stored observations are unchanged.
- The recovered October 12 app report includes one 0.8.4-alpha.1 Setup EXE, one 0.8.4-alpha.1 full.nupkg and two 0.8.3-alpha.4 full.nupkg downloads. Those older files contain 0.8.3-alpha.4, not a starting installed version. The comparison spans the October 11 observation to the October 13 recovery capture, so it does not establish that each file was downloaded on October 12. The recovered interval now appears above the selected app breakdown; first balances are also identified above their breakdown.
- Read-only updater investigation: Blackbird AppUpdateService.CheckForUpdatesAsync uses Velopack CheckForUpdatesAsync/TargetFullRelease and downloads the selected update; CreateUpdateManager uses GithubSource with the installation's prerelease preference and no custom downgrade selection. The release workflow .github/workflows/release.yml executes vpk download github before packaging when an existing release exists. This proves build traffic can download older full packages; individual counter increases cannot identify their caller. Do not attribute these two old downloads to a workflow or a customer without further evidence. Official Velopack documentation describes multi-delta chains and CI downloads of the previous full package: https://docs.velopack.io/packaging/deltas. Both observed app-package files here are full packages, not delta-chain evidence.
- Validation: 39 affected backend checks pass, including unchanged arithmetic, label disclosure and exact CSP hash. Existing 390/1440px dashboard checks pass; real stored report checks at 390/900/1440px verify explicit older full-package version, counter totals, recovered timestamps, retained filenames and zero additional requests. Screenshots reviewed. Cache presentation scope and generated script/hash updated. Deployed analytics version `790608f9-c5de-4c37-bedb-d05947dca94d`, preserving the production secret, bindings and UTC cron. Live dashboard remains Access protected (HTTP 302). Owner-session authenticated production visual review remains unavailable.

## Readable daily download details (2026-10-13)

- Replaced the seven-column downloads detail table with a four-column daily overview (UTC day, installers, updates, bundles) and one selected-day panel. The latest day starts selected. Desktop shows totals beside details and keeps day selection available while scrolling; narrow views stack them, move to selected details and provide All days to return.
- Selected-day breakdown separates app downloads from action bundles, groups release labels, shows download type, previous/current counters and added count. Show filenames reveals exact filenames only when needed. Collection status, capture/previous timestamps, initialization and recovery explanations remain available in the selected day; UTC times are formatted for reading, with exact ISO timestamps retained in datetime/title attributes. Counter-reset notices and missing-report explanations are preserved.
- Dates, counts and stored observations are unchanged. Day/filename controls use the existing saved report with no additional requests or database reads. Other category tables and the cumulative Releases tab remain in their existing locations. No additional expandable sections introduced. Updated generated navigation CSP hash and daily cache presentation scope so the new layout is served on the next authorized visit.
- Validation: all 115 backend tests pass; final 21 affected checks pass after mobile navigation changes. Existing dashboard browser checks and rolling-week/notification/cache checks pass. New verify-download-data-ui.mjs verifies the real stored October 12 report (1 installer, 3 updates, 42 bundles; all nine file increases), zero/missing/initialized days, keyboard selection, filename toggles, single visible detail panel, narrow layout and zero additional requests at 390/900/1440px. Screenshots reviewed. Deployed analytics version `9ca20512-8f9b-4205-ade0-41ef6f6f6a7a` with existing production secret, bindings and UTC cron preserved. Live dashboard retains Cloudflare Access protection (HTTP 302). Owner-session authenticated production visual review remains unavailable to the agent.

## Completed reporting days and zero opening balances (2026-10-13)

- Fixed the extra-day delay: download snapshots now retain their actual collectedAt timestamp and explicitly store reportDate as the most recent completed UTC day. History triggers index by reportDate. Normal 00:05 collection is available in that completed day's 00:10 report; same-day skip/retry checks and download health categories use the report day. Other event/activity buckets remain unchanged.
- Removed the previous-report gate. A first known snapshot compares to a zero opening baseline and displays its recorded totals immediately, flagged Initialized from zero. This is an operator-authorized initialization policy, not a claim that the existing cumulative downloads all occurred on that calendar day. Release controls and point tooltips expose the initialized balance; Daily data shows Opening baseline: 0 and the actual capture timestamp.
- Applied migration 0007_download_reporting_day.sql to recover October 12 from the latest stored October 13 observations for both sources. The app row displays the known counter increase over the recovery interval; it is labeled Recovered interval and retains the previous/actual observation timestamps. The migration re-keys only the latest legacy observation when its completed day is absent, leaves earlier history intact and avoids a duplicate next-day point. All original asset counters were compared byte-for-value against a local read-only backup after migration and preserved. It does not reconstruct exact download event dates across the missed poll.
- Fresh authenticated operator collection at 2026-10-13T21:55:13.424Z / 21:55:14.086Z stored reportDate=2026-10-12. Production read-back/render confirms October 12: 1 installer, 3 update-package increases and initialized action-bundle balance 42 (7 per bundle), with no previous-report requirement. Future bundle deltas subtract that opening captured balance, so it is not counted twice.
- Validation: 115 backend tests pass, including first-report visibility, reporting-date assignment, migration counter conservation/no duplicate date, following-day delta and source isolation. Existing 390/1440px browser checks and rolling-week/notification checks pass; final 16 affected checks pass after adding provenance tooltips. Real production snapshots rendered locally at 390/1440px confirm the October 12 row and six visible initialized bundle series; screenshots reviewed. Backups are in .wrangler/recovery, containing public counter snapshots only. Temporary operator preview stopped. Cache scope advanced for corrected reports; analytics version `9396b06c-4bd5-4aa9-bb8b-0c63bd25d6ee` deployed; live dashboard remains Cloudflare Access protected (HTTP 302). Existing production secret, bindings and UTC cron retained. Authenticated production owner-session visual review remains unavailable to the agent.

## Rolling Last Week refresh and dismissible notifications (2026-10-13)

- Dashboard reloads return to Last Week (latest seven completed UTC days). Custom date Apply/shortcuts still display the requested period for the current view; loaded report URLs remove fixed from/through dates so subsequent refreshes advance automatically. A reload of a legacy dated URL redirects to the weekly URL when it differs from the current weekly bounds. Channel, target and selected section/tab remain. API/export date filters are unchanged; license lookup is excluded.
- Historical collection warnings moved out of the charts into a Notifications menu. Each date/source warning identifies past collection gaps when a newer successful report exists. Individual dismiss and Dismiss all persist in this browser using localStorage; new date/reason IDs remain visible. Dismissal does not remove D1 history or Daily data statuses, and creates no network requests. Chart controls remain available without inline alert lists.
- Owner-requested manual authenticated update succeeded at 2026-10-13T21:23:35.207Z (app releases, 42 assets) and 21:23:35.814Z (action bundles, 18 assets). Separate authenticated read checks returned HTTP 200 with 5,000/hour limits and 4,918/4,917 remaining. October 7/8/12 warning dates are historical unauthenticated collection failures; current authentication succeeded. No past observation date was fabricated. Current cumulative totals are updated; daily charts still use completed UTC days.
- Cache presentation scope advanced once so the next authorized visit rebuilds with the updated counters and interface. Existing daily collection/retry/turnover schedule and production secret remain. Normal same-day reloads reuse the private cache; changing the browser URL does not create daily ingestion events or poll GitHub.
- Validation: all 113 backend tests pass; the existing 390/1440px dashboard checks pass for persistent dismissal, uncluttered charts and existing navigation. New real browser checks at 390/1440px confirm custom-range reset on refresh, automatic seven-day advancement across UTC cycles, preserved channel/target/tab, persistent historical dismissal and same-cycle cache hits without another data load. Temporary operator preview stopped after the update. Analytics deployed in version `1ad82bf9-4263-40d4-b30e-9851f15871c5`; production dashboard retains HTTP 302 Cloudflare Access protection. D1 read-back confirms both manual update timestamps. Existing secret, bindings and UTC cron preserved; authenticated production owner-session visual review remains unavailable to the agent.

## Authenticated collection verified and action-bundle downloads added (2026-10-13)

- Owner added GITHUB_DOWNLOADS_TOKEN to the production analytics Worker. Account-authenticated remote preview inherited the existing secret without exposing its value. Both Incogent/Blackbird-Releases and Incogent/Blackbird-packages returned HTTP 200 with x-ratelimit-limit=5000, proving authenticated GitHub reads. Live verification caught Cloudflare's rejection of redirect:error; corrected to redirect:manual and explicit non-2xx rejection so credentials never follow redirects. Production now requires the secret via Wrangler and the collector auth-required setting.
- Added independent action-bundle singleton/history tables and 90-day retention (additive migration 0006_action_bundles.sql). Scheduled app and bundle polls/retries run independently at existing 00:05/03:05 UTC triggers; a failure in one source does not discard the other. Bundles retain six recent releases per bundle/channel, rather than six releases across the repository. Normal collection requires one API request per repository; bounds and complete-scan validation remain.
- Downloads → Charts adds Action bundle downloads in the chart selector, with per-release visibility and optional trends off initially. Daily data adds payload counts, file arithmetic and independent source collection status. Releases contains cumulative action-bundle counts. Period totals includes recorded bundle deltas. Only payload.zip contributes; release.cat/release.json support downloads are excluded. No app-bundle/installer population mixing or duplicate sidebar destination.
- One-time authenticated operator collection stored real app counters at 2026-10-13T21:02:43.755Z (42 assets) and bundle baseline at 2026-10-13T21:02:44.342Z (18 assets). D1 read-back confirms six bundle payloads, each downloaded 7 times: utilities, unreal, unity, steam, godot, android, total 42. Initial bundle snapshot is a daily baseline; lifetime totals are available immediately and daily deltas require another observation entering a completed-day report. No October 12 row or historical bundle downloads were fabricated.
- Validation: all 113 backend tests pass; per-bundle scope, metadata exclusion, independent storage, auth-required/no anonymous fallback, manual redirects and explicit same-day operator refresh are covered. Edge checks at 390/1440px pass for separate bundle charts, release/trend toggles, existing views and no extra requests on chart changes; screenshots reviewed. Health allow-list expanded to retain bundle started/success/failure and GitHub credential-rejection categories; the initial live check caught this omission. Repeated authenticated collection at 2026-10-13T21:07:20.385Z / 21:07:20.938Z preserved counters and persisted both success records. Temporary remote preview stopped after collection. Migration applied before affected Worker deployment; credential preserved. Cache scope includes the new source and early retry freshness considers both snapshots. Initial bundle UI deployment was `ff1f15a1-821e-459e-b9b9-c1b52ff8c499`; final analytics version `c527a2ce-5b5a-40f3-a834-2bc5e306bba4` deployed with the existing secret and UTC cron preserved; live dashboard remains Access protected (HTTP 302); authenticated owner dashboard visual review remains unavailable to the agent.

## Download collection authentication and failure visibility (2026-10-13)

- Added optional GITHUB_DOWNLOADS_TOKEN Worker secret support to every release/asset API request. Token values are never stored in snapshots, HTML, cache keys or diagnostics; fixed GitHub URLs reject redirects. Configured invalid credentials produce downloads_github_auth_failed without falling back to anonymous requests. Existing unauthenticated collection remains available until the dedicated secret is configured.
- Download history now reads safe failure categories alongside counters in the existing bounded history SQL call (no extra query per refresh). Daily data labels collection status; chart alerts identify failed observation dates. Successful retry snapshots take precedence over prior failures for the same date. Baselines, untracked historical dates and counter-reset notices remain distinct from failures.
- Owner screenshot confirms the range includes October 12: this was a collection gap, not a pinned range. Production history checked read-only: October 10 2 installers/1 update; October 11 0/0; October 12 null/null with GitHub rate-limit explanation; October 13 recovery 1 installer/2 updates since the prior available report. No October 12 observation was fabricated or rewritten.
- Validation: all 109 backend tests pass, including token propagation to asset pagination, no token persistence, auth-versus-throttle failures, no anonymous retry after rejection, status recovery precedence and retained unknowns. Updated Edge 390/1440px checks pass for visible failure explanations, series/trend controls and no extra chart requests.
- Activation remains pending the dedicated GitHub token: local gh login is invalid and the production Worker had no secret bindings at investigation. User requested detailed setup instructions. Code/status changes deployed in analytics version `79cf64b5-663d-48fc-83b0-b171314898e6`; live dashboard retains HTTP 302 Cloudflare Access protection. Existing bindings and 00:05/03:05 UTC cron preserved. Owner-session visual review remains unavailable. Authenticated collection success must be verified after secret setup; do not mark the reliability incident fully resolved before that check.

## October 12 collection gap investigation (2026-10-13)

- Owner reported dashboard data stopping at October 11. Production D1 read-only inspection confirms app aggregates exist for October 12 and October 13; website storage contains October 10/11 events only (no later recorded events).
- Both October 12 download polls ran but recorded downloads_github_throttled (two starts/two failures), leaving no October 12 snapshot. October 13 primary also recorded throttling; the retry succeeded at 2026-10-13T03:05:06.000Z. History contains October 9/10/11/13; no synthetic October 12 row was written. Stored diagnostics classify GitHub 403/429 responses as throttled; upstream response bodies are intentionally not retained.
- Cache/date cutoff verified at October 13 17:00 UTC: unfiltered dashboard selects October 6–12, with REPORT_THROUGH=October 12. An explicit through=October 11 remains a historical selection on refresh. Cache keys include the daily cycle, so a previous cycle is not reused for the current default. Owner clarification and screenshot confirm the date range includes October 12 with unavailable download values; authenticated production visual inspection is unavailable without an owner Access session.
- Worker secret names checked read-only: none configured. Collector sends unauthenticated GitHub requests; GitHub limits unauthenticated REST requests by originating IP (60/hour), making authentication the next reliability improvement. A dedicated read credential is not yet configured; do not record this incident as fully remedied. Scheduled polling recovered on October 13, but October 12 cannot be recovered as a separate daily observation from the later cumulative counter.
- No code/config/deployment or production database writes performed for this investigation. Existing daily 00:05 collection, 03:05 retry and 00:10 cache turnover retained. For a pinned range use Dates & targets → Last Week or the unfiltered /dashboard route to select the latest completed day.

## Individual metric visibility (2026-10-12)

- Every standard daily chart now has color-matched Show data checkboxes for its individual metrics, all enabled initially. Reporting Apps and Sessions can be isolated independently; the same behavior applies to Action results, website activity, sales/redemptions and single-series charts.
- Hidden metrics are excluded from the graph, legend, auto-fit scale and optional trend calculation. Trends remain disabled initially. Selecting no metrics displays a clear empty state. Colors and selections persist while switching dashboard tabs/categories within the loaded saved report.
- Series/trend changes render locally without additional network/database requests. Download release/type controls retain their existing behavior. Generated script/CSP hash and cache presentation revision updated; collection and production bindings unchanged.
- Validation: all 107 backend tests pass. Edge checks at 390/1440px isolate each metric in app, marketing and sales charts, verify empty/restored selections, verify hidden sessions do not set the Reporting Apps scale, and verify only selected trends are drawn. Existing chart/navigation/filter/lookup checks pass; screenshots reviewed. Deployed analytics version `9ff834f0-94f0-4730-ae95-cf44745da6b6`; production dashboard retains HTTP 302 Cloudflare Access protection. Existing bindings/cron retained. Owner-session production visual review remains unavailable to the agent.

## Optional trend overlays (2026-10-12)

- Removed horizontal average overlays and average legend values from every daily chart. Grid markers and configured targets remain; legends identify each series without extra statistics.
- Added Show trend lines to each chart, unchecked by default. Fits use ordinary least squares over recorded day positions, require at least two points and stop at the first/last recorded point. Missing cells remain missing; fitted lines are optional overlays, not replacement data or future projections. Fits are clipped at zero and included in auto-fit scaling.
- Download trends follow the selected releases and download type. Controls update locally from the saved report, with no database requests. Generated script/CSP hash and daily cache presentation revision updated.
- Validation: 107 backend tests pass, including regression arithmetic, missing points, zero counts and insufficient data. Edge checks at 390/1440px verify trends off initially, enabling/disabling trends for downloads and other charts, release/type controls and no extra requests. Deployed analytics version `7e32ea04-431d-4d3c-83cf-786507d2f6d0`; production dashboard retains HTTP 302 Cloudflare Access protection. Existing bindings and cron retained. Owner-session production visual review remains unavailable to the agent.

## Selectable download release lines (2026-10-12)

- Replaced the chart's redundant release/file table with one colored line per release. Daily data retains file counter arithmetic; Releases retains cumulative totals.
- Native release checkboxes enable/disable each release independently. Releases with nonzero downloads in the selected range start enabled; other observed releases remain selectable. Download type switches between All downloads, Installers (EXE + MSI), and Update packages without multiplying lines per release.
- Release colors stay fixed while controls change. Chart scale and average markers recalculate from visible lines; configured targets remain. Zero values and missing observations retain their existing meanings. Selecting no releases shows an explicit empty state.
- All comparisons use the saved report in the browser, with no extra requests/database reads. Shared chart script is generated as a fixed string (run `node scripts/build-release-chart-script.mjs` after renderer/control changes to regenerate it and the CSP hash), with normalized newlines and an exact CSP hash; cache presentation revision updated. Collection, UTC attribution, inventory/records and backend bindings are unchanged.
- Validation: 106 backend tests pass; Edge checks at 390/1440px verify release/type switching, empty selection, restored lines, no redundant chart table and no extra requests. Desktop/mobile screenshots reviewed. Deployed analytics version `d3451445-d075-4ee5-9f36-5159f8f0e9c4`; live dashboard retains HTTP 302 Access protection. Final 20 affected backend checks and repeat responsive browser checks pass. Authenticated production visual review requires the owner's Access session.

## Known-data reporting audit (2026-10-12)

- Completed audit of download history, website/source reporting, app health/version summaries, purchase aggregates/record limits and license reporting. Real production history identifies October 10's two installers as v0.8.3-alpha.4 Setup EXE 12→13 and MSI 12→13; the v0.8.4-alpha.1 update package increased 0→1. Latest-release installer totals are correctly zero; daily counts span all tracked releases.
- Download charts now include a visible release/file breakdown and point tooltips; Daily data shows file counter arithmetic. One reset no longer discards healthy sibling counters: its issue is listed explicitly. If a collection date is missing, compare the latest available prior report and show the interval start in Daily data; do not invent values for the missing date. Initial snapshots remain baselines. The six-release collection window and 90-day retention remain explicit limits.
- App/website/commerce summaries sum received values with contributing-day coverage instead of hiding the whole period for one unavailable date. Website source tables retain known values across pre-tracking dates. Received launch-day and collection-cap counts are displayed with coverage labels; this supersedes earlier rollout-day/capped-day exclusions. CTR uses recorded events, and Action success rates use dates with both success/failure counts.
- App-version reporting retains unmatched 2.1 reporting counts under Version not reported. License inventory is accessible once in Sales & Licenses → Records using the existing reader response; lookup remains a tool only. Purchase records explicitly show the displayed count versus period order count (latest 50); full monetary totals remain separate by currency. No synthetic events or database corrections were written.
- Validation: 104 backend tests pass; 390/1440px Edge checks pass, including visible chart attribution, inventory, navigation and no extra requests when switching views. Production D1 download counters checked read-only through the revised calculation. Routine collection times and bindings are unchanged; cache revision exposes the corrected presentation after deployment. Deployed analytics version `59cf8fd2-b87e-43fb-a35e-beb9e5a853e8`; production dashboard retains HTTP 302 Cloudflare Access protection. Remote website aggregates confirm October 10: 1 view / 1 click; October 11: 2 views, now retained in recorded totals. Owner-session production visual review remains pending because Cloudflare Access browser authentication is separate from the working API token.



## Download counter subtraction correction (2026-10-12)

- Fixed the release-window comparison that discarded whole daily categories when a new asset appeared or an older release left the six-release list. Daily observed downloads now sum each current asset counter minus its previous observed counter, using zero for a new asset. No timestamp comparison, inferred calendar-day attribution or minimum-count display is used. Matching asset counter decreases and absent adjacent observations remain unavailable rather than negative/zero fabricated activity.
- Production history verified read-only: October 10 now calculates 2 installer downloads and 1 update-package download; October 11 calculates 0 additional downloads in both categories. No stored counters, observation dates, app events, purchases or license records were changed.
- Added Recorded installer downloads and Recorded update downloads to Period totals, summing available observations with that scope clearly labeled. Latest cumulative release downloads remain visible in Releases with their own observation timestamp; publication dates are explicitly release metadata. The selected date range is labeled Daily activity range. No separate duplicate charts or new collection requests are introduced.
- Validation: all 101 backend tests pass, including new asset zero-baseline/release-window regression, counter resets, missing days, zero activity, render labels and Access/cache isolation. Updated 390/1440px browser checks pass and verify the update count remains visible. Real D1 history rendered through the corrected functions confirms update total 1 and numeric daily values 1 then 0, with no minimum qualifier.
- Cache keys revised for immediate corrected presentation. Analytics deployed in version f6a0b247-b553-4d68-897b-96b7ddff8089; live dashboard retains HTTP 302 Cloudflare Access protection. Authenticated production visual review remains for the owner; production database access is verified with the configured API token.

## One-time reporting refresh (2026-10-10)

At the owner's request, scripts/seed-downloads.mjs --production refreshed real GitHub counters at 2026-10-10T22:41:01.615Z: 42 public assets, 2 D1 rows written (latest snapshot and same-day retained history). October 9 baseline was preserved; no extra observation date or synthetic marketing/purchase/app event was created. Daily download gaps cannot be backfilled from lifetime totals.

The report-cache layout scope was advanced once to 2026-10-10-operator-refresh-224101, so the owner's next authorized visit rebuilds the selected saved report from current stored data. There is no scheduled dashboard-generation job to run; event ingestion is continuous and the daily schedule only collects downloads/turns over report caches. Completed UTC-day filters and rollout-day exclusion remain unchanged. Existing app reports span September 5–October 10 (43 date/schema/channel rows); 9 licenses have been redeemed, latest October 5; there are 0 purchase orders. Website storage still has only the documented October 10 verification view/click (one of each), withheld from completed totals. Empty purchases and unavailable website/download history remain truthful rather than seeded.

Five report-cache checks passed. Cache invalidation deployed in analytics version 82241ef9-d781-4944-b8e9-d814a6febae2; live dashboard retains the expected HTTP 302 Access redirect. Owner Access session is required to build/view the protected report; no bypass was used. Regular 00:05 download collection, 00:10 turnover and 03:05 retry remain unchanged.

## Single location for license lookup and purchase records (2026-10-10)

- License lookup contains only code/ID search and matching license details. Inventory cards, redemption charts/tables and range/target controls are removed from that tool. Opening it performs no license-reader/database reads; submitting a lookup reads only the requested details, without redeeming or exposing the code in the URL.
- Purchase records live directly in Sales & Licenses → Records, using the purchase response already read for the saved dashboard. The tab has the latest 50 records for the selected period, with payment/refund/email/Discord status and no duplicate charts. Currency monetary totals live in Sales & Licenses → Daily data. The purchase sidebar destination is removed; old purchase view URLs redirect to this Records tab after Access verification and query validation.
- Records/category/tab switching is local, with no extra database reads. Date Apply/shortcuts keep the selected tab. Existing daily report cache and collection schedule are unchanged; cache layout version updated. The empty lookup landing page bypasses report snapshots and displays no daily-report timestamp because it reads no data.
- Validation: 98 backend checks pass; updated 390/1440px browser checks pass for inline records, no record-tab fetch, lookup-only layout and private code submission. Analytics deployed in version 02bb3bfd-dfed-47f7-aeb5-ef2fb6734e32; production dashboard, license lookup, legacy purchase and purchase API routes retain HTTP 302 Access redirects. Final 31 affected checks plus 11 lookup/cache checks pass; responsive browser checks also verify direct Records links and tab preservation. No production record or tracking writes were generated. Authenticated production visual review remains for the owner.

## Integrated dashboard navigation and record tools (2026-10-10)

- Removed the top category dropdown, redundant Charts sidebar destination and separate filter page. Exactly one destination is selected. Desktop navigation collapses; mobile/narrow Menu exposes all destinations.
- Dates & targets opens inline above the selected report; date Apply/shortcuts retain that destination. License lookup and purchase records now load inside the same workspace/shared shell, including legacy bookmarks and normal GET/POST fallback forms. Record tools load only when selected; code lookup remains private, read-only and outside the URL.
- Existing daily report cache/Access behavior is preserved. Category/tab/view switching makes no reads; record searches and changed filters read as needed. No production license or purchase changes.
- Validation: 25 affected checks and updated 390/1440px browser checks pass, including all destinations, one current item, responsive menu, on-demand/reused tools, inline filters and code lookup. All 97 backend checks pass. Analytics version 03b34e7a-1c3b-4602-a325-1404826b0d38 deployed; dashboard, license and purchase routes retain Access redirects. Remaining: owner-authenticated production review.

## Website tracking live verification (2026-10-10)

- Owner requested production end-to-end verification. A real Blackbird product-page view and real download-link click each returned HTTP 204; before/after remote D1 checks confirm product_view=1 and download_click=1 under source other on October 10. No actual installer download occurred.
- DNT-enabled visit/click produced zero collector requests; totals remained unchanged. Apex product URL redirects to www. No browser errors or collector bug were reproduced; no code/deployment change required.
- Two controlled test counts are retained on the partial rollout day, which is excluded from complete totals. Earlier selected period ended October 9, before October 10 rollout. Collection covers the product page, not homepage/dashboard visits; earlier aggregate emptiness cannot distinguish absent visits from privacy/blocking/network suppression.
- Detailed evidence/reverification guidance: companion Docs/MarketingFunnel.md, Live website tracking verification; timing/scope cross-reference in Docs/AnalyticsDataSchedule.md. Collection is confirmed. Remaining: observation of natural traffic and owner-authenticated completed-day dashboard review.

## Chart-first analytics workspace (2026-10-10)

- Main screen opens on App Activity charts, with a compact desktop sidebar. Totals, date/target filters and report information now have their own local views. One plot is visible at a time; daily data and breakdown tabs remain with each category. Mobile navigation is compact.
- View switching uses the existing saved report without requests/database reads. Desktop charts are verified above the fold without document scrolling; tables and auxiliary views can scroll within the workspace. Cache layout revision invalidates prior presentation.
- Website audit: selected period ended October 9, before October 10 tracking rollout; production currently has no natural website events. Live product/tracking script are present (HTTP 200). Marketing explains rollout/empty-period availability. First complete website reporting date is October 11, visible after October 12 at 00:10 UTC; natural collection remains to observe.
- Validation: 21 affected checks and 390/1440px sidebar/category/tab/plot/no-request checks pass. All 97 backend checks pass; final affected checks also pass. Analytics version a69bc274-f2c7-48d8-9ea8-95d1d56ba95b deployed; dashboard retains its Access redirect. Remaining: authenticated owner visual review and natural website event observation.

## Clearer analytics categories and Reporting Apps (2026-10-10)

- Replaced eight chart choices with Marketing, Downloads, App Activity and Sales & Licenses. Related charts and supporting tables now share category tabs (Charts, Daily data, and Sources/Releases/Versions & health/Records), replacing the bottom stack of drawers. Only schedule/report information remains expandable.
- Daily participation is labeled Reporting Apps with a short explanation: opted-in apps reporting that day, including idle apps. The overview card shows the latest selected day; summed participation is labeled Daily app reports (period), with repeated apps explained. Internal metrics are unchanged; no unique-user claim.
- Category/tab switching remains local to the saved report, with keyboard navigation, CSP hash authorization and no network/database reads. Percentages keep a separate scale; count targets remain.
- Validation: 23 affected checks and 390/1440px browser checks pass, including all category tabs, keyboard behavior, one bottom drawer, clear explanation and no switching requests/overflow. All 97 backend checks pass. Analytics version db7ad7de-c3e9-4955-aace-08c0b11a695f deployed; live dashboard/funnel return Access redirects. Remaining: owner-authenticated production visual review.

## Unified analytics dashboard (2026-10-10)

- Main page now leads with selected-period website views/clicks/CTR, installer increases, app-days, orders/seats and redemptions. One dropdown chooses marketing, downloads, reporting, actions, update failures, purchases, redemptions or CTR.
- Switching charts uses the saved report locally without navigation, network requests or additional database reads. Shared filters/targets remain. A single CSP-hash-authorized script enables selection; no-script fallback shows all charts.
- Schedule, app health, detailed tables, sources/versions and lifetime downloads are collapsed below the primary data. Record lookup tools remain available for administrative work. Schedule anchor/documentation retained; saved timestamps moved below the data.
- Validation: 21 affected checks and 390/1440px browser checks pass, including every selector choice under CSP, no requests on switching and metrics above the collapsed schedule. All 97 backend checks pass. Analytics version d4f42884-12cf-4d6e-9488-c10658933666 deployed; live dashboard/funnel/record requests retain Access redirects. Remaining: owner-authenticated production review.

## Analytics collection schedule reference (2026-10-10)

- Published a visible five-row collection/availability table near the protected analytics dashboard header, with UTC/DC times, daily cache behavior, late uploads and download retry notes.
- Current reference: companion backend Docs/AnalyticsDataSchedule.md, linked from its README, AnalyticsDeployment.md, MarketingFunnel.md and GitHubDownloadReporting.md. Dashboard location: https://analytics.incogent.io/dashboard#data-schedule.
- Validation: 15 affected dashboard/cache checks pass; 390/1440px browser checks verify the five rows and no overflow. Analytics version cfcb46d7-a62a-4be4-b1b3-a7d0295415ea deployed; cache keys revised so prior saved HTML does not hide the panel. Live dashboard returns the expected Access redirect. No tracking schedule or schema change. Remaining: owner-authenticated production visual review.

## Daily private dashboard cache (2026-10-10)

- Companion analytics backend implements server-side saved reports with Access checked on every request. Cached refreshes avoid database reads; code and license-ID lookups stay live. Browser responses remain private/no-store. Cache eviction, new filters or another data center can require a rebuild.
- UTC reporting days are retained at the owner's request. Default views use completed days. Collection moves to 00:05 UTC, failed collection retries at 03:05 UTC, and saved reports expire at 00:10 UTC; the next visit rebuilds them. No extra daily report job, database writes or new paid service.
- Validated: 96 backend tests; 20 affected checks after handling transient incomplete reports. Updated 390/1440px browser checks pass for analytics/licenses/purchases, saved timestamps and completed-day shortcuts. Analytics deployed in version 429c0a2b-db24-434a-9739-b47a11bc9756 with cache enabled and cron 5 0,3 * * *. Live private pages redirect to Access; the internal cache URL returns 404. Four cache tests also pass with the explicit incomplete-report bypass assertion. Remaining: owner-authenticated production cache HIT review and natural scheduled observations. Deployment evidence: companion backend Docs/MarketingFunnel.md.

## Daily downloads and marketing funnel (2026-10-10)

- Implemented daily retained GitHub snapshots and observed installer/update-package increases in the companion backend. Missing dates, changed asset sets and counter resets remain gaps; lifetime counters cannot backfill historical daily activity.
- Added aggregate product-page views, download clicks and checkout clicks, grouped into direct/search/social/email/paid/other. No stored visitor identity, URL or raw campaign label; honors DNT/GPC, bounded to 5,000 events/day with 90-day retention. Published privacy disclosure updated; purchase pause remains in effect.
- Protected funnel combines these counts with independently measured app-days, orders/seats and redemptions. Website CTR uses product-page clicks/views; no installation or cohort-conversion claim. Selected channel applies to downloads/app reports; commerce and website counts cover all channels.
- Daily charts use line graphs with labeled scales, averages and optional configurable daily targets. Default scales auto-fit low counts. Target settings persist in filter URLs.
- Validation: all 92 backend checks, including 5 focused funnel/history tests, pass; affected-route checks and 390/1440px browser layouts pass. Website policy, localization, build, site and all 57 guide checks pass; EULA bytes match.
- Analytics 21acba35-6ccb-49f1-8019-5652c9b9b9bf and edge 93f68d99-5449-4d41-8c80-052eda18dfc1 are deployed; migrations 0004/0005 and a real current GitHub observation are verified. Access redirects and no-write event/privacy probes pass. Published in 6431f2b; Pages 38073324519 and validation 38073324703 succeeded. Live HTTP 200 verifies the cache-versioned tracking script, updated policy and preserved purchase pause. The first observed download interval is unavailable because asset sets changed; current baseline is retained. Backend evidence: incogent-cloudflare/Docs/MarketingFunnel.md. Remaining: authenticated owner visual verification and natural scheduled observations/cleanup.

## Pricing threshold captions (2026-10-10)

- Moved the financial definition directly beneath each tier's threshold, shortened to
  "Annual gross revenue + cumulative funding". Removed the separate note under the cards.
- Shared product/shop template updated; purchasing remains paused. CSS cache version bumped.
- Policy, localization, build, site and documentation checks pass; authoritative EULA bytes
  match. Browser checks at 390/1440px confirm all three captions and no page overflow.
  Published in 5797c01; Pages 38028248741 and validation 38028249017 succeeded.
  Live HTTP 200 confirms all three threshold captions.

## USD pricing tiers (2026-10-09)

- Replaced the single regional offer with Indie ($59 / $179), Studio ($149 / $449),
  and Enterprise ($399 / $1,199), for one year / lifetime updates respectively.
  Thresholds are under $200K, $200K–$5M, and over $5M, based on annual gross revenue
  plus cumulative funding. All prices USD per seat; perpetual use and identical features.
- Product and retained shop pages share one pricing template. Related purchase copy
  now describes both update options. The alternating section background is preserved.
- Purchasing remains paused. Stripe offers and license issuance were not changed;
  aligning those systems with the new tiers is required before reopening purchases.
- Policy, localization, build, site and all 57 documentation-guide checks pass; EULA
  bytes match the authoritative source. Layouts verified at 390/1440px in light/dark
  themes, with three cards, no checkout link and no horizontal page overflow.
  Published in 5315de9; validation 38021931307 and Pages 38021931168 succeeded.
  Live product page returns 200 with the new pricing and purchasing still paused.

## Blackbird 0.8.4-alpha.1 documentation (2026-10-08)

- Updated published guide content for schema-2 definitions, editable bundles, per-component
  version operations, direct CLI commands, engine filters, Queue behavior, Discord notifications,
  Intermediate cleanup, and itch.io upload setup. The user specified this release label without
  an upcoming-feature notice.
- Replaced the downloadable schema-1 tutorial with two schema-2 Actions and their shared
  definition library; rebuilt the ZIP and updated example validation.
- Localization, site build, all 57 guide checks, internal links/assets, and policy checks pass.
  Both read-only scripts pass with an isolated PowerShell context; ZIP contents match all three
  package folders, and the EULA remains byte-identical to its authoritative copy.
  Real screenshots and vendor tool-version/live-upload certification remain outstanding.
- Existing purchase pause, unrelated working changes, and product/backend behavior are unchanged.

## Temporary purchase pause (2026-10-05)

- User requested pausing new purchases while license setup is revised. Website checkout
  control is disabled on the product and retained shop pages, with a temporary-unavailable
  message. Generated pages also omit regional checkout URLs. Existing fulfillment, refunds,
  recovery, downloads and trial use remain operational.
- Policy, localization, build, site and documentation checks pass. Authoritative EULA is
  byte-identical. Published in aaf3f27; Pages run 37350022504 and validation run
  37350023912 succeeded. Live product and retained shop pages return HTTP 200,
  show the unavailable message and contain no Stripe checkout URLs.
- Stripe-side pause is NOT confirmed: no callable Stripe account tools are available in this
  session, even after the user signed in and the plugin was confirmed installed. All active
  live Blackbird Payment Links, including older links, must be deactivated
  in Stripe. Previously opened Checkout Sessions may also need expiration. Do not describe
  purchasing as fully disabled until the provider-side pause is verified.

## Purchase announcements and analytics (2026-10-01)

- Completed: confirmed live purchases announce seat quantity to the supplied Discord channel.
  Credential is a Worker secret; no customer, license, payment identifier or financial amount
  is posted. Duplicate callbacks reuse notification state. Rate limits retry; ambiguous outcomes
  enter review and are covered by existing daily failure alerts. Sandbox is excluded.
- Completed: Purchases page and JSON endpoint on the existing Access-protected analytics backend.
  Orders, seats, paid totals/tax and recorded refunds are separated by currency, with daily totals,
  latest 50 purchases and delivery/notification state. Uses the existing private reader; no public
  ingestion or customer data disclosure. No new paid service, signing change or app release.
- 85 licensing and 87 analytics checks pass; mobile/desktop layout checks pass. Migration 0009
  and both commerce deployments complete. Discord setup test confirmed; live Access redirects and
  unsigned webhook rejection verified. Production currently contains no confirmed orders.
- Reader 26710a3f-d075-4df6-832a-69dcebb8288a; analytics 5623060c-a0d3-4a25-a0c3-b2f025dcc0d9;
  commerce e00c5aa1-0b15-4973-82ad-b7e82b96e7eb. Signed-in live page was not verified because the
  agent has no owner Access session. Details: incogent-cloudflare/Docs/PurchaseReporting.md.
  On-demand signing remains under design. Public website files were not changed in this task.

## Purchase section background (2026-09-30)

- Applied the existing highlight-band treatment to product pricing so its background
  contrasts with Before you buy, matching the page's alternating sections in both themes.
- Policy, localization, build, site and documentation checks passed; EULA hashes match.
  Browser checks confirm the same highlight background as existing bands in light/dark mode.
  Published in 584412d; Pages deployment 36778544642 succeeded.

## Purchase information and workflow examples (2026-09-30)

- Added three concrete workflows with guide links: Unreal packaging, Android deployment,
  and collecting logs. Existing product demo video remains in place.
- Added Before you buy: unrestricted 14-day free trial, no account/payment details,
  one-person seats usable on a reasonable number of personal machines, 12 months of
  preview/stable updates from purchase, perpetual use of covered versions, alpha expectations,
  Windows support and required external tools. User confirmed trial and OS policy:
  Windows 11 officially supported; Windows 10 expected to work but unsupported. Current
  release is x64. Seat wording agrees with the authoritative EULA; no legal edits needed.
- Real product screenshots remain outstanding: no suitable captures were available in
  either repository. Do not substitute invented UI images. Use the existing demo meanwhile.
- Policy/i18n/build/site/documentation checks pass and authoritative EULA bytes match.
  Browser checks at 390/1440px verify all six purchase facts, three workflow examples,
  responsive layout and the existing currency selector. Published in 27bc41a; validation
  36742883149 and Pages deployment 36742880459 succeeded. Real screenshots remain outstanding.

## Product pricing, site icon and public copy (2026-09-30)

- Pricing is integrated into the Blackbird product page at #pricing, retaining the
  approved regional prices, country hint, currency selector and matching checkout links.
  Existing shop pages remain accessible but are unlisted in navigation and the sitemap;
  the site's purchase links now point directly to product pricing.
- Added the existing app Incogent icon verbatim as favicon.ico and PNG/touch icon.
- Replaced all 57 public media-production briefs with short image descriptions and
  removed the public brief inventory. Removed internal review/test-status wording from
  provider guides, simplified awkward reference copy, and replaced unfinished About/home
  copy with factual customer-facing text. Technical Action-authoring instructions remain.
  The footer no longer advertises unfinished website work. Actual images remain to be added.
- Policy, localization, build, site and documentation checks passed; EULA hashes match.
  Browser checks at 390/1440px passed for regional pricing, manual currency/checkout,
  navigation, concise captions, favicon links and retained shop pages. Published in ccf5d78
  and 9f0d7e6; final validation 36739075148 and Pages deployment 36739074965 succeeded.
  Live checks verified product pricing, absence of shop links, icon assets, cleaned guide
  content and both retained shop URLs (HTTP 200).

## Regional currency display (2026-09-30)

- Completed: country-based currency hint from existing incogent-edge GET /api/currency,
  with USD fallback and manual USD/CAD/EUR/GBP/AUD selector. Only the explicit preference
  is saved locally. No location permission, external geolocation service or location storage.
- One price at a time: US$149 / C$219 / EUR159 / GBP139 / A$239. USD/CAD tax-exclusive;
  EUR/GBP/AUD tax-inclusive. Manual selection wins over a late country response.
- Five fixed-currency Managed Payments links use the existing approved Price, license
  metadata, quantity selection, terms consent and confirmation redirect. The old general
  link remains valid; website uses the currency-specific links. Existing fulfillment accepts
  these currencies and the same price ID without licensing changes.
- Edge deployed as 1579b4ea-45a3-4d21-913f-1f3c3a4722cb; all 84 backend tests pass.
  Website policy/i18n/build/site/documentation checks pass and authoritative EULA hashes match.
  Browser checks passed at 390/1440px, all five currency/price/link/tax combinations,
  stored preference, late-response race, failure/unknown fallback and JavaScript disabled.
  All five live checkouts show the corresponding approved amounts. No payment was made.
- Published in eb79d95; validation 36665117189 and Pages 36665117262 succeeded.
  Live mobile browser verified the selector, C$219 price and matching CAD checkout.
  Live currency endpoint returned HTTP 200/private/no-store; contact remains 405 on GET
  and Windows download remains 302. No additional user setup required.

## Purchase page simplification (2026-09-30)

- User requested simpler marketing presentation. Show one prominent US$149 per-seat price,
  one-time purchase/tax qualifier, buy button and a short license-terms link in one centered card.
- Removed the country list, quantity limits, delivery/recovery instructions and detailed terms prose
  from this page. Recovery remains on support/confirmation pages. Regional checkout pricing is unchanged.
- CSS cache version bumped. Policy, i18n, build, site and documentation checks pass; EULA hashes match.
  Browser checks at 390/1440px show no overflow, a single USD price and the correct live checkout link.
  Published in b03bbed; GitHub validation 36664230591 and Pages deployment 36664229661 succeeded.
  Live HTTP checks confirm the simplified card, correct checkout link and removal of the country/quantity copy.

## Production purchasing rollout (2026-09-30 UTC)

- User-confirmed activation remains complete; no repeat is required without a material activation change.
  User verified the refunded purchase's resend enters review/payment_blocked without an email.
- Production backend enabled as 77dfda7a-a772-47f9-a20a-8abc1552e8cb. All three runtime secrets
  are installed. Live Stripe account authentication and Resend acceptance passed using its simulated
  delivery address; no real payment or license issuance was performed during this check.
- Private D1 backup and isolated restore passed integrity checks: 612 licenses, including 600 dated
  commercial seats (20 per UTC purchase date September 30 through October 29). Migrations through
  0008 and 12 existing token fingerprints are complete. Replenishment remains an offline operation.
- Branded refund confirmations and daily failure/inventory alerts are deployed; 80 backend checks pass.
  The existing activation system is unchanged. The desktop updater gate is implemented but unpublished.
- Live Managed Payments link plink_1ULDqjL5NhSelnQXa2o77QV9 uses all five approved regional prices,
  1–10 seats, mandatory published terms consent, and the existing confirmation-page redirect.
- Website purchase copy/control is ready. Policy, i18n, build, site and documentation checks pass;
  authoritative EULA bytes match. Browser checks at 390/1440px show no overflow and the correct link.
  Hosted live checkout displays Blackbird Alpha, $149/seat, quantity selection and terms/privacy links.
- Published in a6a63d7. GitHub validation 36663440477 and Pages deployment 36663440247 succeeded.
  Public shop returns HTTP 200 with the active live link and all five prices; confirmation and policy
  routes return 200. Production has no failed work or orders from deployment checks. Checkout uses
  Incogent logo/green background are now verified live; coral accent is saved, while the Link payment button remains green.
- Operational instructions and deployment evidence: Blackbird/LicenseServer/blackbird-license-api/COMMERCE.md.

## Mobile theme control (2026-09-29)

- Moved the theme toggle after Menu in the shared header, matching desktop order and keyboard navigation. Kept the compact dropdown and left-aligned labels.
- Policy, localization, generated-site and documentation checks pass; authoritative EULA bytes match. Published as e3996da; Pages 36647202834 and validation 36647203725 succeeded. Live support page confirms Menu precedes the theme toggle.

## Support layout refinement (2026-09-29)

- Moved missing-license reassurance above the contact button so the action ends the section.
- Removed Discord buttons from both Blackbird download action groups. Discord remains
  prominent on the support page and homepage contact section. User reviewed the right-aligned dropdown and requested restoring left-aligned text.
  Left alignment restored. Reduced dropdown minimum width from 13rem to 9rem, with
  content-sized width and a viewport cap; retained 1rem padding. CSS cache version bumped.
- Policy, localization, build, site and documentation validation pass (69 pages); EULA hashes
  match. Included in the ongoing authorized website publication.

## App wordmark synchronization (2026-09-29)

- Copied the current app's Incogent_Wordmark.png and Incogent_Wordmark_Dark.png verbatim
  into website assets. Both are 314 x 80 pixels, suitable for 157 x 40 display at 2x density.
  Header switches between dark artwork for light mode and white artwork for dark mode,
  including automatic OS theme; CSS cache version bumped. All localized pages rebuilt.
- Email template uses the new white wordmark at 157 x 40. Local email preview uses the
  local asset until publication. Website publication is authorized and release validation passes. Deploy the revised
  email Worker only after verifying the published asset URL.
- Policy, localization, build and site validation pass (69 pages); authoritative EULA
  hashes match. All 52 backend checks pass. No higher-resolution source is needed for
  current placements; a 628 x 160 export would support larger 314 x 80 displays at 2x.

## Complete

- [x] Static GitHub Pages site with generated English pages, locale-aware templates, canonical URLs, sitemap, redirects, and automated validation.
- [x] Incogent branding and responsive layout; wide homepage video with narrow text columns; narrow section introductions with wider contact and feature grids.
- [x] Blackbird-first navigation: Shop goes directly to the Blackbird shop and the footer links directly to Blackbird.
- [x] YouTube embeds on the homepage and below the Blackbird downloads, with muted autoplay, looping, and native controls.
- [x] Public Privacy Policy and authoritative Blackbird EULA rendered with working URL/email links and legal-page switch buttons. EULA synchronization instructions recorded in AGENTS.md.
- [x] Public shop published with approved regional pricing, entitlement details and live Stripe purchase link.
- [x] Developer documentation and build sources excluded from Pages deployment while retained in Git.
- [x] Deployed EXE/MSI downloads, contact delivery, mobile navigation, legal links, and deployment exclusions verified. Completion is based on the user's confirmation on 2026-09-09; do not reopen these as unverified because older audits say otherwise.
- [x] Practical Blackbird website copy drafted in BlackbirdPracticalInfoDraft.md.
- [x] Marketing clip suggestions prepared in MarketingClipBrief.md.

## Next: practical product information

- [ ] Review and publish the practical copy draft: installation, prerequisites, updates, release notes, alpha expectations, and support.
- [ ] Confirm minimum Windows version, supported CPU architectures, and meaningful hardware/storage requirements before publishing specific numbers.
- [ ] Confirm draft behavior against the publicly distributed build; source-repo features can precede a release.
- [ ] Link release notes from authoritative published release data; never publish ReleaseNotes/draft.md.
- [x] Link documentation beside the download controls at the top and bottom of the Blackbird product page. The documentation agent owns full documentation and worked examples.

## Blackbird purchasing setup (2026-09-29)

- User confirmed the resend arrived with identical codes, then completed the two-seat sandbox
  refund. Both assigned codes are held and their deployed update-eligibility checks return false;
  the earlier single-seat purchase remains eligible. The test exposed an incorrect livemode
  requirement on Stripe Refund objects. Fixed the handler and test fixtures; all 76 backend
  checks pass. Sandbox Worker 2fbe9c2c-a3ee-4bd4-9730-de3aba4aee9e deployed. The user completed the new resend check: review/payment_blocked with no email. Existing activation is user-verified; current production status is recorded above.

- [x] Backend-owned immediate manual resends deployed to sandbox Worker
  acad7ffd-fb4e-4b63-b337-e16e6f7e7370 after private backup and migration 0007. The existing
  support tool persists the job, then uses a short-lived single-use trigger; scheduled recovery
  remains the fallback. All 73 backend checks pass. Live authorization/replay checks passed
  without sending email or changing the original purchases. No website UI change or new paid
  service. Action-only handoff is in Blackbird Docs/CommerceRecoveryActionHandoff.md; the other
  agent owns only the private Blackbird Action. Production commerce remains disabled.

- [x] Private verified-purchase resends preserve assigned codes and delivery history; original
  Stripe event reconciliation preserves purchase dates. Refund/dispute restrictions now cover
  recovery, redemption and the new built-in updater download gate. Sandbox Worker
  5ec1f010-de8c-4222-8cf5-280b237980e9 deployed after backup and migration 0006; 24 token
  fingerprints populated. All 64 backend checks pass. Desktop Debug/Release builds and focused
  updater/licensing/trial/redemption tests pass; the app is not published. Deployed endpoint
  accepts a known assigned license and rejects malformed/unknown requests. Existing two sent
  orders are intact. Owner alerts and live purchase setup are now completed as recorded above; historical sandbox evidence remains valid. Operational commands live in Blackbird's COMMERCE.md.

- Email palette aligned with website CSS and deployed to sandbox: #2F665E to #7EB8AE
  header gradient, #B9564C primary action, matching website neutral/text colors. All 52
  backend tests pass; two-code desktop/mobile layout previews reviewed. User confirmed near-immediate inbox delivery on September 29. Multi-code contents
  and the new-logo email remain supplemental checks.

- [x] User-approved multiple-code purchases: sandbox quantity selector enabled for 1–10
  seats with quantity-aware validation, complete atomic allocation, one email with all
  codes, stable retries and full-order refund holds. Migration 0005 and Worker deployed;
  52 tests pass and existing purchase preserved. Next user test is two seats.
- [x] Refined sandbox Stripe product name and entitlement description. Managed Payments
  rejects custom checkout text. Logo/colors require a Dashboard step because the connector
  does not expose account branding; hosted visual confirmation remains pending.

- [x] Stripe plugin installed and MCP OAuth verified for Incogent sandbox and live.
  Stripe's implementation planner accepted Managed Payments Payment Links for the
  initial one-time hosted checkout.
- [x] Configured and read back the sandbox alpha offering: $149 USD per seat,
  one-time, with 12 months of updates and perpetual use of covered versions.
  Sandbox Payment Link confirms Managed Payments enabled and Stripe-issued invoices.
  Applicable tax is added; one seat per purchase initially. No public purchase CTA.
- [x] User selected continued offline signing. Blackbird's commerce/licensing plans
  now record Stripe and purchase-date-specific license batches. The update cutoff
  must be based on purchase, not generation/redemption time. Online signing is deferred.
- [x] Implement and deploy isolated sandbox webhook, dated existing-license allocation,
  retryable Resend delivery and refund/dispute holds in the Blackbird license Worker.
  API signature smoke checks pass; automated D1 tests cover duplicates, concurrency,
  missing stock, email failures and refund blocking. Production licensing is unchanged.
- [x] Configure runtime credentials and signed sandbox inventory; verify a sandbox payment,
  license assignment and inbox delivery (user confirmed September 29).
- [x] Deploy branded HTML/plain-text email and immediate post-persistence fulfillment,
  retaining five-minute recovery. All 48 backend tests pass; desktop and 390px mobile
  previews reviewed. Next purchase checks the new inbox appearance and delivery timing.
  Email refined with a shorter friendly welcome, documentation button, existing app Discord
  support link and gradient header. No sandbox banner in the body. 48 tests and refreshed
  desktop/mobile previews pass. Missing-email support/resend remains launch follow-up;
  self-service recovery is proposed, not implemented.
- [ ] Complete activation, updater revocation and generated purchase/success pages.
  Final tax presentation, production eligibility and purchase-to-redemption validation remain outstanding.
- [x] Sandbox Stripe runtime key configured as an encrypted Worker secret; verified
  expected account and sandbox price access. Resend secret and sender/recipient settings
  are now saved and their binding types/formats verified. Dated sandbox inventory for
  September 29/30 is imported and read back; payment/email validation is complete.
- [x] Live catalog product and $149 USD one-time price created and verified after
  an empty live catalog check. Managed Payments onboarding remains in progress;
  no live purchase link or website sales enabled. Stripe IDs are in the integration record.
- [x] User approved regional pricing: US $149 USD before applicable sales tax;
  Canada C$219 before applicable tax; euro area EUR 159, UK GBP 139 and Australia
  AUD 239 inclusive of applicable VAT/GST. Entitlements are unchanged.
- [x] Configured regional currency options on the existing sandbox and live prices.
  Independent API readback confirms USD 149 / CAD 219 exclusive and EUR 159 /
  GBP 139 / AUD 239 inclusive, active one-time prices, and no recurring interval.
  Stripe access is working; existing product/price IDs and metadata are preserved.
- [ ] Validate hosted currency selection and tax presentation, including European
  buyers paying in USD. Update website prices and purchase flow once Stripe checkout
  and fulfillment work, as requested by the user. Public shop remains coming soon.
  Account defaults were not changed. Documentation whitespace checks passed;
  no live purchase link or production fulfillment enabled.
- Incogent Resend sender is configured on updates.incogent.io; inbox delivery is verified.
- Purchasing work is authorized; the public shop remains coming soon until
  fulfillment is verified. Sandbox Worker deployment and operations evidence are in
  `E:/GitHub/Blackbird/LicenseServer/blackbird-license-api/COMMERCE.md`.
  See [StripeCheckoutIntegration.md](StripeCheckoutIntegration.md) for the draft
  design, Stripe object IDs, planner evidence and remaining sequence. Documentation
  whitespace checks passed; no desktop runtime changes or production licenses.

## Missing-license help (2026-09-29)

- Added a generated support page with a Didn't receive your license? section, private
  contact instructions and existing documentation/Discord links. Support is linked from
  the shared footer and both Blackbird download sections.
- Added an informational purchase confirmation page with the missing-license link.
  It neither verifies payment nor issues licenses; webhook fulfillment remains authoritative.
- Policy, localization, generation and site validation pass (69 pages, 66 sitemap URLs).
  Authoritative EULA and website copy hashes match. These pages are included in the authorized website release;
  connect the Stripe redirect only after verifying publication. Authenticated resend tooling and
  self-service recovery are still unimplemented.
- Cost constraint: retain existing Worker/D1/Resend services and free-plan compatibility;
  no paid upgrade, queue service or always-running server authorized. Faster sending uses
  the existing webhook invocation with waitUntil and the existing five-minute recovery cron.

## Discord support visibility (2026-09-29)

- Added Get support on Discord buttons beside documentation at both Blackbird download
  sections, using the configured invite confirmed by the user (`AxxpQ8h`). Updated the
  homepage Discord card to explicitly offer direct Blackbird support.
- Generated pages included in the authorized GitHub Pages release. Policy, localization,
  build and site checks pass (67 pages). Source and website EULA hashes match.
- Email uses the same confirmed invite and is deployed to the sandbox Worker. Email design
  and missing-email recovery status are recorded in the Blackbird commerce operations guide.

## Deferred by user

- [ ] Final About, Services, homepage About/contact copy, and company proof. Still to come; do not invent experience or shipped work.
- [ ] User records short marketing clips and supplies approved assets. Use MarketingClipBrief.md as options, not a required production checklist.
- [ ] Replace the long YouTube video with those curated assets when supplied. Keep hosting essentially free and avoid services with automatic usage overages. GitHub Pages is the agreed direction for small self-hosted assets.
- [ ] Additional locales after English content and product vocabulary settle.

## Later quality improvements

- [ ] Add automated browser/accessibility regression coverage and performance budgets as the site stabilizes. This is additional automation, not a claim that the verified user journeys are broken.
- [ ] Add product social-sharing imagery and accurate SoftwareApplication metadata.
- [ ] Revisit production monitoring/security headers with the companion Cloudflare project where useful.

## Boundaries and maintenance

The Cloudflare repository owns contact, downloads, and analytics infrastructure. Do not infer its current deployment status from the September 3 audit. Analytics activation and operational details belong in that repository's current plans.

For each substantive website change, update this plan's date and affected status, validation evidence, remaining work, or decisions in the same change. Distinguish implemented, verified, drafted, and deferred work. User-confirmed verification is valid evidence and should be labeled as such.

## Companion developer portal update — 2026-09-09

2026-09-10 publication dates: Published (UTC) column deployed in analytics using
GitHub release publication time. Snapshot refreshed; 24 targeted tests and
desktop/mobile layout checks passed. Backend deployment record contains version
ID; authenticated owner visual verification remains outstanding. No public-site change.

2026-09-10 collector repair: removed redundant GitHub calls (normally one request
per collection), added safe scheduled-failure categories and a later same-day
retry that skips successful days. Cloudflare scheduled-handler test saved fresh
production counts; next natural cron remains to be observed. Deployment/test
evidence is maintained in the backend Docs/GitHubDownloadReporting.md. No public
website build, app collection changes, or paid-service upgrades are involved.

App-version reporting update: backend accepts the new rolling 2.1.0 contract;
the revised privacy policy is published (b4f45da, live content verified), and old
2.0.0 reports remain compatible. Production Worker version is
6e73920f-7c56-4ea5-86a2-8a9abc99fd60; 77 tests and staging acceptance/retry checks pass.
Daily v1 UI/ingestion is retired without deleting historical data. Version counts
are sealing-date reporting app-days, not unique installations. App integration
and revised consent are required; handoff and deployment evidence belong in
incogent-cloudflare/Docs/UsageAnalyticsAppVersionHandoff.md. Policy rendering,
i18n and site validation passed; authoritative EULA and website copy match.

License dashboard improvements are deployed to production in incogent-cloudflare: recent allocation references, compact UTC expirations, and short redemption-code lookup. Deployed 2026-09-09 after 74 tests passed. Standing backend deployment authorization is recorded in AGENTS.md. Track implementation and validation in that repository’s Docs/DeveloperPortalLicensingPlan.md; this does not change the public shop or enable purchases.


## Blackbird documentation draft (2026-09-22)

- Completed the authorized full writing pass: 57 guides plus a neutral contents page at
  `/en/products/blackbird/docs/`, covering everyday use, setup, common tasks, providers,
  packages, authoring, troubleshooting, and reference.
- Canonical prose is `i18n/docs/en.json`, rendered through the existing site build and theme;
  CSV retains page metadata. Navigation, full-text search, section anchors and related guides
  work across the complete draft. The home-page design remains open for user review.
- Every guide has a specific media brief; the overview has a filterable production inventory.
  No screenshots or videos were produced. Two read-only shared-setting example packages are
  downloadable source, with installation and testing instructions in the authoring sequence.
- Validation: localization and generated-site validation pass (67 pages); focused documentation
  validation checks all articles, media briefs, links, JSON examples and sample consistency.
  Both downloadable scripts passed in Windows PowerShell with an isolated context; ZIP contents
  match the source downloads. The overview passed 1440px/390px overflow and anchor checks in
  both themes. Search and media filtering passed an isolated DOM harness; the test browser blocks
  page JavaScript, so ordinary browser interaction and full-page visual review remain supplemental checks.
- Publication authorized by the user on 2026-09-22. Documentation links are present at the top and
  bottom of the product page; all 58 documentation routes are indexable and included in the sitemap.
  Development-version notices remain visible. At the user's explicit request, image/video briefs
  and the overview media inventory remain visible for later replacement. Release-build review, media production and vendor tool-version/live-upload
  verification remain follow-up; no certified minimum versions are claimed.
- Publication validation: policy, i18n, build, site and documentation checks pass (67 pages,
  65 sitemap URLs). Authoritative EULA SHA-256 matches the website copy. Edge/Playwright checks
  at 1440px and 390px passed for the product page, documentation overview and installation guide
  without horizontal overflow; screenshots reviewed, both product links present, and live local
  search returned 13 guides for "shared settings". Documentation checks now run in CI and guard
  discoverability and retention of media placeholders.
- Published in commit `62ab1f3`; GitHub validation run `35792263362` and Pages deployment
  `35792262732` both succeeded. Production HTTP 200 checks passed for the documentation overview,
  installation guide, product page, search index, documentation script, example ZIP and sitemap.
  Live product links and the installation guide's media placeholder were confirmed.
- Maintain the content using [BlackbirdDocumentationMaintenance.md](BlackbirdDocumentationMaintenance.md).

## Mobile documentation navigation (2026-09-22)

- Collapsed the mobile sidebar into a sticky Browse guides control with search and section groups.
  On this page opens beside it; only one panel stays open. Panels scroll within the viewport,
  close on selection, outside click or Escape, and preserve keyboard focus for section links.
  The desktop sidebar remains expanded. Native disclosure controls also work without JavaScript.
- Kept all image/video placeholders and the media inventory. Bumped CSS and documentation script
  cache versions. No article wording or release-version claims changed.
- Validation: policy, localization, build, site and all 57 guide checks passed; source EULA hashes
  match. Edge/Playwright checked 320, 390, 720, 900 and 1440px widths without horizontal overflow.
  Mobile article titles appear near the top (198px); search, panel switching, anchor clearance,
  Escape, desktop resize and no-JavaScript browsing passed. Light/dark screenshots reviewed.
- Published in `bb14201`; Pages run `35816312463` and validation run `35816313854` succeeded.
  A production mobile browser confirmed the collapsed sidebar, working search (13 results for
  "shared settings"), and preserved media placeholder. Release-build review and media production
  remain outstanding as above.

## Website publication (2026-09-29)

- User authorized publication. Policy, localization, build, site and documentation checks pass
  (69 pages, 66 sitemap URLs); EULA hashes match. Desktop/mobile layouts checked without
  horizontal overflow. Automated browser did not load image assets; copied logo bytes match
  the app source. Public asset verification follows deployment.
- Release includes app wordmarks, theme-aware header, Discord/support links, missing-license
  help and informational confirmation page. Public purchases remain disabled. Unrelated
  AGENTS.md and draft-document changes are excluded from the release commit.
- User reports sandbox email arrived nearly immediately; this is confirmed inbox evidence.

### Publication result

Published in ef14af1. GitHub validation 36644462706 and Pages deployment 36644462345
succeeded. Production product/support/confirmation pages return HTTP 200 with new logo
markup; both public wordmark files match repository/app bytes. Live mobile light/dark
checks select the correct logo and show no overflow. The automated browser blocks image
loading even after its temporary profile setting was changed; visual image loading remains
a browser limitation, not verified by that check. Asset HTTP/content checks passed.
Sandbox Worker 675bbb9b-e812-4b17-a6a5-5ca45adf3502 now uses the published wordmark;
sandbox Payment Link redirects to the verified public confirmation page. D1 confirms
one sent single-seat order and one sent two-seat order, with three assigned codes.
User confirms near-immediate inbox delivery. Live purchases remain disabled.
