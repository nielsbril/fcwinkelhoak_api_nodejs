import { ValidationOptions } from '@hapi/joi';

export const allowUnknown: ValidationOptions = {
	abortEarly: false,
	allowUnknown: true,
};

export const stripUnknown: ValidationOptions = {
	abortEarly: false,
	stripUnknown: true,
};
