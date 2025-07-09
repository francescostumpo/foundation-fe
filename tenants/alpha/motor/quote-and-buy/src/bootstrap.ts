import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { MotorDetailsComponent } from './app/motor-details/motor-details.component';

bootstrapApplication(MotorDetailsComponent, appConfig).catch((err) =>
  console.error(err)
);
