'use strict';

var staticData = require('./static.server.controller'),
  lolapi = require('lolapi')(process.env.RIOT_API, 'na');

/**
 * Remove summoner database entries before updating information
 *  -equal or greater than an hour will be removed/updated
 */
exports.duplicateRemove = function (db, value) {
  db.remove({ name: value }, function (error, data) {
    if (error) console.error('Duplicates remove is not working.');
  });
  return;
};

/**
 * Some data from the riot api is not returned at all if its value is 0
 * Checks if a value is set, if not returns the value as 0
 *  - for instance champion deaths are not set to 0 if a player did not die in a game
 */
exports.zeroCheck = function (value) {
  return value || 0;
};

/**
 * Get current data dragon version number for recent data retreival
 */
exports.getStatic = function (req, res) {
  lolapi.Static.getVersions(function (error, data) {
    if (error) {
      console.error(error);
    } else {
      var version = data[0];

      staticData.getStatic(req, res, version);
    }
  });
};
