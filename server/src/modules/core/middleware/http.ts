import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { logger } from '~shared/helpers/logger';

@Injectable()
export class HTTPLoggerMiddleware implements NestMiddleware {
	public use(req: Request, res: Response, next: NextFunction): void {
		logger.debug(`${req.method} ${req.baseUrl}`);
		next();
	}
}
