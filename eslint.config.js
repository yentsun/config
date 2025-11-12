export default [
    {
        ignores: ['node_modules/**', 'coverage/**']
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                process: 'readonly',
                console: 'readonly'
            }
        },
        rules: {
            // Code Quality
            'no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none' }
            ],
            'no-console': 'off',
            'prefer-const': 'error',
            'no-var': 'error',

            // Spacing Rules
            'padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: 'import', next: '*' },
                { blankLine: 'any', prev: 'import', next: 'import' }
            ],
            indent: ['error', 4, { SwitchCase: 1 }],
            'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
            'no-trailing-spaces': 'error',

            // Style Rules
            quotes: ['error', 'single', { avoidEscape: true }],
            semi: ['error', 'always'],
            'comma-dangle': ['error', 'never'],
            'arrow-parens': ['error', 'always'],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'comma-spacing': ['error', { before: false, after: true }],
            'key-spacing': ['error', { beforeColon: false, afterColon: true }],
            'space-before-blocks': 'error',
            'keyword-spacing': 'error'
        }
    },
    {
        files: ['test.js', 'test_configs/**'],
        languageOptions: {
            globals: {
                describe: 'readonly',
                it: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                before: 'readonly',
                after: 'readonly'
            }
        }
    }
];
