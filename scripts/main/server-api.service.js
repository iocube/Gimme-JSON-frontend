(function () {
    'use strict';

    angular.module('gimmeJSONApp').factory('serverAPIService', serverAPIService);
    serverAPIService.$inject = ['MOCK_SERVER_ENDPOINT', '$resource'];

    function serverAPIService(MOCK_SERVER_ENDPOINT, $resource) {
        var endpoint = $resource(
            MOCK_SERVER_ENDPOINT + '/gimme-mock-server/'
        );

        return {
            status: endpoint.get,
            restart: endpoint.delete
        };
    }
})();
