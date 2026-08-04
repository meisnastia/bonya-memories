import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  { ignores: ["node_modules/**"] },
  {
    // Конфиги и тесты выполняются в Node как ES-модули
    files: ["**/*.mjs", "*.config.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.node,
    },
  },
  {
    // Скрипт сайта грузится как классический <script> в браузере
    files: ["script.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: globals.browser,
    },
  },
];
