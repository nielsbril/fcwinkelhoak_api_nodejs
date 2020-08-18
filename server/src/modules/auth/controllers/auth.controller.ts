import { ApiTags, ApiOkResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { Controller, Post } from '@nestjs/common';

import { JWTHelper } from '../helpers/jwt';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(
		private readonly jwtHelper: JWTHelper,
	) {}

	@Post('login')
	@ApiOkResponse({ description: 'OK', type: String })
	@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
	public login(): string {
		return this.jwtHelper.sign();
	}
}
