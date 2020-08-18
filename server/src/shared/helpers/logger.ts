import * as Logger from '@studiohyperdrive/logger';

import { config } from '~config/config.const';

// Requires a fix in the @studiohyperdrive/logger package or preferably a new @studiohyperdrive/logger-nodejs package
export const logger = new (Logger as any).default({ // eslint-disable-line @typescript-eslint/no-explicit-any, new-cap
	enabled: config().logger.enabledLevels,
	filesystem: {
		enabled: false,
		path: '',
	},
	timestamp: true,
});
