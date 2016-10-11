(function () {
  'use strict';

  describe('Itemlabs Route Tests', function () {
    // Initialize global variables
    var $scope,
      ItemlabsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ItemlabsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ItemlabsService = _ItemlabsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('itemlabs');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/itemlabs');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          ItemlabsController,
          mockItemlab;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('itemlabs.view');
          $templateCache.put('modules/itemlabs/client/views/view-itemlab.client.view.html', '');

          // create mock Itemlab
          mockItemlab = new ItemlabsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Itemlab Name'
          });

          // Initialize Controller
          ItemlabsController = $controller('ItemlabsController as vm', {
            $scope: $scope,
            itemlabResolve: mockItemlab
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:itemlabId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.itemlabResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            itemlabId: 1
          })).toEqual('/itemlabs/1');
        }));

        it('should attach an Itemlab to the controller scope', function () {
          expect($scope.vm.itemlab._id).toBe(mockItemlab._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/itemlabs/client/views/view-itemlab.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ItemlabsController,
          mockItemlab;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('itemlabs.create');
          $templateCache.put('modules/itemlabs/client/views/form-itemlab.client.view.html', '');

          // create mock Itemlab
          mockItemlab = new ItemlabsService();

          // Initialize Controller
          ItemlabsController = $controller('ItemlabsController as vm', {
            $scope: $scope,
            itemlabResolve: mockItemlab
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.itemlabResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/itemlabs/create');
        }));

        it('should attach an Itemlab to the controller scope', function () {
          expect($scope.vm.itemlab._id).toBe(mockItemlab._id);
          expect($scope.vm.itemlab._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/itemlabs/client/views/form-itemlab.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ItemlabsController,
          mockItemlab;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('itemlabs.edit');
          $templateCache.put('modules/itemlabs/client/views/form-itemlab.client.view.html', '');

          // create mock Itemlab
          mockItemlab = new ItemlabsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Itemlab Name'
          });

          // Initialize Controller
          ItemlabsController = $controller('ItemlabsController as vm', {
            $scope: $scope,
            itemlabResolve: mockItemlab
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:itemlabId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.itemlabResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            itemlabId: 1
          })).toEqual('/itemlabs/1/edit');
        }));

        it('should attach an Itemlab to the controller scope', function () {
          expect($scope.vm.itemlab._id).toBe(mockItemlab._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/itemlabs/client/views/form-itemlab.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
