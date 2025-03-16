import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { setupWorker } from 'msw/browser'; // setupWorker viene de msw/browser
import { http, HttpResponse } from 'msw'; // http y HttpResponse vienen de msw
import { importProvidersFrom } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

const handlers = [
  http.get('/msw-test-demo/api/heroes', () => {
    //  RUTA ABSOLUTA CON REPO
    return HttpResponse.json([
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
    ]);
  }),
];
const worker = setupWorker(...handlers);

// Arranca el worker *incondicionalmente* y usa una ruta *absoluta*
worker
  .start({
    serviceWorker: {
      url: '/msw-test-demo/mockServiceWorker.js', //  RUTA ABSOLUTA, CON REPO
    },
  })
  .then(() => {
    console.log('[MSW] Worker started (simplified, absolute path)'); // Mensaje personalizado
    bootstrapApplication(AppComponent, {
      providers: [
        provideHttpClient(),
        { provide: APP_BASE_HREF, useValue: '/msw-test-demo/' }, //  USA APP_BASE_HREF
      ],
    }).catch((err) => console.error(err));
  });
