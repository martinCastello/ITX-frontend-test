import js from '@eslint/js';
import globals from 'globals';

const vitestGlobals = {
	describe: 'readonly',
	it: 'readonly',
	expect: 'readonly',
	beforeEach: 'readonly',
	afterEach: 'readonly',
	beforeAll: 'readonly',
	afterAll: 'readonly',
	vi: 'readonly',
	test: 'readonly',
};

export default [
	js.configs.recommended,
	{
		files: ['src/**/*.{js,jsx}'],
		languageOptions: {
			globals: {
				...globals.browser,
			},
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: 'module',
				ecmaFeatures: { jsx: true },
			},
		},
		rules: {
			'no-unused-vars': ['warn', {
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^[A-Z]',
			}],
		},
	},
	{
		files: ['src/**/*.test.{js,jsx}'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...vitestGlobals,
			},
		},
	},
];
