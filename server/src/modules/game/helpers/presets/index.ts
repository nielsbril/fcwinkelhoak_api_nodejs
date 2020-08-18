import { IValidationPreset } from '~shared/shared.types';

import { createGame } from './game/create';

interface IValidationPresets {
	game: {
		create: IValidationPreset;
	};
}

export const presets: IValidationPresets = {
	game: {
		create: createGame,
	},
};
