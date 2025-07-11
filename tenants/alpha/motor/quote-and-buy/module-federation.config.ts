import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'alpha-motor-quote-and-buy',
  exposes: {
    './Routes': 'tenants/alpha/motor/quote-and-buy/src/app/entry.routes.ts',
  },
};

export default config;
