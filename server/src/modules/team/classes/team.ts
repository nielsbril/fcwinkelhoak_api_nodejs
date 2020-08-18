/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';

class Playground {
	@ApiProperty({
		description: 'Name',
	})
	name: string;

	@ApiProperty({
		description: 'Street',
	})
	street: string;

	@ApiProperty({
		description: 'House number',
	})
	houseNumber: string;

	@ApiProperty({
		description: 'Zipcode',
	})
	zipCode: number;

	@ApiProperty({
		description: 'City',
	})
	city: string;
}

export class Team {
	@ApiProperty({
		description: 'Id',
	})
	id?: string;

	@ApiProperty({
		description: 'Name',
	})
	name: string;

	@ApiProperty({
		description: 'Colors',
	})
	colors: string;

	@ApiProperty({
		description: 'Playground',
	})
	playground: Playground;

	@ApiProperty({
		description: 'FC Winkelhoak indicator',
	})
	isSelf: boolean;

	@ApiProperty({
		description: 'Created timestamp',
	})
	createdAt?: string | Date;

	@ApiProperty({
		description: 'Updated timestamp',
	})
	updatedAt?: string | Date;
}
/* eslint-enable max-classes-per-file */
