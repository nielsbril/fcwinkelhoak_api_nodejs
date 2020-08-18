const { pathsToModuleNameMapper } = require('ts-jest/utils'); // eslint-disable-line @typescript-eslint/no-var-requires

const { compilerOptions } = require('./tsconfig.json'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
	displayName: 'SERVER',
	rootDir: '.',
	preset: 'ts-jest',
	testEnvironment: 'node',
	globals: {
		'ts-jest': {
			diagnostics: false,
		},
	},
	collectCoverage: true,
	collectCoverageFrom: [
		'<rootDir>/src/**/*.ts',
		'!<rootDir>/src/main.ts',
	],
	coverageDirectory: './test/coverage',
	coverageReporters: [
		'lcov',
		'text',
	],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
	moduleFileExtensions: [
		'js',
		'json',
		'ts',
	],
	modulePathIgnorePatterns: [
		'<rootDir>/dist',
	],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
	transform: {
		'.*/.(j|t)s$': 'ts-jest',
	},
	testMatch: [
		'<rootDir>/src/**/*.spec.[jt]s',
		'<rootDir>/test/**/*.spec.[jt]s',
	],
	setupFiles: [
		'<rootDir>/test/index.ts',
	],
	setupFilesAfterEnv: [
		'jest-extended',
	],
	forceExit: true,
};
