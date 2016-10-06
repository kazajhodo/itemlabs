// Itemlabs service used to communicate Itemlabs REST endpoints
(function () {
  'use strict';

  angular
    .module('itemlabs')
    .factory('ItemlabsService', ItemlabsService);

  ItemlabsService.$inject = ['$resource'];

  function ItemlabsService($resource) {
    return $resource('api/itemlabs/:itemlabId', {
      itemlabId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
