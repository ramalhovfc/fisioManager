'use strict';

var winston = require('winston');
winston.add(winston.transports.File, {
	filename: 'server.log',
	json: false,
	maxsize: '10000000',
	maxFiles: '10',
	timestamp: true,
	level: 'debug'
});
global.winston = winston;
winston.info('Logger initialized');

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var User = require('./model/user');
var Incident = require('./model/incident');
var Doctor = require('./model/doctor');
var Insurance = require('./model/insurance');
var Job = require('./model/job');
var Pathology = require('./model/pathology');
var Physiotherapist = require('./model/physiotherapist');

var isAlphabeticOrSpace = require('./validations').isAlphabeticOrSpace;

// db config
const mongoUrl = 'mongodb://127.0.0.1:27017/fisio';
winston.info('Connecting to db', mongoUrl);
mongoose.connect(mongoUrl);

mongoose.connection.on('error', function (err) {
	winston.error('Could connect to db', err);
});

var app = express();
var router = express.Router();
var port = process.env.API_PORT || 3001;

//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

	//and remove cacheing so we get the most recent comments
	res.setHeader('Cache-Control', 'no-cache');
	next();
});

router.get('/', function(req, res) {
	winston.info('Get request to /');
	winston.debug(req.params, req.body);
	res.json({ message: 'API Initialized!'});
});

router.route('/user').get(function(req, res) {
	winston.info('Get request to /user');
	winston.debug(req.params, req.body);
	User.find(function (err, results) {
		if (err) {
			res.send(err);
			return;
		}

		res.json(results);
	});
});

router.route('/user/searchId/:userId').get(function(req, res) {
	winston.info('Get request to /user/searchId/:userId');
	winston.debug(req.params, req.body);
	User.findById(req.params.userId, function(err, results) {
		if (err) {
			res.send(err);
			return;
		}

		res.json(results);
	});
});

router.route('/user/search').get(function(req, res) {
	winston.info('Get request to /user/search');
	winston.debug(req.params, req.body);
	winston.debug('req.query', req.query);
	var search = JSON.parse(req.query["userSearch"]);

	if ('_id' in search) {
		User.findById(search['_id'], function(err, results) {
			if (err) {
				res.send(err);
				return;
			}

			res.json(results);
		});
	} else {
		var opts = {};
		for (let property of Object.keys(search)) {
			if (!search.hasOwnProperty(property)) {
				continue;
			}

			if (search[property]) {
				if (!isAlphabeticOrSpace(search[property])) {
					res.send([]);
					return;
				}

				if (property === 'name') {
					opts['name'] = new RegExp(search['name'], 'i');
				} else if (property === 'postalAddress') {
					opts['postalAddress'] = new RegExp(search['postalAddress'], 'i');
				} else if (property === 'job') {
					opts['job'] = new RegExp(search['job'], 'i');
				} else {
					opts[property] = search[property];
				}
			}
		}

		winston.debug('opts["name"]', opts["name"]);
		winston.debug('opts["telephone"]', opts["telephone"]);
		winston.debug('opts["taxNumber"]', opts["taxNumber"]);
		winston.debug('opts["genre"]', opts["genre"]);
		winston.debug('opts["postalAddress"]', opts["postalAddress"]);
		winston.debug('opts["job"]', opts["job"]);

		User.find(opts, function (err, results) {
			if (err) {
				res.send(err);
				return;
			}

			res.json(results);
		})
	}
});


router.route('/user_incidents').get(function(req, res) {
	winston.info('Get request to /user_incidents');
	winston.debug(req.params, req.body);
	User.find()
		.populate('incidents')
		.exec(function(err, results) {
			if (err) {
				res.send(err);
				return;
			}

			res.json(results);
		});
});

router.route('/user_incidents/:userId').get(function(req, res) {
	winston.info('Get request to /user_incidents/:userId');
	winston.debug(req.params, req.body);
	var out = {
		user: null,
		incidents: null
	};

	User.findById(req.params.userId)
		.exec(function(err, results) {
			if (err) {
				res.send(err);
				return;
			}

			out.user = results;

			var opts = { '_user': req.params.userId};
			Incident.find(opts, function (err, results) {
				if (err) {
					res.send(err);
					return;
				}

				out.incidents = results;
				res.send(out);
			});
		});
});

