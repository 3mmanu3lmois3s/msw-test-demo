import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';
import { APP_BASE_HREF } from '@angular/common';

const handlers = [
  http.get('/msw-test-demo/api/heroes', () => {
    return HttpResponse.json([
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
    ]);
  }),
];

const worker = setupWorker(...handlers);

if ('serviceWorker' in navigator) {
  // Registra el service worker manualmente
  navigator.serviceWorker
    .register('/msw-test-demo/mockServiceWorker.js', {
      scope: '/msw-test-demo/',
    })
    .then((registration) => {
      console.log('Service Worker registrado exitosamente:', registration);
      // Una vez registrado, iniciar MSW
      return worker.start();
    })
    .then(() => {
      console.log('[MSW] Worker started');
      // Arranca la aplicación Angular
      bootstrapApplication(AppComponent, {
        providers: [
          provideHttpClient(),
          { provide: APP_BASE_HREF, useValue: '/msw-test-demo/' },
        ],
      }).catch((err) => console.error(err));
    })
    .catch((error) => {
      console.error('Error al registrar el Service Worker:', error);
    });
} else {
  // Si el navegador no soporta Service Workers, inicia la app directamente
  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),
      { provide: APP_BASE_HREF, useValue: '/msw-test-demo/' },
    ],
  }).catch((err) => console.error(err));
}
