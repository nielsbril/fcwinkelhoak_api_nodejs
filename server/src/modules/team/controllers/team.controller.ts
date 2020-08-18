import { ApiTags, ApiCreatedResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';

import { JoiValidationPipe } from '~shared/pipes/joi.pipe';
import { JWTGuard } from '~modules/auth/guards/jwt.guard';
import { Permission } from '~modules/auth/guards/permission.decorator';
import { PermissionGuard } from '~modules/auth/guards/permission.guard';

import { ITeamDoc } from '../team.types';
import { presets } from '../helpers/presets';
import { Team } from '../classes/team';
import { TeamRepository } from '../repositories/team.repository';

@Controller('teams')
@UseGuards(JWTGuard)
@ApiTags('teams')
export class TeamController {
	constructor(
		private readonly teamRepository: TeamRepository,
	) {}

	@Get()
	@ApiOkResponse({ description: 'OK', type: Team, isArray: true })
	@ApiBadRequestResponse({ description: 'Bad Request' })
	@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
	public getAll(): Promise<Team[]> {
		return this.teamRepository.getAll(true)
			.then((teams: ITeamDoc[]) => teams.map((t: ITeamDoc) => t.toJSON()));
	}

	@Get('opponents')
	@ApiOkResponse({ description: 'OK', type: Team, isArray: true })
	@ApiBadRequestResponse({ description: 'Bad Request' })
	@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
	public getOpponents(): Promise<Team[]> {
		return this.teamRepository.getAll(false)
			.then((teams: ITeamDoc[]) => teams.map((t: ITeamDoc) => t.toJSON()));
	}

	@Get('self')
	@ApiOkResponse({ description: 'OK', type: Team })
	@ApiBadRequestResponse({ description: 'Bad Request' })
	@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
	public getSelf(): Promise<Team> {
		return this.teamRepository.getSelf()
			.then((team: ITeamDoc) => team.toJSON());
	}

	@Post()
	@UseGuards(PermissionGuard)
	@Permission('teams.create')
	@ApiCreatedResponse({ description: 'Created', type: Team })
	@ApiBadRequestResponse({ description: 'Bad Request' })
	@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
	public createTeam(
		@Body(new JoiValidationPipe(presets.team.create)) body: Team,
	): Promise<Team> {
		return this.teamRepository.create(body)
			.then((team: ITeamDoc) => team.toJSON());
	}
}
