// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'; // Importa desde 'msw'

export const handlers = [
  http.get('/msw-test-demo/api/heroes', () => {
    // Ruta ABSOLUTA
    return HttpResponse.json([
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
    ]);
  }),
];
