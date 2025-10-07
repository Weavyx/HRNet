import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // PWA pour mise en cache et performances - Mode prompt pour éviter le blocage
    VitePWA({
      registerType: "prompt",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        // Configuration non-bloquante
        skipWaiting: false,
        clientsClaim: false,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 an
              },
            },
          },
        ],
      },
    }),
    // Analyseur de bundle
    visualizer({
      filename: "dist/stats.html",
      open: false,
    }),
  ],
  build: {
    // Optimisation progressive - séparation d'ag-grid seulement
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Séparer ag-grid en deux chunks pour une meilleure optimisation
          if (id.includes("ag-grid-community")) {
            return "ag-grid-community";
          }
          if (id.includes("ag-grid-react")) {
            return "ag-grid-react";
          }
          // Séparer Redux
          if (id.includes("@reduxjs/toolkit") || id.includes("react-redux")) {
            return "redux";
          }
          // Séparer React Router
          if (id.includes("react-router")) {
            return "router";
          }
          // Séparer les autres node_modules en vendor-libs
          if (id.includes("node_modules")) {
            return "vendor-libs";
          }
        },
      },
    },
    // Compression basique et sûre
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Supprimer les console.log en production
        drop_debugger: true,
        passes: 2, // Deux passes d'optimisation
        pure_funcs: ["console.log", "console.warn", "console.info"], // Supprimer ces fonctions
        reduce_vars: true, // Réduction des variables
        unsafe_math: true, // Optimisations mathématiques sûres
        unsafe_comps: true, // Optimisations de comparaison sûres
      },
      mangle: {
        safari10: true, // Compatibilité Safari 10
        properties: false, // Ne pas toucher aux propriétés (sûr pour React 18)
      },
    },
    // Optimiser la taille des chunks - ag-grid-community est naturellement volumineux
    chunkSizeWarningLimit: 1000,
    // Optimiser les CSS
    cssCodeSplit: true,
  },
  // Optimisations pour le développement
  server: {
    hmr: {
      overlay: false,
    },
  },
});
