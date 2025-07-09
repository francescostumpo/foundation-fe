import { Route } from '@angular/router';
import {PortalComponent} from "./portal/portal.component";

export const appRoutes: Route[] = [
  {
    path: 'motor-quote-and-buy',
    loadChildren: () =>
      import('alpha_motor_quote_and_buy/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'portal',
    component: PortalComponent
  },
  {
    path: '',
    redirectTo: 'portal',
    pathMatch: 'full',
  },
];
