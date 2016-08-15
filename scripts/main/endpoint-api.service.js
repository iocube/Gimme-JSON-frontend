(function() {
  'use strict';

  angular.module('gimmeJSONApp').factory('endpointAPIService', endpointAPIService);
  endpointAPIService.$inject = ['Restangular', 'BACKEND_ENDPOINT'];

  function endpointAPIService(Restangular, BACKEND_ENDPOINT) {
    var baseEndpoint = Restangular.all('/endpoint/');

    function get() {
      return baseEndpoint.getList();
    }

    function post(payload) {
      return baseEndpoint.post(payload);
    }

    function remove(endpointId) {
      return baseEndpoint.one(endpointId).remove();
    }

    function put(endpointId, payload) {
      return baseEndpoint.one(endpointId).customPUT(payload);
    }

    return {
      get: get,
      post: post,
      remove: remove,
      put: put
    };
  }
})();
