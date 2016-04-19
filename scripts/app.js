(function() {
  'use strict';

  angular.module('gimmeJSONApp', ['ui.router']);
  angular.module('gimmeJSONApp').config(app);
  app.$inject = ['$locationProvider', '$stateProvider'];

  function app($locationProvider, $stateProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('resource', {
        url: '/',
        templateUrl: 'scripts/resource/resource.html',
        controller: 'ResourceController as self'
      });
  }
})();
