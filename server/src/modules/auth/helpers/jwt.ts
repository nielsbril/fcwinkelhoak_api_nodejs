import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { sign, verify } from 'jsonwebtoken';

import { config } from '~config/config.const';

import { IJWTObject } from '../auth.types';

@Injectable()
export class JWTHelper {
	public sign(): string {
		return sign({
			user: 'niels.bril',
			permissions: [
				'teams.create',
				'games.create',
			],
		}, config().auth.jwt.secret);
	}

	public verify(token: string): Promise<IJWTObject> {
		return promisify(verify)(token, config().auth.jwt.secret) as Promise<IJWTObject>;
	}
}
