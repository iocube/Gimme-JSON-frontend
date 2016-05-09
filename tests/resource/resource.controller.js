describe('ResourceController', function() {
  beforeEach(module('gimmeJSONApp'));

  var $controller,
    $rootScope,
    scope;

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    $rootScope = $injector.get('$rootScope');
    scope = $rootScope.$new();
    ctrl = $controller('ResourceController', {$scope: scope});
  }));

  it('example', function() {
    expect(ctrl.isPanelOpen).toEqual(false);
  });
});
