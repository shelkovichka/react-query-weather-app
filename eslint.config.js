import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser"; // Подключаем парсер TypeScript
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    // Настраиваем файлы для проверки
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,

  {
    ...tseslint.configs.recommended,
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // Настройки для React
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off", // Не требовать React в scope (актуально с новым JSX Runtime)
      "react/prop-types": "off",
    },
  },

  {
    rules: {
      semi: ["error", "always"], // Обязательная точка с запятой
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Игнорировать переменные с префиксом "_"
      "no-console": "warn", // Предупреждение при использовании console
    },
  },
];
