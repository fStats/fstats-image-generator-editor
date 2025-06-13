module.exports = {
    root: true,
    env: {
        browser: true, es2020: true
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:import/recommended", "plugin:import/typescript", "plugin:react-hooks/recommended"],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest", sourceType: "module", project: "./tsconfig.json"
    },
    plugins: ["import", "react-refresh", "unused-imports", "perfectionist"],
    rules: {
        "semi": ["error", "always"],
        "quotes": ["error", "double", {avoidEscape: true, allowTemplateLiterals: true}],
        "react-refresh/only-export-components": ["warn", {allowConstantExport: true}],

        "perfectionist/sort-interfaces": ["error", {
            type: "alphabetical",
            order: "asc",
            fallbackSort: {type: "unsorted"},
            ignoreCase: true,
            specialCharacters: "keep",
            sortBy: "name",
            ignorePattern: [],
            partitionByComment: false,
            partitionByNewLine: false,
            newlinesBetween: "ignore",
            useConfigurationIf: {},
            groupKind: "mixed",
            groups: [],
            customGroups: [],
        }],

        "perfectionist/sort-modules": ["error", {
            "type": "alphabetical",
            "order": "asc",
            fallbackSort: {type: 'unsorted'},
            "groups": ["type", "interface", "enum"],
            "newlinesBetween": "ignore",
            "customGroups": [],
            "partitionByComment": false,
            "partitionByNewLine": false,
            "ignoreCase": true
        }],

        "perfectionist/sort-named-imports": ["error", {
            type: "alphabetical",
            order: "asc",
            fallbackSort: {type: "unsorted"},
            ignoreAlias: false,
            ignoreCase: true,
            specialCharacters: "keep",
            groupKind: "mixed",
            partitionByNewLine: false,
            partitionByComment: false,
            newlinesBetween: "ignore",
            groups: [],
            customGroups: [],
        }],

        "import/order": ["warn", {
            groups: ["builtin", "external", "internal", ["parent", "sibling", "index"], "object", "type"],
            pathGroups: [{
                pattern: "@**", group: "internal"
            }],
            pathGroupsExcludedImportTypes: ["builtin"],
            alphabetize: {
                order: "asc", caseInsensitive: true
            },
            "newlines-between": "always"
        }],

        "unused-imports/no-unused-vars": ["warn", {
            vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_"
        }],

        "no-restricted-imports": ["error", {
            "patterns": ["../*"]
        }]
    },
    settings: {
        "import/resolver": {
            typescript: {
                alwaysTryTypes: true, project: "./tsconfig.json"
            }
        }
    }
}
