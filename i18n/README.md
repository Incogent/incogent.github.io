# Localization

The Incogent site is English-only today, but its generator remains locale-aware.

## Source of truth

`strings-site.csv` contains one row per translation key:

- `key` is stable and must be unique.
- `context` gives translators usage guidance.
- `en` is required and is the fallback for every locale.
- Future locale columns use the same locale code registered in `scripts/site-config.mjs`.

Templates reference copy with `{{t:key.name}}`. Navigation and internal URLs are generated per locale; translated pages should not hard-code `/en/` paths.

## Adding a locale

1. Add a column to `strings-site.csv` using the desired locale code.
2. Add the locale metadata to `LOCALES` in `scripts/site-config.mjs`.
3. Translate every key that should differ from the English fallback.
4. Run:

```powershell
node scripts/validate-i18n.mjs
node scripts/build-i18n.mjs
node scripts/validate-site.mjs
```

The generator creates the locale directory and the complete Incogent route set. Do not copy or hand-maintain generated pages from another locale.

## Removed inherited output

The former non-English directories contained Sushi Ben pages, not Incogent translations. Those generated files were removed. Their deletion does not change the locale-aware source design described above.

