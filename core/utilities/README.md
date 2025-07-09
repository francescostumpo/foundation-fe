# Core Utilities Library (`core/utilities`)

This TypeScript library contains reusable utility functions and singleton services
for the enterprise frontend, designed to be shared across tenants and microfrontends.

---

## Features

- Pure TypeScript utilities (no Angular dependencies)
- Built with Nx 20 using TypeScript compiler
- Supports Jest for unit testing
- Fully buildable and publishable via Nx tooling

---

## Getting Started

### Installation

Run from workspace root:

```bash
pnpm install
```

### Development

Add or update utility files inside:

```
core/utilities/src/lib/
```

For example, singleton services or helper functions.

---

## Adding a New Utility

1. Create or update TypeScript files in `core/utilities/src/lib/`
2. Export your utilities from `core/utilities/src/index.ts`
3. Write unit tests alongside utilities or in a `__tests__` folder
4. Run Jest tests:

```bash
nx test core-utilities
```

---

## Usage in Applications

Import utilities in your Angular apps or microfrontends like this:

```ts
import { timeService } from '@core/utilities';

console.log(timeService.now());
```

---

## Building

To compile the utilities library:

```bash
nx build core-utilities
```

The output will be in:

```
dist/core/utilities
```

---

## Testing

Run Jest unit tests:

```bash
nx test core-utilities
```

---

## Project Configuration

- Source root: `core/utilities/src`
- Build executor: `@nx/js:tsc` (TypeScript compiler)
- Jest executor for testing with configuration in `core/utilities/jest.config.ts`
- Assets copied from `core/utilities/*.md` on build

---
