# Core Widgets Library (`core/widgets`)

This Angular library contains reusable UI widgets for the enterprise frontend, designed to be shared across tenants and microfrontends.

---

## Features

- Modular Angular components (e.g., buttons, inputs, cards)
- Built with Angular 20 and Nx 20
- Supports Storybook for isolated component development and documentation
- Jest for unit testing
- Fully buildable and publishable via Nx tooling

---

## Getting Started

### Installation

Run from workspace root:

```bash
pnpm install
```

### Development

To serve Storybook for interactive component development:

```bash
nx run core-widgets:storybook
```

This will start Storybook and open the UI to browse and interact with components.

---

## Adding a New Component

1. Create your component in `libs/core/widgets/src/lib/`
2. Add Storybook stories alongside the component with `.stories.ts`
3. Write unit tests in the same folder or a `__tests__` folder
4. Run Storybook to verify your component visually
5. Run Jest tests:

```bash
nx test core-widgets
```

---

## Usage in Applications

Import the library module or component directly in your Angular apps or microfrontends:

```ts
import { ButtonComponent } from '@core/widgets';
// Use <c-widget-button [label]="myLabel"></c-widget-button> in your templates
```

---

## Building

To build the widgets library for production or publishing:

```bash
nx build core-widgets
```

---

## Testing

Run Jest unit tests:

```bash
nx test core-widgets
```

---

## Storybook Configuration

Storybook config files live in:

```
libs/core/widgets/.storybook/
```

Stories are located inside component folders as `.stories.ts` files, following this glob pattern:

```json
"../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"
```

---
