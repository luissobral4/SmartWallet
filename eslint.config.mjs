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
            'spaced-comment': 'off',
            'no-console': 'warn',
            'consistent-return': 'off',
            'func-names': 'off',
            'object-shorthand': 'off',
            'no-process-exit': 'off',
            'no-param-reassign': 'off',
            'no-return-await': 'off',
            'no-underscore-dangle': 'off',
            'class-methods-use-this': 'off',
            'prefer-destructuring': ['error', { object: true, array: false }],
            'no-unused-vars': [
                'error',
                { argsIgnorePattern: 'req|res|next|val|err' }
            ]
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
