import { Document } from 'mongoose';

import { IMongooseDoc } from '~shared/shared.types';

// Migrations
export interface IMigration {
	name: string;
}
export type IMigrationDoc = IMigration & IMongooseDoc & Document;

// Status
export interface IStatus {
	success: boolean;
	name: string;
	version: string;
}
