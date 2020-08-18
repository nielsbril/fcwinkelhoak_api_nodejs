interface IMigrations {
	[key: string]: {
		up: () => Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
		down: () => Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
	};
}

export class MigrationFiles {
	public static get(): IMigrations {
		return {};
	}
}
