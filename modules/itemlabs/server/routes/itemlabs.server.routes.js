'use strict';

/**
 * Module dependencies
 */
var itemlabsPolicy = require('../policies/itemlabs.server.policy'),
  itemlabs = require('../controllers/itemlabs.server.controller');

module.exports = function(app) {
  // Itemlabs Routes
  app.route('/api/itemlabs').all(itemlabsPolicy.isAllowed)
    .get(itemlabs.list)
    .post(itemlabs.create);

  app.route('/api/itemlabs/:itemlabId').all(itemlabsPolicy.isAllowed)
    .get(itemlabs.read)
    .put(itemlabs.update)
    .delete(itemlabs.delete);

  // Finish by binding the Itemlab middleware
  app.param('itemlabId', itemlabs.itemlabByID);
};
