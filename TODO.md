# TODO

## Plan for fixing failing tests

1. Fix ESLint errors blocking `npm run test`

   - Remove unused `CSSProperties` import from `src/components/app/app.tsx`.
   - Remove unused `defaultArticleState` import from `src/components/article-params-form/ArticleParamsForm.tsx`.
   - Optionally type the `value` parameter in `handleFormChange` to remove `no-explicit-any` warning.

2. Re-run `npm run test` to ensure lint/format pass.

3. Locate Playwright/Jest tests responsible for the reported failures (form open/close, default values, apply/reset behavior).
   <<<<<<< HEAD
   =======

> > > > > > > main

- Remove unused `CSSProperties` import from `src/components/app/app.tsx`.
- Remove unused `defaultArticleState` import from `src/components/article-params-form/ArticleParamsForm.tsx`.
- Optionally type the `value` parameter in `handleFormChange` to remove `no-explicit-any` warning.

2. Re-run `npm run test` to ensure lint/format pass.

3. Locate Playwright/Jest tests responsible for the reported failures (form open/close, default values, apply/reset behavior).
   <<<<<<< HEAD

   - Ensure there are stable selectors (data-testid) and that initial state matches expectations.

4. Fix the actual UI/test logic issues causing the failing `app.test.js` cases.

   - Likely issues: RadioGroup checked logic, Select controlled state, or open/close timing.

5. Re-run the test suite until all cases pass.

=======

- Ensure there are stable selectors (data-testid) and that initial state matches expectations.

4. Fix the actual UI/test logic issues causing the failing `app.test.js` cases.

   - Likely issues: RadioGroup checked logic, Select controlled state, or open/close timing.

5. Re-run the test suite until all cases pass.
