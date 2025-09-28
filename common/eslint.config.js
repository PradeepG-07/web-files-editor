import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: [
            '**/lib/*.{js,mjs,cjs,ts,mts,cts}',
            '**/tests/*.{js,mjs,cjs,ts,mts,cts}',
        ],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: {
            globals: { ...globals.browser, ...globals.jest },
            parserOptions: {
                project: ['./tsconfig.json', './tests/tsconfig.spec.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        ignores: ['dist/**/*'],
    },

    tseslint.configs.recommended,
]);
