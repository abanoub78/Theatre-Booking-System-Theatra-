import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

bootstrapApplication(App, {
  providers: [...appConfig.providers, provideRouter(routes)],
}).catch((err) => console.error(err));
