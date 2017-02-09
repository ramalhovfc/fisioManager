'use strict';

function isIncidentClosed(incident) {
	if (Date.parse(incident.startDate) && Date.parse(incident.endDate)) {
		return true;
	}
	return false;
}

module.exports = {
	isIncidentClosed: isIncidentClosed
};