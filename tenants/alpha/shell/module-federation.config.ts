import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'alpha-shell',
  remotes: ['alpha-motor-quote-and-buy'],
};

export default config;
