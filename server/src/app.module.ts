import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthModule } from '~modules/auth/auth.module';
import { config } from '~config/config.const';
import { configValidationPreset } from '~config/config.preset';
import { CoreModule } from '~modules/core/core.module';
import { GameModule } from '~modules/game/game.module';
import { HTTPLoggerMiddleware } from '~modules/core/middleware/http';
import { logger } from '~shared/helpers/logger';
import { TeamModule } from '~modules/team/team.module';

@Module({
	imports: [
		// Nest.js modules
		ConfigModule.forRoot({
			ignoreEnvFile: true,
			isGlobal: true,
			load: [config],
			validationOptions: configValidationPreset.options,
			validationSchema: configValidationPreset.schema,
		}),
		MongooseModule.forRootAsync({
			connectionName: 'mongo',
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				// Connection
				uri: `${configService.get<string>('mongodb.url')}/${configService.get<string>('mongodb.name')}`,
				replicaSet: configService.get<string>('mongodb.replicaSet'),
				// Authentication
				authSource: configService.get<string>('mongodb.auth.db'),
				pass: configService.get<string>('mongodb.auth.pass'),
				user: configService.get<string>('mongodb.auth.user'),
				// Options
				useCreateIndex: true,
				useFindAndModify: false,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				// Hooks
				connectionFactory: (connection: Connection) => {
					connection.setMaxListeners(0);

					connection.on('open', () => logger.db('MongoDB connected!'));
					connection.on('reconnected', () => logger.db('MongoDB reconnected!'));
					connection.on('error', (err: Error) => {
						logger.error('Error in MongoDB connection', err);
						connection.close();
					});
					connection.on('disconnected', () => logger.db('MongoDB disconnected!'));

					return connection;
				},
			}),
		}),
		ScheduleModule.forRoot(),
		// Application modules
		CoreModule,
		AuthModule,
		GameModule,
		TeamModule,
	],
})
export class AppModule implements NestModule {
	public configure(consumer: MiddlewareConsumer): void {
		consumer
			.apply(HTTPLoggerMiddleware)
			.forRoutes({ path: '*', method: RequestMethod.ALL });
	}
}
