import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

import { InvalidDataException } from '../shared.errors';
import { IValidationPreset } from '../shared.types';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
	constructor(
		private readonly preset: IValidationPreset,
	) {}

	transform(data: Record<string, any>, metadata: ArgumentMetadata): any { // eslint-disable-line @typescript-eslint/no-explicit-any
		const { error, value } = this.preset.schema.validate(data, this.preset.options);

		if (error) {
			throw new InvalidDataException(error, metadata.type);
		}

		return value;
	}
}
