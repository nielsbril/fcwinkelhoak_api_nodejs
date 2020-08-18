import { Schema, SchemaTypes } from 'mongoose';

export const TeamSchema: Schema = new Schema({
	name: {
		type: SchemaTypes.String,
		required: true,
		trim: true,
	},
	colors: {
		type: SchemaTypes.String,
		required: true,
		trim: true,
	},
	playground: {
		name: {
			type: SchemaTypes.String,
			required: true,
			trim: true,
		},
		street: {
			type: SchemaTypes.String,
			required: true,
			trim: true,
		},
		houseNumber: {
			type: SchemaTypes.String,
			required: true,
			trim: true,
		},
		zipCode: {
			type: SchemaTypes.Number,
			required: true,
			trim: true,
		},
		city: {
			type: SchemaTypes.String,
			required: true,
			trim: true,
		},
	},
	isSelf: {
		type: SchemaTypes.Boolean,
		required: true,
		default: false,
	},
}, {
	collection: 'teams',
	timestamps: true,
	toJSON: { virtuals: true, versionKey: false },
	toObject: { virtuals: true, versionKey: false },
});
