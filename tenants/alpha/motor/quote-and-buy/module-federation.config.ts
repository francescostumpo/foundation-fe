import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'alpha-motor-quote-and-buy',
  exposes: {
    './Routes': 'tenants/alpha/motor/quote-and-buy/src/app/entry.routes.ts',
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
