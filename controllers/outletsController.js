const db = require("../models");

// Defining methods for the booksController
module.exports = {
	findAll: function(req, res) {
		db.Outlet
		.find(req.query)
		.sort({ date: -1 })
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
	},
	findOutlets: function(req, res) {
		db.Outlet
		.find(req.query)
		.sort({ date: -1 })
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
	},
		findById: function(req, res) {
			db.Outlet
			.findById(req.params.id)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
		},
		create: function(req, res) {
			db.Outlet 
			.create(req.body)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
		},
		update: function(req, res) {
			db.Outlet
			.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
		},
		remove: function(req, res) {
			db.Outlet
			.findById({ _id: req.params.id })
			.then(dbModel => dbModel.remove())
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
		}
	};
	