import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ITeam, ITeamDoc } from '../team.types';

@Injectable()
export class TeamRepository {
	constructor(
		@InjectModel('Team') private teamModel: Model<ITeamDoc>,
	) {}

	public getAll(includeSelf = false): Promise<ITeamDoc[]> {
		return this.teamModel.find({
			...!includeSelf && { isSelf: false },
		}).exec();
	}

	public getSelf(): Promise<ITeamDoc> {
		return this.teamModel.findOne({
			isSelf: true,
		}).exec();
	}

	public create(team: ITeam): Promise<ITeamDoc> {
		return this.teamModel.create(team);
	}
}
