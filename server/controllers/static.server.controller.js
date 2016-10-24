'use strict';

/*
 * Todo:
 * Loop over all champions and figure out averages for each stat
 * Take those averages and add to object as a key + modifier : value for frontend display
 * Average from the amount of averages a base stat rating
*/

var mongoose = require('mongoose'),
  Summoner = mongoose.model('Summoner'),
  ChampionsData = mongoose.model('StaticChampions'),
  ItemsData = mongoose.model('StaticItems'),
  MasteriesData = mongoose.model('StaticMasteries'),
  RealmData = mongoose.model('StaticRealm'),
  RunesData = mongoose.model('StaticRunes'),
  SpellsData = mongoose.model('StaticSpells'),
  utility = require('./utility.server.controller'),
  _ = require('lodash'),
  lolapi = require('lolapi')(process.env.RIOT_API, 'na');

/**
 * Get and set static data from api
 */
exports.getStatic = function (req, res, version) {
  var champions = new ChampionsData(req.body),
    items = new ItemsData(req.body),
    masteries = new MasteriesData(req.body),
    realm = new RealmData(req.body),
    runes = new RunesData(req.body),
    _ = require('lodash');

  ChampionsData.findOne({ staticVersion: version }, function (error, data) {
    if (error) {
      console.error(error);
    } else {
      if (data !== null && data.staticVersion === version) {
        console.log('Champions Data Current');
      } else {
        var championsOptions = { dataById: true, champData: 'all' };

        lolapi.Static.getChampions(championsOptions, function (error, data, res) {
          if (error) {
            console.error(error);
          } else {
            champions.getKeys = data.keys;
            champions.getChampions = data.data;
            champions.staticVersion = version;
            champions.champCount = _.keys(data.data).length;
            champions.champAverages = utility.champAverages(champions.getChampions);

            utility.duplicateRemove(ChampionsData, data.staticVersion);
            exports.saveStatic(res, champions);
          }
        });
      }
    }
  });

  ItemsData.findOne({ staticVersion: version }, function (error, data) {
    if (error) {
      console.error(error);
    } else {
      if (data !== null && data.staticVersion === version) {
        console.log('Items Data Current');
      } else {
        var itemsOptions = { itemListData: 'all' };

        lolapi.Static.getItems(itemsOptions, function (error, data, res) {
          if (error) {
            console.error(error);
          } else {
            items.getItems = data.data;
            items.staticVersion = version;

            utility.duplicateRemove(ItemsData, data.staticVersion);
            exports.saveStatic(res, items);
          }
        });
      }
    }
  });

  MasteriesData.findOne({ staticVersion: version }, function (error, data) {
    if (error) {
      console.error(error);
    } else {
      if (data !== null && data.staticVersion === version) {
        console.log('Masteries Data Current');
      } else {
        var masteriesOptions = { masteryListData: 'all' };

        lolapi.Static.getMasteries(masteriesOptions, function (error, data, res) {
          if (error) {
            console.error(error);
          } else {
            masteries.getMasteries = data.data;
            masteries.staticVersion = version;

            utility.duplicateRemove(MasteriesData, data.staticVersion);
            exports.saveStatic(res, masteries);
          }
        });
      }
    }
  });

  RealmData.findOne({ staticVersion: version }, function (error, data) {
    if (error) {
      console.error(error);
    } else {
      if (data !== null && data.staticVersion === version) {
        console.log('Realm Data Current');
      } else {
        lolapi.Static.getRealm(function (error, data, res) {
          if (error) {
            console.error(error);
          } else {
            realm.getRealm = data.data;
            realm.staticVersion = version;

            utility.duplicateRemove(RealmData, data.staticVersion);
            exports.saveStatic(res, realm);
          }
        });
      }
    }
  });

  RunesData.findOne({ staticVersion: version }, function (error, data) {
    if (error) {
      console.error(error);
    } else {
      if (data !== null && data.staticVersion === version) {
        console.log('Runes Data Current');
      } else {
        var runesOptions = { runeListData: ['stats', 'image'] };

        lolapi.Static.getRunes(runesOptions, function (error, data, res) {
          if (error) {
            console.error(error);
          } else {
            runes.getRunes = data.data;
            runes.staticVersion = version;

            utility.duplicateRemove(RunesData, data.staticVersion);
            exports.saveStatic(res, runes);
          }
        });
      }
    }
  });

};

/**
 * Saves retreived static data to mongo
 */
exports.saveStatic = function (res, staticData) {
  staticData.save(function (error) {
    if (error) {
      return res.send({
        message: 'Api error, likely the api has changed slightly and code needs to be updated.'
      });
    } else {
      if (res) {
        res.status(200).json(staticData);
      }
    }
  });
};
