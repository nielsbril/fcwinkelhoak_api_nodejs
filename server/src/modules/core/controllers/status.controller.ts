import { ApiTags, ApiOkResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { Status } from '../classes/status';
import { StatusService } from '../services/status.service';

@Controller('status')
@ApiTags('status')
export class StatusController {
	constructor(
		private readonly statusService: StatusService,
	) {}

	@Get()
	@ApiOkResponse({ description: 'OK', type: Status })
	@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
	public getStatus(): Status {
		return this.statusService.getStatus();
	}
}
