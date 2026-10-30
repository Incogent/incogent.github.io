# Repository instructions

## Blackbird EULA synchronization

- The authoritative EULA is `Installer/EULA.md` in the Blackbird repository (normally `E:/GitHub/Blackbird/Installer/EULA.md`). This is the file embedded by `Source/Blackbird.App/Blackbird.App.csproj`.
- `eula/Blackbird_EULA.md` in this website repository is a synchronized copy, not an independently maintained agreement. Do not edit its legal wording or effective date here, and never overwrite the Blackbird source with the website copy.
- Before updating the website EULA or preparing a website release, compare the website copy with the authoritative Blackbird file and copy the source verbatim if it differs. If the Blackbird checkout is unavailable, report that synchronization could not be verified; do not infer a replacement agreement.
- Render the agreement through `scripts/build-i18n.mjs` and `templates/pages/eula.html`; do not hand-edit generated `en/eula/index.html`.
- After synchronization, run `node scripts/test-policy.mjs`, `node scripts/validate-i18n.mjs`, `node scripts/build-i18n.mjs`, and `node scripts/validate-site.mjs`. Verify that the source and website Markdown files are byte-for-byte identical.

## Site maintenance

- Follow the build and asset cache-version instructions in `README.md`.

## Completion plan maintenance

- `Docs/SiteAuditAndCompletionPlan.md` is the authoritative current website plan. Read it before substantive site work.
- Every substantive change must update the plan in the same change: date, affected completion status, validation evidence, remaining work, and any new decisions. Mark drafts as drafts and user-deferred work as deferred.
- Preserve user-confirmed verification as completed evidence; do not reopen it based only on older planning documents. Revalidate when a relevant change or failure warrants it.
- Keep `Docs/WebsiteDevelopmentPlan.md` consistent where architectural decisions change; historical checklists do not override the current completion plan.

## Standing authorization: backend deployments

- The user authorizes routine production deployment of website analytics and developer-backend changes. After implementing and validating changes, deploy affected Workers in the same task without asking for confirmation; do not stop at local-only completion.
- Use existing production configurations, deploy dependencies first, preserve environment settings, perform available live checks, and record version IDs and validation in the relevant plan/deployment record. State any authenticated checks that could not be performed.
- This does not authorize unrelated destructive data operations or paid-service upgrades. Report actual deployment blockers.
