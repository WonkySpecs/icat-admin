import {defineConfig, globalIgnores} from "eslint/config";
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import {fileURLToPath} from "node:url";
import js from "@eslint/js";
import {FlatCompat} from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  globalIgnores(["**/build/"]),
  reactHooks.configs.flat["recommended-latest"],
  tseslint.configs.recommended,
  {
    extends: compat.extends(
      "preact",
    ),

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