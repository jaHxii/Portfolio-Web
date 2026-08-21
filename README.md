# Ermias Lemesa — Portfolio

Personal portfolio website showcasing expertise in Frontend Development, AI/ML, and IT Infrastructure.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router
- **UI Components**: shadcn-ui

## Getting Started

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page-level components
├── lib/            # Utilities, hooks, and services
└── assets/         # Static assets
```

## Scripts

| Command              | Description                            |
| -------------------- | -------------------------------------- |
| `npm run dev`        | Start dev server (port 8080)           |
| `npm run build`      | Production build + SEO file generation |
| `npm run preview`    | Preview production build               |
| `npm run lint`       | Run ESLint                             |
| `npm run type-check` | TypeScript type checking               |
| `npm run test`       | Run unit tests (watch mode)            |
| `npm run test:run`   | Run unit tests (single run)            |

## Testing

This project uses **Vitest** with **React Testing Library** for unit and component tests.

### Running Tests

```sh
# Run tests in watch mode (re-runs on file changes)
npm run test

# Run tests once (CI-friendly)
npm run test:run

# Run a specific test file
npm run test:run -- src/pages/__tests__/pages.smoke.test.tsx

# Run tests matching a name pattern
npm run test:run -- -t "Contact"
```

### Test Setup

- **Setup file**: `src/test/setup.ts` — mocks `IntersectionObserver`, `localStorage`, and other browser APIs
- **Vitest config**: `vitest.config.ts` — path aliases, environment settings, coverage thresholds

### Writing Tests

Tests live alongside the code they test:

```
src/
├── components/
│   ├── layout/
│   │   ├── __tests__/
│   │   │   ├── Navigation.test.tsx
│   │   │   └── Footer.test.tsx
│   │   └── Navigation.tsx
│   └── ui/
│       └── __tests__/
│           └── badge.test.tsx
├── pages/
│   └── __tests__/
│       └── pages.smoke.test.tsx    # Smoke tests for all pages
└── lib/
    └── __tests__/
        └── utils.test.ts
```

**Naming convention**: `*.test.ts` for pure logic, `*.test.tsx` for component tests.

### Test Helper

Use `src/test/render-page.tsx` to render pages with all required providers (Router, ThemeProvider, etc.):

```tsx
import { renderPage } from '@/test/render-page';
import Contact from '@/pages/Contact';

test('Contact page renders', () => {
  const { getByText } = renderPage(<Contact />);
  expect(getByText('Get In Touch')).toBeInTheDocument();
});
```

### What to Test

- **Component smoke tests**: Does the page render without crashing?
- **User interactions**: Button clicks, form submissions, navigation
- **Accessibility**: ARIA attributes, keyboard navigation, screen reader text
- **Edge cases**: Empty states, error states, loading states

---

## E2E Testing

This project uses **Playwright** for end-to-end browser tests.

### Setup

```sh
# Install Playwright (already in devDependencies)
npm install

# Install Chromium browser
npx playwright install chromium
```

### Running E2E Tests

```sh
# Run all E2E tests (starts dev server automatically)
npm run test:e2e

# Run with UI mode (interactive debugger)
npm run test:e2e:ui

# Run in headed mode (see the browser)
npx playwright test --headed

# Run a specific test file
npx playwright test e2e/smoke.spec.ts
```

### E2E Test Structure

```
e2e/
└── smoke.spec.ts    # Smoke tests for all pages + navigation + SEO + a11y
```

### What E2E Tests Cover

- **Page loads**: Every route renders without errors
- **Navigation**: Client-side routing between pages works
- **Accessibility basics**: Skip links, lang attribute
- **SEO**: Title and meta description present on every page
