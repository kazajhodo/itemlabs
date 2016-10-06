'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Itemlab Schema
 */
var ItemlabSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Itemlab name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Itemlab', ItemlabSchema);
