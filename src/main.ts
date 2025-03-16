import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { worker } from './mocks/browser';
import { importProvidersFrom } from '@angular/core'; // Importa esto
import { APP_BASE_HREF } from '@angular/common'; // Importa esto

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
        importProvidersFrom([]),
        { provide: APP_BASE_HREF, useValue: '/msw-test-demo/' }, // Añade esto
      ],
    }).catch((err) => console.error(err));
  });
