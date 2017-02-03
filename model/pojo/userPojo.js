'use strict';

function User(name, telephone, taxNumber, genre, postalAddress, job, incidents) {
	this.name = name;
	this.telephone = telephone;
	this.taxNumber = taxNumber;
	this.genre = genre;
	this.postalAddress = postalAddress;
	this.job = job;
	this.incidents = incidents;
}

module.exports = User;
