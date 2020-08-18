import { Schema, SchemaTypes } from 'mongoose';

export const ConfigSchema: Schema = new Schema({
	key: {
		type: SchemaTypes.String,
		required: true,
		trim: true,
		unique: true,
	},
	data: {
		type: SchemaTypes.Mixed,
	},
}, {
	collection: 'config',
	timestamps: true,
	toJSON: { virtuals: true, versionKey: false },
	toObject: { virtuals: true, versionKey: false },
});
