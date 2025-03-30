import importPlugin from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import googleConfig from "eslint-config-google";

const googleRules = { ...googleConfig.rules };
delete googleRules["valid-jsdoc"];
delete googleRules["require-jsdoc"];

/** @type {import('eslint').Linter.Config} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports,
      react: pluginReact,
    },
    rules: {
      ...googleRules,
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
        },
      ],
      "no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", ignoreRestSiblings: true },
      ],
      "unused-imports/no-unused-imports": "error",
      semi: ["error", "always"],
    },
  },
  {
    ignores: [
      "**/dist/**",
      "**.config.cjs",
      "**.config.js",
      "**.config.ts",
      "utils.ts",
      "**/components/ui/**/*.tsx",
    ],
  },
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{jsx,tsx}"],
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
];
