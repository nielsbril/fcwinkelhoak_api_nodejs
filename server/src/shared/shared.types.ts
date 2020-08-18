import { Document } from 'mongoose';
import { Schema, ValidationOptions } from '@hapi/joi';

// Mongoose
export interface IMongooseDoc {
	id: string;
	createdAt?: string | Date;
	updatedAt?: string | Date;
}

export interface IDocumentUpdated {
	n?: number;
	ok?: number;
	nModified?: number;
}

export interface IDocumentDeleted {
	ok?: number;
	n?: number;
}

// Config
export interface IConfig<T> {
	id?: string;
	key: string;
	data: T;
}
export type IConfigDoc<T> = IConfig<T> & IMongooseDoc & Document;

export interface IConfigMigrations {
	running: boolean;
}

// Validation
export interface IValidationPreset {
	schema: Schema;
	options: ValidationOptions;
}

export interface IQuery extends IPaginationQuery {
	[key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// Pagination
export interface IPaginationQuery {
	page: number;
	size: number;
}

export interface IPaginationResult<T> {
	items: T[];
	total: number;
}

export interface IPagination<T> {
	items: T[];
	total: number;
	pages: number;
	page: number;
	size: number;
	self: string;
	first: string;
	last: string;
	next?: string;
	prev?: string;
}
