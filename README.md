# Microfrontend Project - Alpha Shell and Alpha Motor Quote and Buy

## Overview

This project uses **Nx** with Angular to implement a microfrontend (MFE) architecture.  
The **shell app (alpha-shell)** acts as the host and router, loading different remote Angular applications dynamically at runtime using **Module Federation** powered by the Nx module federation plugin.

The main remote currently integrated is:

- **alpha-motor-quote-and-buy**: Provides the "Quote and Buy" motor journey feature.

Other independent utilities live in separate Nx lib with its own README file.

## Architecture

- **Shell (alpha-shell)**: The host app. It defines routes and lazy-loads remotes using dynamic imports through Module Federation.
- **Remote (alpha-motor-quote-and-buy)**: Exposes Angular routes and components remotely. It is built and served independently.
- **Shared libs**: Common widgets and utilities used by both shell and remotes [NDBX](https://ngx-ndbx.frameworks.allianz.io/documentation/pagination/overview).

## Getting Started

### Prerequisites

- Node.js (recommended version)
- Nx CLI installed globally (`npm i -g nx` or `pnpm i -g nx`)
- Angular CLI compatible with Angular 20.x
- pnpm for package management

### Running Locally

1. **Install dependencies**:

```bash
pnpm install
```

2. **Start the remote app** (motor quote and buy):

```bash
nx serve alpha-motor-quote-and-buy
```

This will start the remote on `http://localhost:4201` and expose `remoteEntry.js`.

3. **Start the shell app**:

```bash
nx serve alpha-shell
```

The shell will run on `http://localhost:4200`. It loads the remote dynamically when you navigate to the route (e.g., `/motor-quote-and-buy`).

### Building for Production

Use Nx build commands:

```bash
nx build alpha-shell --prod
nx build alpha-motor-quote-and-buy --prod
```

### Module Federation Setup

- The shell config lists remotes by their name and URL.
- Each remote exposes modules or routes that can be lazy loaded by the shell.
- Shared dependencies are configured to avoid duplication.
- Nx plugin handles Webpack Module Federation config generation.
- shell and remotes can be created as follows and adapted

```bash
nx g @nx/angular:app --name=alpha-motor-quote-and-buy --directory=tenants/alpha/motor/quote-and-buy
nx g @nx/angular:app --name=alpha-shell --directory=tenants/alpha/shell
nx g @nx/angular:setup-mf alpha-shell --mfType=host --remotes=alpha-motor-quote-and-buy
nx g @nx/angular:setup-mf alpha-motor-quote-and-buy --mfType=remote --host=alpha-shel
```

## Routing

- The shell defines routes and lazy loads remote routes from the remote apps.
- Remotes export `remoteRoutes` that the shell imports using dynamic module federation imports.
- Remote routes use an empty path to bootstrap the remote entry component.

## Troubleshooting

- Ensure ports don't conflict and both shell and remotes are running.
- Clear Nx and node_modules cache if changes don’t reflect.
- Verify `remoteEntry.js` is reachable from the shell app URL.
- Use Nx console or logging to debug federation issues.

## Further Reading

- Nx Module Federation Plugin: https://nx.dev/packages/module-federation
- Angular Module Federation Tutorial: https://angular.io/guide/module-federation
- Official Nx Documentation: https://nx.dev/

---

Utilities README files is located in the respective lib folder.

---

Feel free to extend this README with specific commands, architecture diagrams, or environment setup notes.
