import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '~modules/auth/auth.module';

import { TeamController } from './controllers/team.controller';
import { TeamRepository } from './repositories/team.repository';
import { TeamSchema } from './schemas/team';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Team', schema: TeamSchema },
		], 'mongo'),
		AuthModule,
	],
	controllers: [
		TeamController,
	],
	providers: [
		TeamRepository,
	],
})
export class TeamModule {}
