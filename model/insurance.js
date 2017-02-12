'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Insurance = require('./pojo/insurancePojo');
var insurance = new Insurance(String);

var InsuranceSchema = new Schema(insurance);

module.exports = mongoose.model('Insurance', InsuranceSchema);