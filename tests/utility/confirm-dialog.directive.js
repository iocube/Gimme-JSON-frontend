describe('confirmDialog', function() {
  beforeEach(module('gimmeJSONApp', 'scripts/utility/confirm-dialog.html'));

  var $compile,
      $rootScope,
      $controller;

  beforeEach(inject(function($injector) {
    $compile = $injector.get('$compile');
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
  }));


  it('example', function() {
    var scope = $rootScope.$new();
    scope.onAccept = function() {return 1;};

    var element = $compile('<button id="button" confirm-dialog on-accept="onAccept()" body="Demo">Dialog</button>')(scope);
    document.body.appendChild(element[0]);
    scope.$digest();

    spyOn(scope, 'onAccept');

    // click on button
    element[0].click();
    scope.$digest();

    // after dialog window is open, click on confirmation button
    var acceptButton = document.getElementsByClassName('btn--save');
    acceptButton[0].click();

    expect(scope.onAccept).toHaveBeenCalled();
  });
});
