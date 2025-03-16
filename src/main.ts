// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { setupWorker } from 'msw/browser'; // Importa solo setupWorker
import { handlers } from './mocks/handlers'; // Importa los handlers

const worker = setupWorker(...handlers);

// Arranca el worker *incondicionalmente* y usa una ruta *absoluta*
worker
  .start({
    serviceWorker: {
      url: '/msw-test-demo/mockServiceWorker.js', //  RUTA ABSOLUTA
    },
  })
  .then(() => {
    console.log('[MSW] Worker started (ultra-simplified, absolute path)'); // Mensaje personalizado
    bootstrapApplication(AppComponent, {
      providers: [provideHttpClient()],
    }).catch((err) => console.error(err));
  });
