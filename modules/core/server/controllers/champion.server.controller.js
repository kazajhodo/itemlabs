'use strict';

var mongoose = require('mongoose'),
  utility = require('./utility.server.controller'),
  ChampionsData = mongoose.model('StaticChampions'),
  _ = require('lodash');

// Have autopopulate options working in frontend
// Now pull champion data from api and store in mongo
// Check if data exists, if not pull from api, if it does pull from mongo
exports.getChampions = function (req, res) {
  utility.getStatic(req, res);

  ChampionsData.findOne({}, function (er, data) {
    if (er) {
      console.error(er);
    } else {
      var keys = data.getKeys,
        options = [];

      _.forEach(keys, function (value, key) {
        options.push({ 'name': value, 'key': key });
      });

      res.json(options);
    }
  });
};

exports.championData = function(req, res, championKey) {
  ChampionsData.findOne({}, function (err, data) {
    if (err) {
      console.error(err);
    } else {
      var championData = data.getChampions[championKey];

      res.json(championData);
    }
  });
};
