import { Module } from '@nestjs/common';

import { AuthController } from './controllers/auth.controller';
import { JWTHelper } from './helpers/jwt';

@Module({
	controllers: [
		AuthController,
	],
	providers: [
		JWTHelper,
	],
	exports: [
		JWTHelper,
	],
})
export class AuthModule {}
