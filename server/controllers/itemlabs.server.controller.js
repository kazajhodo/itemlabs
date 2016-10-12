'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Itemlab = mongoose.model('Itemlab'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Itemlab
 */
exports.create = function(req, res) {
  var itemlab = new Itemlab(req.body);
  itemlab.user = req.user;

  itemlab.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(itemlab);
    }
  });
};

/**
 * Show the current Itemlab
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var itemlab = req.itemlab ? req.itemlab.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  itemlab.isCurrentUserOwner = req.user && itemlab.user && itemlab.user._id.toString() === req.user._id.toString();

  res.jsonp(itemlab);
};

/**
 * Update a Itemlab
 */
exports.update = function(req, res) {
  var itemlab = req.itemlab;

  itemlab = _.extend(itemlab, req.body);

  itemlab.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(itemlab);
    }
  });
};

/**
 * Delete an Itemlab
 */
exports.delete = function(req, res) {
  var itemlab = req.itemlab;

  itemlab.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(itemlab);
    }
  });
};

/**
 * List of Itemlabs
 */
exports.list = function(req, res) {
  Itemlab.find().sort('-created').populate('user', 'displayName').exec(function(err, itemlabs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(itemlabs);
    }
  });
};

/**
 * Itemlab middleware
 */
exports.itemlabByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Itemlab is invalid'
    });
  }

  Itemlab.findById(id).populate('user', 'displayName').exec(function (err, itemlab) {
    if (err) {
      return next(err);
    } else if (!itemlab) {
      return res.status(404).send({
        message: 'No Itemlab with that identifier has been found'
      });
    }
    req.itemlab = itemlab;
    next();
  });
};
