// src/mocks/browser.ts
import { setupWorker } from 'msw/browser'; //Importa desde msw/browser
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
