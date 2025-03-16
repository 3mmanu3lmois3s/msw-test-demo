import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';
import { importProvidersFrom } from '@angular/core';
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

worker
  .start({
    serviceWorker: {
      url: '/msw-test-demo/mockServiceWorker.js',
    },
  })
  .then(() => {
    console.log('[MSW] Worker started (simplified, absolute path)');
    bootstrapApplication(AppComponent, {
      providers: [
        provideHttpClient(),
        { provide: APP_BASE_HREF, useValue: '/msw-test-demo/' },
      ],
    }).catch((err) => console.error(err));
  });
