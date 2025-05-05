import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/PokerApp/', // 👈 Esto es clave para que funcione en la subruta
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Podés poner true si necesitás debug
  },
  server: {
    port: 5173,
  },
});
