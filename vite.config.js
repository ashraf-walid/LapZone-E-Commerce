import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { basePath } from './config/basePath'; // Import base path

export default defineConfig({
  // Use dynamic base based on environment
  // Specify the base path for static files in your application.
  
  // base: './',
  base: '/LapZone-E-Commerce',

  // Add React plugin
  plugins: [react()],
  
  // Build configuration with rollupOptions for manualChunks
  // You will find a separate file containing the React libraries (eg vendor.[hash].js).
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Separate React libraries into a vendor chunk
        },
      },
    },
  },
});
