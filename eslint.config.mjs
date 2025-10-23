import globals from "globals";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // --- Node-specific rules ---
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
		plugins: {
			js,
		},
		extends: ["js/recommended"],
		rules: {
			"no-unused-vars": "warn",
			"no-undef": "warn",
		},
	},

  // --- Browser-specific overrides ---
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
]);
