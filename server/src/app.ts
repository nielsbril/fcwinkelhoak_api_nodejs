import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { CoreModule } from '~modules/core/core.module';
import { logger } from '~shared/helpers/logger';

import { AppModule } from './app.module';

export async function bootstrap(): Promise<INestApplication> {
	const app: INestApplication = await NestFactory.create(
		AppModule,
		{
			bodyParser: false,
			logger: true,
		},
	);
	const configService: ConfigService = app.get(ConfigService);

	// Initialize global middleware
	CoreModule.initGlobalMiddleware(app);

	// Initialize Swagger documentation
	if (configService.get<boolean>('state.docs', false)) {
		CoreModule.initSwagger(app);
	}

	await app.enableShutdownHooks();
	await app.listen(configService.get<number>('server.port', 4444), () => {
		logger.info(`Server running on ${configService.get<string>('state.env', 'local')} environment at port ${configService.get<number>('server.port', 4444)}`);
	});

	return app;
}
