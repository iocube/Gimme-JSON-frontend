describe('resourceAPIService', function() {
  beforeEach(module('gimmeJSONApp'));

  var resourceAPIService;
  beforeEach(inject(function($injector) {
    resourceAPIService = $injector.get('resourceAPIService');
  }));

  it('example', function() {
    expect(resourceAPIService.get).toBeDefined();
  });
});
