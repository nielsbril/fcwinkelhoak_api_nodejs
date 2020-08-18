/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';

import { Team } from '~modules/team/classes/team';

class Result {
	@ApiProperty({
		description: 'Goals home',
	})
	goalsHome: number;

	@ApiProperty({
		description: 'Goals away',
	})
	goalsAway: number;
}

export class Game {
	@ApiProperty({
		description: 'Id',
	})
	id?: string;

	@ApiProperty({
		description: 'Opponent',
	})
	opponent: string | Team;

	@ApiProperty({
		description: 'Home',
	})
	home: boolean;

	@ApiProperty({
		description: 'Date',
	})
	date: Date;

	@ApiProperty({
		description: 'Result',
	})
	result: Result;

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
