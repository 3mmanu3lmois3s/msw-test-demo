// src/global.d.ts
declare global {
  interface ImportMeta {
    env: {
      MODE: string; // Puedes añadir otras variables de entorno aquí si las usas
      //  [key: string]: string | boolean | undefined; // O, más genérico
    };
  }
}
export {};
