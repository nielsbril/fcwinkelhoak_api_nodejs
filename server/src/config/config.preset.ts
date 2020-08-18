import Joi from '@hapi/joi';

import { allowUnknown } from '~shared/helpers/validation/options';
import { IValidationPreset } from '~shared/shared.types';

import { Environment } from './config.types';

export const configValidationPreset: IValidationPreset = {
	options: allowUnknown,
	schema: Joi.object().required().keys({
		NODE_ENV: Joi.string().required().valid(
			Environment.local,
			Environment.test,
			Environment.development,
			Environment.staging,
			Environment.production,
		),
		STATE_DOCS: Joi.boolean().default(false),
		STATE_PRODUCTION: Joi.boolean().default(false),
		STATE_TEST: Joi.boolean().default(false),
		HOST: Joi.string().required(),
		PORT: Joi.number().required(),
		TZ: Joi.string().required(),
		MIGRATION: Joi.string().required(),
		LOGGER_ENABLED_LEVELS: Joi.string().required(),
		MONGODB_NAME: Joi.string().required(),
		MONGODB_URL: Joi.string().required(),
		MONGODB_REPLICASET: Joi.string().required().allow(''),
		MONGODB_AUTH_USER: Joi.string().required().allow(''),
		MONGODB_AUTH_PASS: Joi.string().required().allow(''),
		MONGODB_AUTH_DB: Joi.string().required().allow(''),
		JWT_SECRET: Joi.string().required(),
		PAGINATION_SIZE: Joi.string().required(),
	}),
};
