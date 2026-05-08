import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    return {
      server: {
        port: 3009,
        host: true,
      },
      plugins: [react()],
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor-react': ['react', 'react-dom', 'react-router-dom'],
              'vendor-supabase': ['@supabase/supabase-js'],
              'vendor-icons': ['lucide-react'],
            },
          },
        },
        chunkSizeWarningLimit: 1000,
      },
    };
});
