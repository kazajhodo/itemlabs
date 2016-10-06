'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller'),
    champion = require('../controllers/champion.server.controller'),
    params = require('../controllers/params.server.controller');

  app.route('/api/champions').get(champion.getChampions);

  app.post('/api/champion/:champion', function(req, res) {
    var championKey = req.params.champion;

    champion.championData(req, res, championKey);
  });

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/*').get(core.renderIndex);

  app.param('champion', params.championData);
};
