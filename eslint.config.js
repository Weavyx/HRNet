/**
 * @fileoverview Configuration ESLint basique pour un projet React.
 * Configuration simple utilisant le format flat config (ESLint 9+) avec les règles essentielles
 * pour maintenir un code propre et cohérent.
 */

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

/**
 * Configuration ESLint basique pour React avec Vite.
 * Format flat config natif (ESLint 9+) - export direct d'un tableau de configurations.
 */
export default [
  /** Configuration globale pour ignorer les fichiers de build et temporaires */
  {
    ignores: [
      "dist/**/*",
      "build/**/*",
      "node_modules/**/*",
      "coverage/**/*",
      "*.min.js",
      "*.bundle.js",
      ".vite/**/*",
    ],
  },

  /** Configuration basique pour les fichiers JavaScript et JSX */
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2024,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      /** Règles de base JavaScript recommandées */
      ...js.configs.recommended.rules,

      /** Règles React Hooks recommandées */
      ...reactHooks.configs.recommended.rules,

      /** Règles React Refresh pour Vite */
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      /** Variables non utilisées - Configuration souple pour React */
      "no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^[A-Z]|^_",
          argsIgnorePattern: "^_",
        },
      ],

      /** Variables et portée - Règles de base */
      "prefer-const": "warn",
      "no-var": "error",

      /** Console - Autoriser en développement */
      "no-console": "off",
      "no-debugger": "warn",

      /** Formatage basique */
      semi: ["error", "always"],
      "comma-dangle": ["warn", "always-multiline"],
      "comma-spacing": ["error", { before: false, after: true }],

      /** Règles JSX */
      "jsx-quotes": ["error", "prefer-double"],

      /** Règles de bonnes pratiques basiques */
      eqeqeq: ["error", "always"],
      "no-eval": "error",
      "no-implied-eval": "error",
      "prefer-template": "warn",
      "no-useless-concat": "warn",
    },
  },

  /** Configuration pour les fichiers de configuration */
  {
    files: ["*.config.{js,mjs}", "vite.config.js", "eslint.config.js"],
    rules: {
      "no-console": "off",
    },
  },
];
