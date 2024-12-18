import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";


/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: [ "**/*.{js,mjs,cjs,jsx}" ],
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                route: 'readonly', // Declare 'route' as a global variable (without reassignment)
                axios: 'readonly', // Declare 'route' as a global variable (without reassignment)
                window: 'readonly', // Declare 'route' as a global variable (without reassignment)
                console: 'readonly', // Declare 'route' as a global variable (without reassignment)
                document: 'readonly', // Declare 'route' as a global variable (without reassignment)
            },
        }
    },

    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    pluginReact.configs.flat[ 'jsx-runtime' ],
    {
        rules: {
            "no-unused-vars": "warn",
            'react/prop-types': 'off',
        }
    }


];
