'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Summoner Schema
 */
var SummonerSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: ''
  },
  oName: {
    type: String,
    default: '',
    trim: true,
    required: ''
  },
  id: {
    type: Number,
    default: '',
    trim: true
  },
  games: {
    type: Object,
    default: ''
  },
  matches: {
    type: Array,
    default: []
  },
  champions: {
    type: Object,
    default: ''
  },
  stats: {
    type: Object,
    default: ''
  },
  version: {
    type: String,
    default: ''
  },
  dragon: {
    type: String,
    default: 'http://ddragon.leagueoflegends.com/cdn/'
  }
});
mongoose.model('Summoner', SummonerSchema);

/**
 * Static Schema
 * This is to save current game version in order to check before retreiving static api data
 */

// create an individula schema for each api so that we can call the data individually
// be sure to have a created, static version, and api data
var ChampionsSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  staticVersion: {
    type: Object,
    default: ''
  },
  getKeys: {
    type: Object,
    default: ''
  },
  getChampions: {
    type: Object,
    default: ''
  },
  champAverages: {
    type: Object,
    default: ''
  },
  champCount: {
    type: Number,
    default: ''
  },
  dragon: {
    type: String,
    default: 'http://ddragon.leagueoflegends.com/cdn/'
  }
});
mongoose.model('StaticChampions', ChampionsSchema);

var ItemsSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  staticVersion: {
    type: Object,
    default: ''
  },
  getItems: {
    type: Object,
    default: ''
  },
  dragon: {
    type: String,
    default: 'http://ddragon.leagueoflegends.com/cdn/'
  }
});
mongoose.model('StaticItems', ItemsSchema);

var MasteriesSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  staticVersion: {
    type: Object,
    default: ''
  },
  getMasteries: {
    type: Object,
    default: ''
  },
  dragon: {
    type: String,
    default: 'http://ddragon.leagueoflegends.com/cdn/'
  }
});
mongoose.model('StaticMasteries', MasteriesSchema);

var RealmSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  staticVersion: {
    type: Object,
    default: ''
  },
  getRealm: {
    type: Object,
    default: ''
  },
  dragon: {
    type: String,
    default: 'http://ddragon.leagueoflegends.com/cdn/'
  }
});
mongoose.model('StaticRealm', RealmSchema);

var RunesSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  staticVersion: {
    type: Object,
    default: ''
  },
  getRunes: {
    type: Object,
    default: ''
  },
  dragon: {
    type: String,
    default: 'http://ddragon.leagueoflegends.com/cdn/'
  }
});
mongoose.model('StaticRunes', RunesSchema);

var SpellsSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  staticVersion: {
    type: Object,
    default: ''
  },
  getSummonerSpells: {
    type: Object,
    default: ''
  },
  dragon: {
    type: String,
    default: 'http://ddragon.leagueoflegends.com/cdn/'
  }
});
mongoose.model('StaticSpells', SpellsSchema);
