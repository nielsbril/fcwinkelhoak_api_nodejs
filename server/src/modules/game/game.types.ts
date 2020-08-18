import { Document } from 'mongoose';

import { IMongooseDoc } from '~shared/shared.types';
import { ITeam } from '~modules/team/team.types';

export interface IGame {
	opponent: string | ITeam;
	home: boolean;
	date: Date;
	result: {
		goalsHome: number;
		goalsAway: number;
	};
}
export type IGameDoc = IGame & IMongooseDoc & Document;
