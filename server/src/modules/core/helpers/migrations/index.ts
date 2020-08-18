import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IDocumentUpdated, IConfigDoc, IConfigMigrations } from '~shared/shared.types';
import { logger } from '~shared/helpers/logger';
import { MigrationsRunningException } from '~shared/shared.errors';
import { promiseAllSync } from '~shared/helpers/promise';

import { IMigrationDoc } from '../../core.types';
import { MigrationFiles } from './data/index';

@Injectable()
export class MigrationsHelper {
	constructor(
		@InjectModel('Config') private configModel: Model<IConfigDoc<IConfigMigrations>>,
		@InjectModel('Migration') private migrationModel: Model<IMigrationDoc>,
		private configService: ConfigService,
	) {}

	public init(): Promise<void> {
		return this.configModel
			.findOne({
				key: 'migrations',
			})
			.exec()
			.then((config: IConfigDoc<IConfigMigrations>) => {
				if (config) {
					return;
				}

				return this.configModel
					.updateOne({
						key: 'migrations',
					}, {
						key: 'migrations',
						data: {
							running: false,
						},
					}, {
						upsert: true,
					})
					.exec();
			})
			.then(() => this.execute());
	}

	private execute(): Promise<void> {
		logger.info('Starting migrations');

		return new Promise((resolve, reject) => {
			this.start()
				.then(() => this.run())
				.then(() => {
					logger.info('Migrations completed');
					return this.stop();
				})
				.catch((err: Error) => {
					if (err instanceof MigrationsRunningException) {
						logger.warn('Migrations already running');
						return;
					}

					logger.error('Migrations failed', err);
					return this.stop();
				})
				.then(() => resolve())
				.catch(reject);
		});
	}

	private start(): Promise<void> {
		return this.configModel
			.updateOne({
				key: 'migrations',
				'data.running': false,
			}, {
				$set: {
					'data.running': true,
				},
			})
			.exec()
			.then((update: IDocumentUpdated) => {
				if (!update.nModified) {
					throw new MigrationsRunningException();
				}

				return;
			});
	}

	private run(): Promise<void> {
		return new Promise((resolve, reject) => {
			const version: string = this.configService.get<string>('server.migration', 'initial');

			this.migrationModel.findOne({})
				.sort('-name')
				.exec()
				.then(async (migration: IMigrationDoc) => {
					if (migration && migration.name === version) {
						logger.info('No new migrations found');
						return;
					}

					const files: string[] = Object.keys(MigrationFiles.get());
					const pendingIndex: number = version !== 'initial' ? files.indexOf(version) : -1;
					const currentIndex: number = migration ? files.indexOf(migration.name) : -1;

					if (pendingIndex > currentIndex) {
						logger.info(`Executing migrations up to version ${version}`);
						await this.up(files.slice(~currentIndex ? currentIndex + 1 : 0, pendingIndex + 1));
					}

					if (pendingIndex < currentIndex) {
						logger.info(`Executing migrations down to ${version !== 'initial' ? `version ${version}` : 'the initial state'}`);
						await this.down(files.slice(pendingIndex + 1, currentIndex + 1).reverse());
					}

					return;
				})
				.then(() => resolve())
				.catch(reject);
		});
	}

	private up(files: string[]): Promise<void[]> {
		return promiseAllSync(files.map((file: string) => {
			logger.db(`[UP] ${file}`);
			return MigrationFiles.get()[file].up()
				.then(() => this.migrationModel.create({ name: file }));
		}));
	}

	private down(files: string[]): Promise<void[]> {
		return promiseAllSync(files.map((file: string) => {
			logger.db(`[DOWN] ${file}`);
			return MigrationFiles.get()[file].down()
				.then(() => this.migrationModel.deleteOne({ name: file }).exec());
		}));
	}

	private stop(): Promise<void> {
		return this.configModel
			.updateOne({
				key: 'migrations',
			}, {
				$set: {
					'data.running': false,
				},
			})
			.exec();
	}
}
