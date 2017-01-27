'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IncidentSchema = new Schema({
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	insurance: String,
	insurancePolicy: String,
	pathology: String,
	physiotherapist: String,
	doctor: String,
	startDate: String,
	endDate: String,
	privateNotes: String,
	publicNotes: String,
});

module.exports = mongoose.model('Incident', IncidentSchema);