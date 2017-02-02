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
winston.info('Logger initialized');

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var User = require('./model/user');
var Incident = require('./model/incident');

var isAlphabeticOrSpace = require('./validations').isAlphabeticOrSpace;
var isAlphabeticOrSpaceOrUnderscore = require('./validations').isAlphabeticOrSpaceOrUnderscore;

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 3001;

//db config
const mongoUrl = 'mongodb://127.0.0.1:27017/fisio';
winston.info('Connecting to db', mongoUrl);
mongoose.connect(mongoUrl);

mongoose.connection.on('error', function (err) {
	winston.error('Could connect to db', err);
});

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
	res.json({ message: 'API Initialized!'});
});

router.route('/user').get(function(req, res) {
	User.find(function (err, results) {
		if (err) {
			res.send(err);
			return;
		}

		res.json(results);
	});
});

router.route('/user/:userId').get(function(req, res) {
	User.findById(req.params.userId, function(err, results) {
		if (err) {
			res.send(err);
			return;
		}

		res.json(results);
	});
});

router.route('/user/find/:field/:constraint').get(function(req, res) {
	if (!isAlphabeticOrSpace(req.params.constraint)) {
		res.status(400).send('"Constraint" constains non alphabetic characters');
		return;
	}
	if (!isAlphabeticOrSpace(req.params.field)) {
		res.status(400).send('"Field" constains non alphabetic characters');
		return;
	}
	var opts = {};
	opts[req.params.field] = new RegExp(req.params.constraint, 'i');
	User.find(opts, function (err, results) {
		if (err) {
			res.send(err);
			return;
		}

		res.json(results);
	});
});

router.route('/user_incidents').get(function(req, res) {
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
	(req.body.startDate) ? incident.startDate = req.body.startDate : null;
	(req.body.endDate) ? incident.endDate = req.body.endDate : null;
	(req.body.privateNotes) ? incident.privateNotes = req.body.privateNotes : null;
	(req.body.publicNotes) ? incident.publicNotes = req.body.publicNotes : null;

	if (req.body.insurance || req.body.insurancePolicy || req.body.pathology || req.body.physiotherapist || req.body.doctor || req.body.startDate || req.body.endDate || req.body.privateNotes || req.body.publicNotes) {
		user.incidents = [ incident ];
		incident._user = user;
	}

	user.save(function(err, user) {
		if (err) {
			res.send(err);
			return;
		}

		if (!user.incidents.length) {
			res.json({message: 'Successfully added!'});
		} else {
			incident.save(function (err, incident) {
				if (err) {
					res.send(err);
					return;
				}

				res.json({message: 'Successfully added!'});
			});
		}
	});
});

router.route('/user/:userId').put(function(req, res) {
	User.findById(req.params.userId, function(err, user) {
		if (err) {
			res.send(err);
			return;
		}

		(req.body.name) ? user.name = req.body.name : null;
		(req.body.telephone) ? user.telephone = req.body.telephone : null;
		(req.body.taxNumber) ? user.taxNumber = req.body.taxNumber : null;
		(req.body.genre) ? user.genre = req.body.genre : null;
		(req.body.postalAddress) ? user.postalAddress = req.body.postalAddress : null;
		(req.body.job) ? user.job = req.body.job : null;

		user.save(function(err) {
			if (err) {
				res.send(err);
				return;
			}

			res.json({ message: 'User has been updated' });
		});
	});
});

router.route('/user/:userId').delete(function(req, res) {
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

router.route('/incident/find/:field/:constraint').get(function(req, res) {
	if (!isAlphabeticOrSpace(req.params.constraint)) {
		res.status(400).send('"Constraint" constains non alphabetic characters');
		return;
	}
	if (!isAlphabeticOrSpaceOrUnderscore(req.params.field)) {
		res.status(400).send('"Field" constains non alphabetic characters');
		return;
	}
	var opts = {};
	if (req.params.field === '_user') {
		// do not search by regex if we are searching by an ObjectId
		opts[req.params.field] = req.params.constraint;
	} else {
		opts[req.params.field] = new RegExp(req.params.constraint, 'i');
	}
	Incident.find(opts, function (err, results) {
		if (err) {
			res.send(err);
			return;
		}

		res.json(results);
	});
});

router.route('/incident').post(function(req, res) {
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
		(req.body.startDate) ? incident.startDate = req.body.startDate : null;
		(req.body.endDate) ? incident.endDate = req.body.endDate : null;
		(req.body.privateNotes) ? incident.privateNotes = req.body.privateNotes : null;
		(req.body.publicNotes) ? incident.publicNotes = req.body.publicNotes : null;

		incident.save(function (err, incident) {
			if (err) {
				res.send(err);
				return;
			}

			user.incidents.push(incident);
			user.save(function (err, obj) {
				res.json({message: 'Successfully added!'});
			});
		});
	});
});

router.route('/incident/:incidentId').delete(function(req, res) {
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
	Incident.findById(req.params.incidentId, function(err, incident) {
		if (err) {
			res.send(err);
			return;
		}

		(req.body.insurance) ? incident.insurance = req.body.insurance : null;
		(req.body.insurancePolicy) ? incident.insurancePolicy = req.body.insurancePolicy : null;
		(req.body.pathology) ? incident.pathology = req.body.pathology : null;
		(req.body.physiotherapist) ? incident.physiotherapist = req.body.physiotherapist : null;
		(req.body.doctor) ? incident.doctor = req.body.doctor : null;
		(req.body.startDate) ? incident.startDate = req.body.startDate : null;
		(req.body.endDate) ? incident.endDate = req.body.endDate : null;
		(req.body.privateNotes) ? incident.privateNotes = req.body.privateNotes : null;
		(req.body.publicNotes) ? incident.publicNotes = req.body.publicNotes : null;

		incident.save(function(err, incident) {
			if (err) {
				res.send(err);
				return;
			}

			res.json(incident);
		});
	});
});

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
	console.log(`api running on port ${port}`);
});