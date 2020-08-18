import { Injectable } from '@nestjs/common';

import { name, version } from '~pkg';

import { Status } from '../classes/status';

@Injectable()
export class StatusService {
	public getStatus(): Status {
		return {
			success: true,
			name,
			version,
		};
	}
}
