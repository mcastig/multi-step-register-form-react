# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Start dev server (Vite, HMR enabled)
npm run build            # Type-check then bundle for production
npm run lint             # Run ESLint
npm run preview          # Serve the production build locally
npm test                 # Run all unit tests (Vitest)
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with v8 coverage report
```

## Architecture

This is a **Vite + React 19 + TypeScript** project implementing a multi-step registration form.

**Entry:** `index.html` → `src/main.tsx` → `src/App.tsx`

**Stack:**
- React 19 with functional components and hooks
- TypeScript (strict, ES2023 target, `bundler` module resolution)
- Vite 8 with `@vitejs/plugin-react` (Oxc parser)
- ESLint 9 flat config (`eslint.config.js`)
- Plain CSS with nested selectors and CSS custom properties — no CSS framework or preprocessor
- Vitest + React Testing Library + jsdom for unit tests

**Form flow:**
1. `Step1` — name + email inputs with validation (`NAME_RE`, `EMAIL_RE`)
2. `Step2` — topic toggle cards (Set-based selection state)
3. `Step3` — read-only summary; confirm triggers `SuccessModal`

`App.tsx` owns all form state (`name`, `email`, `topics`, `step`, `showSuccess`) and passes slices down as props. Steps receive `initialX` props so field values survive backward navigation.

**Component map:**
- `FormInput` — controlled input with optional error message and `role="alert"`
- `TopicCard` — button with `aria-pressed` for accessibility
- `Stepper` — dot indicators + "Step X of Y" label with `role="status"`
- `SuccessModal` — backdrop + card; backdrop click and Done button both call `onClose`; `stopPropagation` on the card prevents accidental dismissal

**Testing:**
- Test files co-located with components (`*.test.tsx`)
- Setup file: `src/test/setup.ts` (imports `@testing-library/jest-dom`)
- Coverage target: 100% — maintain this when adding features
- `globals: true` in Vitest config — no need to import `vi`, `describe`, `it`, `expect`

**TypeScript config:** `tsconfig.json` is a composite root referencing `tsconfig.app.json` (app sources) and `tsconfig.node.json` (Vite config). `noUnusedLocals` and `noUnusedParameters` are enforced — clean up unused identifiers before building.

**Routing:** None installed. If individual steps need distinct URLs, add React Router or TanStack Router.

**Deployment:**
- Live at https://mcastig.github.io/multi-step-register-form-react/
- Hosted on GitHub Pages via `.github/workflows/deploy.yml`
- Triggers on push to `main` (also dispatchable manually via `workflow_dispatch`)
- Pipeline: `npm ci` → `npm test` → `npm run build` → upload `dist/` → deploy
- `actions/configure-pages` runs with `enablement: true` — Pages is auto-enabled on first deploy, no repo settings change needed
- `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` env var is set at workflow level to opt into Node.js 24 action runtime ahead of the June 2026 forced migration
- `vite.config.ts` sets `base: '/multi-step-register-form-react/'` — must match the GitHub repo name exactly or asset paths will break
- `defineConfig` is imported from `vitest/config` (not `vite`) so TypeScript accepts the `test` key alongside Vite config in the same file
