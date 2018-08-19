const mongoose = require('mongoose');
const { Schema } = mongoose;

const leagueSchema = new Schema({
	leagueId: String,
	count: {
		type: Number,
		default: 0
	}
});

mongoose.model('leagues', leagueSchema);