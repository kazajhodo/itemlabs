(function () {
  'use strict';

  angular
    .module('itemlabs')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'modules/itemlabs/client/views/home.itemlab.client.html',
        controller: 'SearchController',
        controllerAs: 'search'
      })
      .state('champion', {
        url: '/champion/:champion',
        templateUrl: 'modules/itemlabs/client/views/champion.itemlab.view.html',
        controller: 'ChampionController',
        controllerAs: 'champion'
      });
  }
}());
