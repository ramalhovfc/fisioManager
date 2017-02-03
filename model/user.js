'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./pojo/userPojo');
var user = new User(String, String, String, String, String, String, [{ type: Schema.Types.ObjectId, ref: 'Incident' }]);

var UserSchema = new Schema(user);

module.exports = mongoose.model('User', UserSchema);