router.route('/user').post(function(req, res) {
	winston.info('Post request to /user');
	winston.debug(req.params, req.body);
	var user = new User();
	var incident = new Incident();

	(req.body.name) ? user.name = req.body.name : null;
	(req.body.telephone) ? user.telephone = req.body.telephone : null;
	(req.body.taxNumber) ? user.taxNumber = req.body.taxNumber : null;
	(req.body.genre) ? user.genre = req.body.genre : null;
	(req.body.postalAddress) ? user.postalAddress = req.body.postalAddress : null;
	(req.body.job) ? user.job = req.body.job : null;

	(req.body.insurance) ? incident.insurance = req.body.insurance : null;
	(req.body.insurancePolicy) ? incident.insurancePolicy = req.body.insurancePolicy : null;
	(req.body.pathology) ? incident.pathology = req.body.pathology : null;
	(req.body.physiotherapist) ? incident.physiotherapist = req.body.physiotherapist : null;
	(req.body.doctor) ? incident.doctor = req.body.doctor : null;
	(req.body.startDate) ? incident.startDate = (Date.parse(req.body.startDate) || null) : null;
	(req.body.endDate) ? incident.endDate = (Date.parse(req.body.endDate) || null) : null;
	(req.body.numberOfSessions !== undefined && req.body.endDate) ? incident.numberOfSessions = req.body.numberOfSessions : null;
	(req.body.privateNotes) ? incident.privateNotes = req.body.privateNotes : null;
	(req.body.publicNotes) ? incident.publicNotes = req.body.publicNotes : null;

	if (req.body.insurance || req.body.insurancePolicy || req.body.pathology || req.body.physiotherapist || req.body.doctor || req.body.startDate || req.body.endDate || req.body.numberOfSessions || req.body.privateNotes || req.body.publicNotes) {
		user.incidents = [ incident ];
		incident._user = user.toObject();
	}

	user.save(function(err, user) {
		if (err) {
			res.send(err);
			return;
		}

		if (!user.incidents.length) {
			res.json(user);
		} else {
			incident.save(function (err, incident) {
				if (err) {
					res.send(err);
					return;
				}

				res.json(user);
			});
		}
	});
});

router.route('/user/:userId').put(function(req, res) {
	winston.info('Put request to /user/:userId');
	winston.debug(req.params, req.body);
	User.findById(req.params.userId, function(err, user) {
		if (err) {
			res.send(err);
			return;
		}

		user.name = (req.body.name) ? req.body.name : null;
		user.telephone = (req.body.telephone) ? req.body.telephone : null;
		user.taxNumber = (req.body.taxNumber) ? req.body.taxNumber : null;
		user.genre = (req.body.genre) ? req.body.genre : null;
		user.postalAddress = (req.body.postalAddress) ? req.body.postalAddress : null;
		user.job = (req.body.job) ? req.body.job : null;

		user.save(function(err, userSaved) {
			if (err) {
				res.send(err);
				return;
			}

			res.json(userSaved);
		});
	});
});

router.route('/user/:userId').delete(function(req, res) {
	winston.info('Delete request to /user/:userId');
	winston.debug(req.params, req.body);
	Incident.remove({ _user: req.params.userId }, function (err) {
		if (err) {
			res.send(err);
			return;
		}
	});

	User.remove({ _id: req.params.userId }, function(err, user) {
		if (err) {
			res.send(err);
			return;
		}

		res.json({ message: 'User has been deleted' })
	})
});

router.route('/incident/search').get(function(req, res) {
	winston.info('Get request to /incident/search');
	winston.debug(req.params, req.body);
	winston.debug('req.query', req.query);
	var search = JSON.parse(req.query["incidentSearch"]);

	if ('_id' in search) {
		Incident.findById(search['_id'])
			.populate('_user')
			.exec(function(err, incident) {
				if (err) {
					res.send(err);
					return;
				}

				res.send(incident);
			});
	} else {
		var opts = {};
		for (let property of Object.keys(search)) {
			if (!search.hasOwnProperty(property)) {
				continue;
			}

			if (search[property]) {
				if (!isAlphabeticOrSpace(search[property])) {
					res.send([]);
					return;
				}

				// TODO go get this from model
				if (property === '_user' || property === 'id') {
					// do not search by regex if we are searching by an ObjectId
					opts[property] = search[property];
				} else {
					if (property === 'startDateBegin') {
						opts['startDate'] = Object.assign(opts['startDate'] || {}, {$gte: new Date(search[property])});
					} else if (property === 'endDateBegin') {
						opts['endDate'] = Object.assign(opts['endDate'] || {}, {$gte: new Date(search[property])});
					} else if (property === 'startDateEnd') {
						opts['startDate'] = Object.assign(opts['startDate'] || {}, {$lte: new Date(search[property])});
					} else if (property === 'endDateEnd') {
						opts['endDate'] = Object.assign(opts['endDate'] || {}, {$lte: new Date(search[property])});
					} else {
						opts[property] = search[property];
					}
				}
			}
		}
		winston.debug('opts["insurance"]', opts["insurance"]);
		winston.debug('opts["insurancePolicy"]', opts["insurancePolicy"]);
		winston.debug('opts["doctor"]', opts["doctor"]);
		winston.debug('opts["pathology"]', opts["pathology"]);
		winston.debug('opts["physiotherapist"]', opts["physiotherapist"]);
		winston.debug('opts["startDate"]', opts["startDate"]);
		winston.debug('opts["endDate"]', opts["endDate"]);
		winston.debug('opts["numberOfSessions"]', opts["numberOfSessions"]);

		Incident.find(opts)
			.populate('_user')
			.exec(function (err, results) {
				if (err) {
					res.send(err);
					return;
				}

				res.json(results);
			});
	}
});

