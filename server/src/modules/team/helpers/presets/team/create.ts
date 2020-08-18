import Joi from '@hapi/joi';

import { IValidationPreset } from '~shared/shared.types';
import { stripUnknown } from '~shared/helpers/validation/options';

export const createTeam: IValidationPreset = {
	options: stripUnknown,
	schema: Joi.object().required().keys({
		name: Joi.string().required().trim(),
		colors: Joi.string().required().trim(),
		playground: Joi.object().required().keys({
			name: Joi.string().required().trim(),
			street: Joi.string().required().trim(),
			houseNumber: Joi.string().required().trim(),
			zipCode: Joi.number().required(),
			city: Joi.string().required().trim(),
		}),
	}),
};
