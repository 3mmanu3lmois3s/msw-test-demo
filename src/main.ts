// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

// Importa y arranca el worker *solo en desarrollo*
if (import.meta.env?.['MODE'] === 'development') {
  // Usa import.meta.env
  import('./mocks/browser').then(({ worker }) => {
    worker.start().then(() => {
      console.log('MSW worker started');
      bootstrapApplication(AppComponent, {
        providers: [provideHttpClient()],
      }).catch((err) => console.error(err));
    });
  });
} else {
  bootstrapApplication(AppComponent, {
    providers: [provideHttpClient()],
  }).catch((err) => console.error(err));
}
