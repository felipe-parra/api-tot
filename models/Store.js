const { model, Schema } = require('mongoose');

const storeSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true
		},
		location: {
			type: {
				type: String,
				enum: [ 'Point' ]
				// required: true
			},
			coordinates: {
				type: [ Number ]
				// required: true
			}
		},
		address: {
			type: String
			// required: true,
		},
		model: {
			type: String
		}
	},
	{
		timestamps: true
	}
);

module.exports = model('Store', storeSchema);