router.route('/incident').post(function(req, res) {
	winston.info('Post request to /incident');
	winston.debug(req.params, req.body);
	if (!req.body._user) {
		res.status(400).send('_user required');
		return;
	}

	User.findById(req.body._user, function(err, user) {
		if (err) {
			res.send(err);
			return;
		}

		if (!user) {
			res.status(400).send('User not found');
			return;
		}

		var incident = new Incident();
		incident._user = user;
		(req.body.insurance) ? incident.insurance = req.body.insurance : null;
		(req.body.insurancePolicy) ? incident.insurancePolicy = req.body.insurancePolicy : null;
		(req.body.pathology) ? incident.pathology = req.body.pathology : null;
		(req.body.physiotherapist) ? incident.physiotherapist = req.body.physiotherapist : null;
		(req.body.doctor) ? incident.doctor = req.body.doctor : null;
		(req.body.startDate) ? incident.startDate = (Date.parse(req.body.startDate) || null) : null;
		(req.body.endDate) ? incident.endDate = (Date.parse(req.body.endDate) || null) : null;
		(req.body.numberOfSessions !== undefined && req.body.endDate) ? incident.numberOfSessions = req.body.numberOfSessions : null;
		(req.body.privateNotes) ? incident.privateNotes = req.body.privateNotes : null;
		(req.body.publicNotes) ? incident.publicNotes = req.body.publicNotes : null;

		incident.save(function (err, incident) {
			if (err) {
				res.send(err);
				return;
			}

			user.incidents.push(incident);
			user.save(function (err, obj) {
				res.json(incident);
			});
		});
	});
});

router.route('/incident/:incidentId').delete(function(req, res) {
	winston.info('Delete request to /incident/:incidentId');
	winston.debug(req.params, req.body);
	Incident.findById(req.params.incidentId)
		.populate('_user')
		.exec(function(err, incident) {
			if (err) {
				res.send(err);
				return;
			}

			if (!incident) {
				res.status(400).send('Incident not found');
				return;
			}

			incident._user.incidents.remove(req.params.incidentId);
			incident._user.save(function(err, updated) {
				if (err) {
					res.send(err);
					return;
				}

				incident.remove();
				res.json({message: 'Sucessfully deleted'});
			});
		});
});

router.route('/incident/:incidentId').put(function(req, res) {
	winston.info('Put request to /incident/:incidentId');
	winston.debug(req.params, req.body);
	Incident.findById(req.params.incidentId, function(err, incident) {
		if (err) {
			res.send(err);
			return;
		}

		incident.insurance = (req.body.insurance) ? req.body.insurance : null;
		incident.insurancePolicy = (req.body.insurancePolicy) ? req.body.insurancePolicy : null;
		incident.pathology = (req.body.pathology) ? req.body.pathology : null;
		incident.physiotherapist = (req.body.physiotherapist) ? req.body.physiotherapist : null;
		incident.doctor = (req.body.doctor) ? req.body.doctor : null;
		incident.startDate = (req.body.startDate) ? (Date.parse(req.body.startDate) || null) : null;
		incident.endDate = (req.body.endDate) ? (Date.parse(req.body.endDate) || null) : null;
		incident.numberOfSessions = (req.body.numberOfSessions !== undefined && req.body.endDate) ? req.body.numberOfSessions : null;
		incident.privateNotes = (req.body.privateNotes) ? req.body.privateNotes : null;
		incident.publicNotes = (req.body.publicNotes) ? req.body.publicNotes : null;

		incident.save(function(err, incidentSaved) {
			if (err) {
				res.send(err);
				return;
			}

			res.json(incidentSaved);
		});
	});
});

