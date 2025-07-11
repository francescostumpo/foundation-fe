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
import { cacheService } from '@core/utilities';
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

## Services Provided

### Cache Service (`cacheService`)

A service to store and retrieve data with TTL support in either localStorage or sessionStorage.

- `clean(isPersistent: boolean): void` - Clears all cached data from either localStorage or sessionStorage.
- `storage<T>(name: string, isPersistent: boolean, data?: T, ttl?: number): T | undefined` - Get or set cache item with TTL.
- `deleteItem(name: string, isPersistent: boolean): void` - Delete a specific cache entry.
- `deleteItemsByKeyFilter(filter: string, isPersistent: boolean): void` - Delete multiple cache entries by partial key matching.
- `getTtl(timeType: 'day' | 'month' | 'year' | 'hour' | 'half'): number` - Get standard TTL values in seconds.

---

### Translate Service (`TranslateService`)

A singleton service for managing i18n translations with runtime language switching and key-based translation lookup.

- `setLang(lang: string): Promise<void>` - Loads translations for the specified language.
- `translate(key: string, params?: Record<string, any>): string` - Translates keys with optional parameter replacement.
- Observable property `lang$` to subscribe to current language changes.

---

### Logger Service (`loggerService`)

A simple logging utility to print timestamped info, warning, and error messages.

- `info(message: any): void`
- `warn(message: any): void`
- `error(message: any): void`

---

### Event Bus Service (`eventBusService`)

A publish-subscribe event bus to register event handlers and emit events globally.

- `on(type: EventType, handler: Handler): void` - Register handler for event type.
- `off(type: EventType, handler: Handler): void` - Unregister handler.
- `emit(type: EventType, event: any): void` - Emit event to all handlers.
- `once(type: EventType, handler: Handler): void` - Register handler that is called once.
- `offOnce(type: EventType, handler: Handler): void` - Unregister once handler.
- `onWildcard(handler: Handler): void` - Register handler for all event types.
- `offWildcard(handler: Handler): void` - Unregister wildcard handler.

---
