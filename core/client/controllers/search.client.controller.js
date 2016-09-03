(function () {
  'use strict';

  angular
    .module('core')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['$scope', 'SearchService'];

  function SearchController($scope, SearchService) {

    $scope.championNames = function (str, people) {
      var matches = [];

      angular.forEach(people, function (key, person) {
        var fullName = person.firstName + ' ' + person.surname;

        if ((person.firstName.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) ||
            (person.surname.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) ||
            (fullName.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0)) {
          matches.push(person);
        }
      });
      return matches;
    };

    // What to do once an option is chosen
    $scope.selectedChampion = function(selected) {
      if (selected) {
        window.alert('You have selected ' + selected.title);
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
        var pos = Math.floor(Math.random() * ($scope.countries.length - 1));
        $scope.$broadcast('angucomplete-alt:changeInput', id, $scope.countries[pos]);
      }
    };

    $scope.disableInput = true;

    // Attempting to call service in order to retreive champion names
    SearchService.getChampions()
      .then(function(data) {
        $scope.champions = data;
      }, function(error) {
        console.error(error);
      });
  }
}());
