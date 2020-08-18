import { IValidationPreset } from '~shared/shared.types';

import { createTeam } from './team/create';

interface IValidationPresets {
	team: {
		create: IValidationPreset;
	};
}

export const presets: IValidationPresets = {
	team: {
		create: createTeam,
	},
};
