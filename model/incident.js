'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Incident = require('./pojo/incidentPojo');
var incident = new Incident({ type: Schema.Types.ObjectId, ref: 'User' }, String, String, String, String, String, String, String, Number, String, String);

var IncidentSchema = new Schema(incident);

module.exports = mongoose.model('Incident', IncidentSchema);