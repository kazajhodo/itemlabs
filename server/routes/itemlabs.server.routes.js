'use strict';

module.exports = function (app) {
  var champion = require('../controllers/champion.server.controller'),
    params = require('../controllers/params.server.controller');

  app.route('/api/champions').get(champion.getChampions);

  app.post('/api/champion/:champion', function(req, res) {
    var championKey = req.params.champion;

    champion.championData(req, res, championKey);
  });

  app.param('champion', params.championData);
};
