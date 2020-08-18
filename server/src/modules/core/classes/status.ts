import { ApiProperty } from '@nestjs/swagger';

export class Status {
	@ApiProperty({
		description: 'Server status',
	})
	success: boolean;

	@ApiProperty({
		description: 'Server name',
	})
	name: string;

	@ApiProperty({
		description: 'Server version',
	})
	version: string;
}
