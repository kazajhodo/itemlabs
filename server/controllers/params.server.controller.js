'use strict';

var mongoose = require('mongoose'),
  Champions = mongoose.model('StaticChampions');

/**
 * Gather Summoner Name for page data
 */
exports.championData = function(req, res, next, key) {
  Champions.find({}, function (err, data) {
    if (err) {
      console.error(err);
    } else {
      req.champion = key;
    }
    next();
  });
};
