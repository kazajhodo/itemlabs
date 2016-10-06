(function () {
  'use strict';

  angular
    .module('core')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['$scope', 'SearchService'];

  function SearchController($scope, SearchService) {
    // What to do once an option is chosen
    $scope.selectedChampion = function (selected) {
      if (selected) {
        SearchService.getChampData(selected.originalObject)
          .then(function (data) {
            console.log(data);
          }, function (er) {
            console.error(er);
          });
      } else {
        console.log('cleared');
      }
    };

    /*
    * Send a broadcast to the directive in order to clear itself
    * if an id parameter is given only this ancucomplete is cleared
    * @param id
    */
    $scope.clearInput = function (id) {
      if (id) {
        $scope.$broadcast('angucomplete-alt:clearInput', id);
      } else {
        $scope.$broadcast('angucomplete-alt:clearInput');
      }
    };

    /*
    * Send a broadcast to the directive in order to change itself
    * if an id parameter is given only this ancucomplete is changed
    * @param id
    */
    $scope.changeInput = function (id) {
      if (id) {
        var pos = Math.floor(Math.random() * ($scope.champions.length - 1));
        $scope.$broadcast('angucomplete-alt:changeInput', id, $scope.champions[pos]);
      }
    };

    $scope.disableInput = true;

    // Define autocomplete options via SearchService
    SearchService.getChampions()
      .then(function(data) {
        $scope.champions = data;
      }, function(error) {
        console.error(error);
      });
  }
}());
