import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { pathOr } from 'ramda';

import { JWTHelper } from '../helpers/jwt';

@Injectable()
export class JWTGuard implements CanActivate {
	constructor(
		private readonly jwtHelper: JWTHelper,
	) {}

	public canActivate(
		context: ExecutionContext,
	): Promise<boolean> {
		const token: string = pathOr('', ['headers', 'authorization'], context.switchToHttp().getRequest()).replace('Bearer ', '');

		if (!token) {
			throw new UnauthorizedException('No authorization header provided');
		}

		return this.jwtHelper.verify(token)
			.then(() => true)
			.catch((err: JsonWebTokenError | TokenExpiredError) => {
				throw new ForbiddenException(err.name === 'TokenExpiredError' ? 'JWT expired' : 'JWT invalid');
			});
	}
}
