'use strict';

// Have autopopulate options working in frontend
// Now pull champion data from api and store in mongo
// Check if data exists, if not pull from api, if it does pull from mongo
exports.getChampions = function (req, res) {
  res.json([{ 'name': 'roderick' }, { 'name': 'ding-dong' }]);
};
