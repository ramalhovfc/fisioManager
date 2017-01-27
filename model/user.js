'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	telephone: String,
	taxNumber: String,
	genre: String,
	postalAddress: String,
	job: String,
	incidents: [{ type: Schema.Types.ObjectId, ref: 'Incident' }]
});

module.exports = mongoose.model('User', UserSchema);