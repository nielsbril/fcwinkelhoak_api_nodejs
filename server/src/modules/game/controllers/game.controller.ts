import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { Controller, Get, Post, Body, UseGuards, UseInterceptors, Query } from '@nestjs/common';

import { IPaginationResult, IPaginationQuery } from '~shared/shared.types';
import { JoiValidationPipe } from '~shared/pipes/joi.pipe';
import { JWTGuard } from '~modules/auth/guards/jwt.guard';
import { PaginationInterceptor } from '~shared/interceptors/pagination.interceptor';
import { Permission } from '~modules/auth/guards/permission.decorator';
import { PermissionGuard } from '~modules/auth/guards/permission.guard';

import { Game } from '../classes/game';
import { GameRepository } from '../repositories/game.repository';
import { IGameDoc } from '../game.types';
import { presets } from '../helpers/presets';

@Controller('games')
@UseGuards(JWTGuard)
@ApiTags('games')
export class GameController {
	constructor(
		private readonly gameRepository: GameRepository,
	) {}

	@Get()
	@UseInterceptors(PaginationInterceptor)
	@ApiOkResponse({ description: 'OK', type: Game, isArray: true })
	@ApiBadRequestResponse({ description: 'Bad Request' })
	@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
	public getAll(
		@Query() query: IPaginationQuery,
	): Promise<IPaginationResult<Game>> {
		return this.gameRepository.getAll(query.page, query.size)
			.then(({ items, total }: IPaginationResult<IGameDoc>) => ({
				items: items.map((i: IGameDoc) => i.toJSON()),
				total,
			}));
	}

	@Post()
	@UseGuards(PermissionGuard)
	@Permission('games.create')
	@ApiCreatedResponse({ description: 'Created', type: Game })
	@ApiBadRequestResponse({ description: 'Bad Request' })
	@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
	public createGame(
		@Body(new JoiValidationPipe(presets.game.create)) body: Game,
	): Promise<Game> {
		return this.gameRepository.create(body)
			.then((game: IGameDoc) => game.toJSON());
	}
}
