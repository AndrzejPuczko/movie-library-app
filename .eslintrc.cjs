module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: 'standard-with-typescript',
	overrides: ['plugin:prettier/recommended'],
	plugins: ['prettier'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'prettier/prettier': 'error',
	},
}
