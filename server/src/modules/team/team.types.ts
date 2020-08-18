import { Document } from 'mongoose';

import { IMongooseDoc } from '~shared/shared.types';

export interface ITeam {
	name: string;
	colors: string;
	playground: {
		name: string;
		street: string;
		houseNumber: string;
		zipCode: number;
		city: string;
	};
	isSelf: boolean;
}
export type ITeamDoc = ITeam & IMongooseDoc & Document;
