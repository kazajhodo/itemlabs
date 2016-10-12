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
      var champions = data.getChampions,
        imageUrl = 'http://ddragon.leagueoflegends.com/cdn/6.20.1/img/champion/',
        options = [];

      _.forEach(champions, function (value, key) {
        options.push({ 'name': champions[key].name + ' - ' + champions[key].title, 'image': imageUrl + champions[key].image.full });
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
