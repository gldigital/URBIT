const db = require("../models");
const request = require('request');

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
      .find({})
      .sort({ date: -1 })
      .then(dbModel => {
        outletNameString = "";
        for (var i =0; i < dbModel.length; i++){
            var commaString = dbModel[i].name + ",";
            outletNameString += commaString;
            // console.log(outletNameString, "commastring");
        }
        var cleanOutletNameString = outletNameString.substring(0, outletNameString.length - 1);
        // console.log(cleanOutletNameString, "we found one");

        request('https://newsapi.org/v2/everything?q=cryptocurrency&domains=' + cleanOutletNameString +'&' +
                'apiKey=b20d4f18b29a4098b58c9c3a9a21cbfd', function(err, res, body) {  
                    console.log(body);
                    res.json(body);
                });
       
      })
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
