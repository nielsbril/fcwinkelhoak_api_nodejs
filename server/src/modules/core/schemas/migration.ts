import { Schema, SchemaTypes } from 'mongoose';

export const MigrationSchema: Schema = new Schema({
	name: {
		type: SchemaTypes.String,
		required: true,
		trim: true,
		unique: true,
	},
}, {
	collection: 'migrations',
	timestamps: true,
	toJSON: { virtuals: true, versionKey: false },
	toObject: { virtuals: true, versionKey: false },
});
