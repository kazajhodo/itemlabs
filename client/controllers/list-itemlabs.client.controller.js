(function () {
  'use strict';

  angular
    .module('itemlabs')
    .controller('ItemlabsListController', ItemlabsListController);

  ItemlabsListController.$inject = ['ItemlabsService'];

  function ItemlabsListController(ItemlabsService) {
    var vm = this;

    vm.itemlabs = ItemlabsService.query();
  }
}());
