(function () {
    'use strict';

    angular.module('gimmeJSONApp').factory('serverAPIService', serverAPIService);
    serverAPIService.$inject = ['Restangular'];

    function serverAPIService(Restangular) {
        var baseEndpoint = Restangular.all('/server/');

        function restart() {
            return baseEndpoint.remove();
        }

        function status() {
            return baseEndpoint.one('status').get();
        }

        return {
            restart: restart,
            status: status
        };
    }
})();
