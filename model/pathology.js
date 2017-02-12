'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pathology = require('./pojo/pathologyPojo');
var pathology = new Pathology(String);

var PathologySchema = new Schema(pathology);

module.exports = mongoose.model('Pathology', PathologySchema);