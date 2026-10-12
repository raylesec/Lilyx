import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração mínima do Vite para o projeto LILYX.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false
  }
});