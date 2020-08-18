import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { pathOr } from 'ramda';
import { Reflector } from '@nestjs/core';

import { IJWTObject } from '../auth.types';
import { JWTHelper } from '../helpers/jwt';

@Injectable()
export class PermissionGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly jwtHelper: JWTHelper,
	) {}

	public canActivate(
		context: ExecutionContext,
	): Promise<boolean> {
		const permission: string = this.reflector.get<string>('permission', context.getHandler());
		const token: string = pathOr('', ['headers', 'authorization'], context.switchToHttp().getRequest()).replace('Bearer ', '');

		return this.jwtHelper.verify(token)
			.then((jwt: IJWTObject) => {
				if (!jwt.permissions.includes(permission)) {
					throw new ForbiddenException('Permission not granted');
				}

				return true;
			})
			.catch((err: JsonWebTokenError | TokenExpiredError) => {
				throw new ForbiddenException(err.name === 'TokenExpiredError' ? 'JWT expired' : 'JWT invalid');
			});
	}
}
