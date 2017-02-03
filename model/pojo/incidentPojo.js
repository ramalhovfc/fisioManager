'use strict';

function Incident(_user , insurance, insurancePolicy, pathology, physiotherapist, doctor, startDate, endDate, numberOfSessions, privateNotes, publicNotes) {
	this._user = _user;
	this.insurance = insurance;
	this.insurancePolicy = insurancePolicy;
	this.pathology = pathology;
	this.physiotherapist = physiotherapist;
	this.doctor = doctor;
	this.startDate = startDate;
	this.endDate = endDate;
	this.numberOfSessions = numberOfSessions;
	this.privateNotes = privateNotes;
	this.publicNotes = publicNotes;
}

module.exports = Incident;