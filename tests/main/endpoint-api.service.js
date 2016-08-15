describe('endpointAPIService', function() {
  beforeEach(module('gimmeJSONApp'));

  var endpointAPIService;
  beforeEach(inject(function($injector) {
    endpointAPIService = $injector.get('endpointAPIService');
  }));

  it('example', function() {
    expect(endpointAPIService.get).toBeDefined();
  });
});
