/**
 * @fileoverview Configuration Vite pour l'application HRNet.
 * Inclut la configuration React, PWA, optimisations de build et analyse de bundle.
 * @see {@link https://vite.dev/config/}
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";

/**
 * Configuration Vite pour l'optimisation et le build de l'application.
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  plugins: [
    react(),
    /**
     * Configuration PWA pour la mise en cache et les performances.
     * Mode prompt utilisé pour éviter les mises à jour automatiques bloquantes.
     */
    VitePWA({
      registerType: "prompt",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        /** Configuration non-bloquante pour éviter les mises à jour forcées */
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
                maxAgeSeconds: 60 * 60 * 24 * 365 /** Cache pendant 1 an */,
              },
            },
          },
        ],
      },
    }),
    /**
     * Plugin d'analyse de bundle pour visualiser la taille des chunks.
     */
    visualizer({
      filename: "dist/stats.html",
      open: false,
    }),
  ],
  build: {
    /**
     * Configuration d'optimisation progressive avec séparation stratégique des chunks.
     * Optimise le chargement et la mise en cache des dépendances.
     */
    rollupOptions: {
      output: {
        /**
         * Fonction de séparation manuelle des chunks pour optimiser la mise en cache.
         * @param {string} id - L'ID du module à traiter
         * @returns {string|undefined} Le nom du chunk ou undefined pour le chunk principal
         */
        manualChunks: (id) => {
          /** Séparer ag-grid en deux chunks pour une meilleure optimisation */
          if (id.includes("ag-grid-community")) {
            return "ag-grid-community";
          }
          if (id.includes("ag-grid-react")) {
            return "ag-grid-react";
          }
          /** Séparer Redux pour une gestion d'état isolée */
          if (id.includes("@reduxjs/toolkit") || id.includes("react-redux")) {
            return "redux";
          }
          /** Séparer React Router pour la navigation */
          if (id.includes("react-router")) {
            return "router";
          }
          /** Regrouper les autres dépendances externes */
          if (id.includes("node_modules")) {
            return "vendor-libs";
          }
        },
      },
    },
    /**
     * Configuration de compression basique et sûre avec Terser.
     */
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true /** Supprimer les console.log en production */,
        drop_debugger: true,
        passes: 2 /** Deux passes d'optimisation pour une meilleure compression */,
        pure_funcs: [
          "console.log",
          "console.warn",
          "console.info",
        ] /** Supprimer ces fonctions spécifiques */,
        reduce_vars: true /** Réduction des variables pour moins de code */,
        unsafe_math: true /** Optimisations mathématiques sûres */,
        unsafe_comps: true /** Optimisations de comparaison sûres */,
      },
      mangle: {
        safari10: true /** Compatibilité Safari 10 */,
        properties: false /** Ne pas toucher aux propriétés (sûr pour React 18) */,
      },
    },
    /** Augmenter la limite d'avertissement - ag-grid-community est naturellement volumineux */
    chunkSizeWarningLimit: 1000,
    /** Activer la division des CSS pour un chargement optimisé */
    cssCodeSplit: true,
  },
  // Optimisations pour le développement
  server: {
    hmr: {
      overlay: false,
    },
  },
});
