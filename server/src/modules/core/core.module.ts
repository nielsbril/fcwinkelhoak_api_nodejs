import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { Module, HttpModule, INestApplication, OnModuleInit, OnApplicationShutdown,  } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';

import { ConfigSchema } from '~shared/schemas/config';
import { logger } from '~shared/helpers/logger';
import { MigrationSchema } from '~modules/core/schemas/migration';
import { version } from '~pkg';

import { MigrationsHelper } from './helpers/migrations';
import { StatusController } from './controllers/status.controller';
import { StatusService } from './services/status.service';

@Module({
	imports: [
		HttpModule,
		MongooseModule.forFeature([
			{ name: 'Config', schema: ConfigSchema },
			{ name: 'Migration', schema: MigrationSchema },
		], 'mongo'),
	],
	controllers: [
		StatusController,
	],
	providers: [
		MigrationsHelper,
		StatusService,
	],
})
export class CoreModule implements OnModuleInit, OnApplicationShutdown {
	constructor(
		private migrationsHelper: MigrationsHelper,
	) {}

	public onModuleInit(): Promise<void> {
		return this.migrationsHelper.init();
	}

	public onApplicationShutdown(): void {
		logger.info('Server stopped, graceful shutdown');
	}

	public static initGlobalMiddleware(app: INestApplication): void {
		app.enableCors();

		app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
		app.use(bodyParser.json({ limit: '50mb' }));

		app.use(compression());

		app.use(helmet.hidePoweredBy());
		app.use(helmet.ieNoOpen());
		app.use(helmet.noSniff());
		app.use(helmet.xssFilter());
	}

	public static initSwagger(app: INestApplication): void {
		const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
			.setTitle('FC Winkelhoak: API')
			.setDescription('API for the FC Winkelhoak application')
			.setVersion(version)
			.build();

		const document: OpenAPIObject = SwaggerModule.createDocument(app, options);
		SwaggerModule.setup('docs', app, document);
	}
}
