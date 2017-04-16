(function () {
    'use strict';

    angular.module('gimmeJSONApp').factory('endpointAPIService', endpointAPIService);
    endpointAPIService.$inject = ['BACKEND_ENDPOINT', '$resource'];

    function endpointAPIService(BACKEND_ENDPOINT, $resource) {
        var endpoint = $resource(
            BACKEND_ENDPOINT + '/endpoint/:id/'
        );

        return {
            get: endpoint.get,
            getList: endpoint.getList,
            post: endpoint.save,
            put: endpoint.put,
            patch: endpoint.patch,
            delete: endpoint.delete
        };
    }
})();
