import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IPaginationResult } from '~shared/shared.types';

import { IGame, IGameDoc } from '../game.types';

@Injectable()
export class GameRepository {
	constructor(
		@InjectModel('Game') private gameModel: Model<IGameDoc>,
	) {}

	public getAll(page: number, size: number): Promise<IPaginationResult<IGameDoc>> {
		return Promise
			.all([
				this.gameModel.find({}).skip((page * size) - size).limit(size).populate('opponent').exec(), // eslint-disable-line newline-per-chained-call
				this.gameModel.countDocuments({}).exec(),
			])
			.then(([games, total]: [IGameDoc[], number]) => ({
				items: games,
				total,
			}));
	}

	public create(game: IGame): Promise<IGameDoc> {
		return this.gameModel.create(game);
	}
}
