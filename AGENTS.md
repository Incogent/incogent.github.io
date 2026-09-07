# Repository instructions

## Blackbird EULA synchronization

- The authoritative EULA is `Installer/EULA.md` in the Blackbird repository (normally `E:/GitHub/Blackbird/Installer/EULA.md`). This is the file embedded by `Source/Blackbird.App/Blackbird.App.csproj`.
- `eula/Blackbird_EULA.md` in this website repository is a synchronized copy, not an independently maintained agreement. Do not edit its legal wording or effective date here, and never overwrite the Blackbird source with the website copy.
- Before updating the website EULA or preparing a website release, compare the website copy with the authoritative Blackbird file and copy the source verbatim if it differs. If the Blackbird checkout is unavailable, report that synchronization could not be verified; do not infer a replacement agreement.
- Render the agreement through `scripts/build-i18n.mjs` and `templates/pages/eula.html`; do not hand-edit generated `en/eula/index.html`.
- After synchronization, run `node scripts/test-policy.mjs`, `node scripts/validate-i18n.mjs`, `node scripts/build-i18n.mjs`, and `node scripts/validate-site.mjs`. Verify that the source and website Markdown files are byte-for-byte identical.

## Site maintenance

- Follow the build and asset cache-version instructions in `README.md`.
