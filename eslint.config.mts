import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node
    },
    rules: {
      ...js.configs.recommended.rules,

      "space-before-function-paren": [
        "error",
        {
          anonymous: "always",
          named: "always",
          asyncArrow: "always"
        }
      ],
      "semi": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"]
    }
  },
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: process.cwd(),
        sourceType: "module"
      },
      globals: globals.node
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin
    },
    rules: {
      ...tseslint?.configs?.recommended?.[0]?.rules,
      "space-before-function-paren": "off",
      "semi": "off",
      "@typescript-eslint/space-before-function-paren": [
        "error",
        {
          anonymous: "always",
          named: "always",
          asyncArrow: "always"
        }
      ],
      "@typescript-eslint/semi": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"]
    }
  }
]);
