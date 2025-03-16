// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/heroes', () => {
    //  RUTA RELATIVA
    return HttpResponse.json([
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
    ]);
  }),
];
