/* eslint-disable max-classes-per-file */
import { BadRequestException, HttpStatus, Paramtype } from '@nestjs/common';
import { ValidationError, ValidationErrorItem } from '@hapi/joi';

export class InvalidDataException extends BadRequestException {
	constructor(err: ValidationError, type: Paramtype) {
		super({
			statusCode: HttpStatus.BAD_REQUEST,
			error: 'Bad Request',
			message: {
				reason: `Invalid ${/* istanbul ignore next */ type === 'param' ? 'params' : type}`,
				details: err.details.map((detail: ValidationErrorItem) => ({
					path: detail.path.join('.'),
					message: detail.message,
				})),
			},
		});
	}
}

export class MigrationsRunningException extends BadRequestException {
	constructor() {
		super('Migrations already running.');
	}
}
/* eslint-enable max-classes-per-file */
