(function () {
  'use strict';

  angular
    .module('core')
    .controller('ChampionController', ChampionController);

  ChampionController.$inject = ['$scope'];

  function ChampionController($scope) {
    console.log('herow');
  }
}());
