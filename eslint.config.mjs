import {defineConfig, globalIgnores} from "eslint/config";
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import tsParser from "@typescript-eslint/parser";

export default defineConfig([
  globalIgnores(["**/build/"]),
  reactHooks.configs.flat["recommended-latest"],
  tseslint.configs.recommended,
  {
    languageOptions: {
      parser: tsParser,
    },

    rules: {
      "prefer-template": "off",
      radix: "off",

      // Turned off in favour of the typescript version, which understands
      // function type declarations
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
      }],

      "react/jsx-tag-spacing": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "jest/no-deprecated-functions": "off",
    },
  }]);