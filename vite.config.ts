// vite.config.ts  ← Use this name (Vite looks for it first)
import { defineConfig } from 'vite';           // ← Change to 'vite', not 'vitest/config'
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Server options (your existing)
  server: {
    open: true,
  },

  // Critical fixes for duplicate React instances
  resolve: {
    dedupe: [
      'react',
      'react-dom',
      'react/jsx-runtime',          // Often the hidden culprit with JSX transform
      '@tanstack/react-query',      // Helps with query client context
      'react-redux',                // Helps with store context
    ],
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
      '@tanstack/react-query',
      'react-redux',
    ],
  },

  // Keep your Vitest config if you run tests often
  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  //   setupFiles: 'src/setupTests',
  //   mockReset: true,
  // },
});
// import { defineConfig } from "vitest/config"
// import react from "@vitejs/plugin-react"

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     open: true,
//   },
//   test: {
//     globals: true,
//     environment: "jsdom",
//     setupFiles: "src/setupTests",
//     mockReset: true,
//   },
// })
