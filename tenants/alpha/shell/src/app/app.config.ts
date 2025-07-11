import {
  APP_BOOTSTRAP_LISTENER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TranslateService } from '@core/utilities';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: APP_BOOTSTRAP_LISTENER,
      multi: true,
      deps: [TranslateService],
      useFactory: (i18n: TranslateService) => {
        return async () => {
          await i18n.init({
            default: 'en',
            supported: ['en', 'it'],
          });
        };
      },
    },
  ],
};
