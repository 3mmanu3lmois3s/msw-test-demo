// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'; // Importa desde msw/http

export const handlers = [
  http.get('/api/heroes', () => {
    //Usa http.get
    return HttpResponse.json([
      //Usa HttpResponse.json
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
    ]);
  }),
];