router.route('/incident/open').get(function(req, res) {
	winston.info('Get request to /incident/open');
	winston.debug(req.params, req.body);

	var opts = {
		startDate: { $ne: null },
		endDate: null
	};
	Incident.find(opts)
		.populate('_user')
		.exec(function (err, results) {
			if (err) {
				res.send(err);
				return;
			}

			res.json(results);
		});
});

router.route('/lookups').get(function(req, res) {
	winston.info('Get request to /lookups');
	winston.debug(req.params, req.body);
	winston.debug('req.query', req.query);
	var search = JSON.parse(req.query["lookupsToGet"]);

	var lookups = {};
	var lookupsLeft = Object.keys(search).length;
	for (let property of Object.keys(search)) {
		if (!search.hasOwnProperty(property)) { lookupsLeft--; continue; }

		if (search[property]) {
			if (property === 'doctor') {
				Doctor.find(function (err, results) {
					lookupsLeft--;
					if (err) {
						lookups[property] = [];
						return;
					}
					lookups[property] = results;
					if (!lookupsLeft) { res.send(lookups); }
				});
			} else if (property === 'insurance') {
				Insurance.find(function (err, results) {
					lookupsLeft--;
					if (err) {
						lookups[property] = [];
						return;
					}
					lookups[property] = results;
					if (!lookupsLeft) { res.send(lookups); }
				});
			} else if (property === 'job') {
				Job.find(function (err, results) {
					lookupsLeft--;
					if (err) {
						lookups[property] = [];
						return;
					}
					lookups[property] = results;
					if (!lookupsLeft) { res.send(lookups); }
				});
			} else if (property === 'pathology') {
				Pathology.find(function (err, results) {
					lookupsLeft--;
					if (err) {
						lookups[property] = [];
						return;
					}
					lookups[property] = results;
					if (!lookupsLeft) { res.send(lookups); }
				});
			} else if (property === 'physiotherapist') {
				Physiotherapist.find(function (err, results) {
					lookupsLeft--;
					if (err) {
						lookups[property] = [];
						return;
					}
					lookups[property] = results;
					if (!lookupsLeft) { res.send(lookups); }
				});
			} else {
				lookupsLeft--;
			}
		} else {
			lookupsLeft--;
		}
	}
});

router.route('/lookups').post(function(req, res) {
	winston.info('Post request to /lookups');
	winston.debug(req.params, req.body);

	var lookupsSaved = {};
	var lookupData = req.body;

	for (let property of Object.keys(lookupData)) {
		if (!lookupData.hasOwnProperty(property)) {	continue; }

		if (property === 'doctor' && lookupData[property]) {
			Doctor.findOne({'doctor': lookupData[property]}, function(err, obj) {
				if (!obj) {
					var doctor = new Doctor();
					doctor.doctor = lookupData[property];
					doctor.save(function(err, doctorSaved) {
						if (err) { return; }
						lookupsSaved[property] = doctorSaved;
					});
				}
			});
		} else if (property === 'insurance' && lookupData[property]) {
			Insurance.findOne({'insurance': lookupData[property]}, function(err, obj) {
				if (!obj) {
					var insurance = new Insurance();
					insurance.insurance = lookupData[property];
					insurance.save(function(err, insuranceSaved) {
						if (err) { return; }
						lookupsSaved[property] = insuranceSaved;
					});
				}
			});
		} else if (property === 'job' && lookupData[property]) {
			Job.findOne({'job': lookupData[property]}, function(err, obj) {
				if (!obj) {
					var job = new Job();
					job.job = lookupData[property];
					job.save(function(err, jobSaved) {
						if (err) { return; }
						lookupsSaved[property] = jobSaved;
					});
				}
			});
		} else if (property === 'pathology' && lookupData[property]) {
			Pathology.findOne({'pathology': lookupData[property]}, function(err, obj) {
				if (!obj) {
					var pathology = new Pathology();
					pathology.pathology = lookupData[property];
					pathology.save(function(err, pathologySaved) {
						if (err) { return; }
						lookupsSaved[property] = pathologySaved;
					});
				}
			});
		} else if (property === 'physiotherapist' && lookupData[property]) {
			Physiotherapist.findOne({'physiotherapist': lookupData[property]}, function(err, obj) {
				if (!obj) {
					var physiotherapist = new Physiotherapist();
					physiotherapist.physiotherapist = lookupData[property];
					physiotherapist.save(function(err, physiotherapistSaved) {
						if (err) { return; }
						lookupsSaved[property] = physiotherapistSaved;
					});
				}
			});
		} else {
			// dont care
		}
	}
	res.send(lookupsSaved);
});

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
	console.log(`api running on port ${port}`);
});