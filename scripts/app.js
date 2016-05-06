(function() {
  'use strict';

  angular.module('gimmeJSONApp', ['ui.router', 'restangular']);
  angular.module('gimmeJSONApp').config(app);
  angular.module('gimmeJSONApp').constant('BACKEND_ENDPOINT', 'http://localhost:5000');
  app.$inject = ['$locationProvider', '$stateProvider', 'RestangularProvider', 'BACKEND_ENDPOINT'];

  function app($locationProvider, $stateProvider, RestangularProvider, BACKEND_ENDPOINT) {
    $locationProvider.html5Mode(true);
    RestangularProvider.setBaseUrl(BACKEND_ENDPOINT);

    $stateProvider
      .state('resource', {
        url: '/',
        templateUrl: 'scripts/resource/resource.html',
        controller: 'ResourceController as self'
      });
  }
})();
