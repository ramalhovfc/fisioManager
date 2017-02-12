'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Job = require('./pojo/jobPojo');
var job = new Job(String);

var JobSchema = new Schema(job);

module.exports = mongoose.model('Job', JobSchema);