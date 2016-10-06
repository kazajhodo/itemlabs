(function () {
  'use strict';

  // Itemlabs controller
  angular
    .module('itemlabs')
    .controller('ItemlabsController', ItemlabsController);

  ItemlabsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'itemlabResolve'];

  function ItemlabsController ($scope, $state, $window, Authentication, itemlab) {
    var vm = this;

    console.log('hello');

    vm.authentication = Authentication;
    vm.itemlab = itemlab;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Itemlab
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.itemlab.$remove($state.go('itemlabs.list'));
      }
    }

    // Save Itemlab
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.itemlabForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.itemlab._id) {
        vm.itemlab.$update(successCallback, errorCallback);
      } else {
        vm.itemlab.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('itemlabs.view', {
          itemlabId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
