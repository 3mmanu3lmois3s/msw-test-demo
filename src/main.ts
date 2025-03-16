import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { setupWorker } from 'msw/browser';
import { APP_BASE_HREF } from '@angular/common';
import { handlers } from './mocks/handlers';

const worker = setupWorker(...handlers);

// Se inicia el worker utilizando una ruta relativa para que funcione correctamente en GitHub Pages.
worker
  .start({
    serviceWorker: {
      url: './mockServiceWorker.js',
    },
  })
  .then(() => {
    console.log('[MSW] Worker started with relative URL');
    bootstrapApplication(AppComponent, {
      providers: [
        provideHttpClient(),
        { provide: APP_BASE_HREF, useValue: '/msw-test-demo/' },
      ],
    }).catch((err) => console.error(err));
  });
