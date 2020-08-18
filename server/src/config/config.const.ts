import Env from '@studiohyperdrive/env';

import { IConfig, Environment } from './config.types';

export const config: () => IConfig = () => ({
	state: {
		env: Env.get('NODE_ENV') as Environment,
		docs: Env.getAsBoolean('STATE_DOCS'),
		production: Env.getAsBoolean('STATE_PRODUCTION'),
		test: Env.getAsBoolean('STATE_TEST'),
	},
	server: {
		host: Env.get('HOST'),
		port: Env.getAsNumber('PORT'),
		timezone: Env.get('TZ'),
		migration: Env.get('MIGRATION'),
	},
	logger: {
		enabledLevels: Env.getAsArray('LOGGER_ENABLED_LEVELS'),
	},
	mongodb: {
		url: Env.get('MONGODB_URL'),
		name: Env.get('MONGODB_NAME'),
		replicaSet: Env.get('MONGODB_REPLICASET', true),
		auth: {
			user: Env.get('MONGODB_AUTH_USER', true),
			pass: Env.get('MONGODB_AUTH_PASS', true),
			db: Env.get('MONGODB_AUTH_DB', true),
		},
	},
	auth: {
		jwt: {
			secret: Env.get('JWT_SECRET'),
		},
	},
	pagination: {
		size: Env.get('PAGINATION_SIZE'),
	},
});
