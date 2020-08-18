import Joi from '@hapi/joi';

import { IValidationPreset } from '~shared/shared.types';
import { stripUnknown } from '~shared/helpers/validation/options';

export const createGame: IValidationPreset = {
	options: stripUnknown,
	schema: Joi.object().required().keys({
		opponent: Joi.string().required().trim(),
		home: Joi.boolean().required(),
		date: Joi.string().required().isoDate(),
	}),
};
