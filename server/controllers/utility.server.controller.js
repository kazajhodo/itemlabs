'use strict';

var staticData = require('./static.server.controller'),
  _ = require('lodash'),
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

exports.champAverages = function (champions) {
  var averages = {},
    highStats = {},
    lowStats = {},
    count = 0,
    total = Object.keys(champions).length;

    // Loop over each champion and grabs stats data
  _.forEach(champions, function (value, key) {
    var stats = champions[key].stats;

    // Loop through each stat and add to matching key
    // Result will be all stats with a total value across all champions
    // In the final loop we will devise averages

    // Also deduce highest and lowest ranges of each stat
    // Saving those stats to their respective objects
    _.forEach(stats, function (value, key) {
      var previous = (averages[key] ? averages[key] : 0),
        current = previous + value,
        high = (highStats[key] ? highStats[key] : 0),
        low = (lowStats[key] ? lowStats[key] : 10000);

      if (high < value) {
        highStats[key] = _.round(value, 3);
      }

      if (low > value) {
        lowStats[key] = _.round(value, 3);
      }

      averages[key] = _.round(current, 3);
    });
    count ++;

    // Divide by the total number of champions to obtain stat averages
    if (total === count) {
      _.forEach(averages, function (value, key) {
        averages[key] = _.round(value / total, 3);
      });

      // Returns averages object
      // Defined as: key: [average, high, low]
      averages = _.mergeWith(averages, highStats, lowStats, function (objValue, srcValue, key, object, source, stack) {
        return _.concat(objValue, srcValue);
      });
    }
  });
  return averages;
};
