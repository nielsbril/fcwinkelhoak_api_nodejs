import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '~modules/auth/auth.module';

import { GameController } from './controllers/game.controller';
import { GameRepository } from './repositories/game.repository';
import { GameSchema } from './schemas/game';
import { UpcomingGameCronjob } from './cronjobs/upcoming.cronjob';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Game', schema: GameSchema },
		], 'mongo'),
		AuthModule,
	],
	controllers: [
		GameController,
	],
	providers: [
		GameRepository,
		UpcomingGameCronjob,
	],
})
export class GameModule {}
