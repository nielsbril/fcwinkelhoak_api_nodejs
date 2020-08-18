import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { logger } from '~shared/helpers/logger';

@Injectable()
export class UpcomingGameCronjob {
	@Cron(CronExpression.EVERY_5_MINUTES)
	public alertPendingPlayers(): void {
		logger.cron('Alerting pending players about the upcoming game');
	}
}
