(function() {
    'use strict';

    angular.module('gimmeJSONApp', ['ui.router', 'ngResource']);
    angular.module('gimmeJSONApp').config(app);
    app.$inject = ['$locationProvider', '$stateProvider', 'BACKEND_ENDPOINT', '$resourceProvider'];

    function app($locationProvider, $stateProvider, BACKEND_ENDPOINT, $resourceProvider) {
        $locationProvider.html5Mode(true);

        $resourceProvider.defaults.stripTrailingSlashes = false;
        $resourceProvider.defaults.actions.patch = {
            method: 'PATCH'
        };
        $resourceProvider.defaults.actions.getList = {
            method: 'GET',
            isArray: true
        };
        $resourceProvider.defaults.actions.put = {
            method: 'PUT'
        };

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'scripts/main/main.html',
                controller: 'MainController as self'
            });
    }
})();
