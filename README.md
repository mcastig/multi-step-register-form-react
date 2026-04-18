# Multi-Step Registration Form

A multi-step registration form built with **Vite + React 19 + TypeScript**. Users fill in their name and email, select topics of interest, and review a summary before submitting.

## Features

- 3-step form flow: personal info → topic selection → summary
- Client-side validation with inline error messages
- Success modal on completion
- Fully responsive, dark-themed UI with CSS custom properties
- 100% unit test coverage
- Automated deploy to GitHub Pages on push to `main`

## Getting Started

```bash
npm install
npm run dev
```

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Type-check and bundle for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run all unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## Deployment

**Live:** https://mcastig.github.io/multi-step-register-form-react/

The project deploys automatically to GitHub Pages on every push to `main` via `.github/workflows/deploy.yml`. The workflow runs tests, builds, then publishes `dist/` using the official GitHub Pages Actions. GitHub Pages is auto-enabled by the workflow (`enablement: true`) — no manual setup required.

> If you fork this repo, update `base` in `vite.config.ts` to match your repository name.

## Stack

- **React 19** — functional components and hooks
- **TypeScript** — strict mode, ES2023 target
- **Vite 8** — dev server and bundler (`@vitejs/plugin-react` with Oxc parser)
- **Vitest** — unit test runner
- **React Testing Library** — component tests
- **Plain CSS** — custom properties, no framework or preprocessor

## Project Structure

```
src/
├── App.tsx                    # Root — step state, form data, modal
├── components/
│   ├── Step1/                 # Name + email inputs with validation
│   ├── Step2/                 # Topic selection (toggle cards)
│   ├── Step3/                 # Summary view
│   ├── FormInput/             # Controlled input with error display
│   ├── TopicCard/             # Selectable topic button
│   ├── Stepper/               # Step indicator (dots + label)
│   └── SuccessModal/          # Post-submit confirmation modal
└── test/
    └── setup.ts               # jest-dom matchers
```
