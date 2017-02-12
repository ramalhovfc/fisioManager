'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Doctor = require('./pojo/doctorPojo');
var doctor = new Doctor(String);

var DoctorSchema = new Schema(doctor);

module.exports = mongoose.model('Doctor', DoctorSchema);