import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { setupWorker } from 'msw/browser';
import { importProvidersFrom } from '@angular/core'; // Importa importProvidersFrom
import { APP_BASE_HREF } from '@angular/common';
import { handlers } from './mocks/handlers'; // Importa los handlers

const worker = setupWorker(...handlers);

// Arranca el worker *SIEMPRE* para la demo, y usa una ruta *absoluta*
worker
  .start({
    serviceWorker: {
      url: '/msw-test-demo/mockServiceWorker.js', // RUTA ABSOLUTA, CON REPO
    },
  })
  .then(() => {
    console.log('[MSW] Worker started (GitHub Pages, APP_BASE_HREF)');
    bootstrapApplication(AppComponent, {
      providers: [
        provideHttpClient(),
        { provide: APP_BASE_HREF, useValue: '/msw-test-demo/' }, // USA APP_BASE_HREF
      ],
    }).catch((err) => console.error(err));
  });
