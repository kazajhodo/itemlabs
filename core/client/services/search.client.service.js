(function () {
  'use strict';

  angular
    .module('core')
    .factory('SearchService', SearchService);

  SearchService.$inject = ['$http', '$q'];

  function SearchService($http, $q) {
    return {
      getChampions: function() {
        var deferred = $q.defer();

        $http.get('/api/champions')
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function(data) {
            deferred.reject(data);
          });
        return deferred.promise;
      }
    };
  }
}());
