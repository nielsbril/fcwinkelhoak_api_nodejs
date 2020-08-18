export enum Environment {
	local = 'local',
	test = 'test',
	development = 'development',
	staging = 'staging',
	production = 'production',
}

export interface IStateConfig {
	env: Environment;
	docs: boolean;
	production: boolean;
	test: boolean;
}

export interface IServerConfig {
	host: string;
	port: number;
	timezone: string;
	migration: string;
}

export interface ILoggerConfig {
	enabledLevels: string[];
}

export interface IMongoDBAuthConfig {
	user: string;
	pass: string;
	db: string;
}

export interface IMongoDBConfig {
	url: string;
	name: string;
	replicaSet: string;
	auth: IMongoDBAuthConfig;
}

export interface IJWTAuthConfig {
	secret: string;
}

export interface IAuthConfig {
	jwt: IJWTAuthConfig;
}

export interface IPaginationConfig {
	size: string;
}

export interface IConfig {
	state: IStateConfig;
	server: IServerConfig;
	logger: ILoggerConfig;
	mongodb: IMongoDBConfig;
	auth: IAuthConfig;
	pagination: IPaginationConfig;
}
