import { Schema, SchemaTypes } from 'mongoose';

export const GameSchema: Schema = new Schema({
	opponent: {
		type: SchemaTypes.String,
		required: true,
		ref: 'Team',
	},
	home: {
		type: SchemaTypes.Boolean,
		required: true,
	},
	date: {
		type: SchemaTypes.Date,
		required: true,
	},
	result: {
		goalsHome: {
			type: SchemaTypes.Number,
			required: false,
		},
		goalsAway: {
			type: SchemaTypes.Number,
			required: false,
		},
	},
}, {
	collection: 'games',
	timestamps: true,
	toJSON: { virtuals: true, versionKey: false },
	toObject: { virtuals: true, versionKey: false },
});
