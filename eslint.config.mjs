import {defineConfig, globalIgnores} from "eslint/config";
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(["**/build/"]),
  reactHooks.configs.flat["recommended-latest"],
  tseslint.configs.recommended,
  {
    languageOptions: {
      parser: tseslint.parser
    },

    rules: {
      // Turned off in favour of the typescript version, which understands
      // function type declarations
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
      }],
      "@typescript-eslint/no-explicit-any": "off",
    },
  }]);
