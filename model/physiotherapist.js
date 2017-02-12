'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Physiotherapist = require('./pojo/physiotherapistPojo');
var physiotherapist = new Physiotherapist(String);

var PhysiotherapistSchema = new Schema(physiotherapist);

module.exports = mongoose.model('Physiotherapist', PhysiotherapistSchema);