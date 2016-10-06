(function () {
  'use strict';

  angular
    .module('itemlabs')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('itemlabs', {
        abstract: true,
        url: '/itemlabs',
        template: '<ui-view/>'
      })
      .state('itemlabs.list', {
        url: '',
        templateUrl: 'modules/itemlabs/client/views/list-itemlabs.client.view.html',
        controller: 'ItemlabsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Itemlabs List'
        }
      })
      .state('itemlabs.create', {
        url: '/create',
        templateUrl: 'modules/itemlabs/client/views/form-itemlab.client.view.html',
        controller: 'ItemlabsController',
        controllerAs: 'vm',
        resolve: {
          itemlabResolve: newItemlab
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Itemlabs Create'
        }
      })
      .state('itemlabs.edit', {
        url: '/:itemlabId/edit',
        templateUrl: 'modules/itemlabs/client/views/form-itemlab.client.view.html',
        controller: 'ItemlabsController',
        controllerAs: 'vm',
        resolve: {
          itemlabResolve: getItemlab
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Itemlab {{ itemlabResolve.name }}'
        }
      })
      .state('itemlabs.view', {
        url: '/:itemlabId',
        templateUrl: 'modules/itemlabs/client/views/view-itemlab.client.view.html',
        controller: 'ItemlabsController',
        controllerAs: 'vm',
        resolve: {
          itemlabResolve: getItemlab
        },
        data: {
          pageTitle: 'Itemlab {{ itemlabResolve.name }}'
        }
      });
  }

  getItemlab.$inject = ['$stateParams', 'ItemlabsService'];

  function getItemlab($stateParams, ItemlabsService) {
    return ItemlabsService.get({
      itemlabId: $stateParams.itemlabId
    }).$promise;
  }

  newItemlab.$inject = ['ItemlabsService'];

  function newItemlab(ItemlabsService) {
    return new ItemlabsService();
  }
}());
