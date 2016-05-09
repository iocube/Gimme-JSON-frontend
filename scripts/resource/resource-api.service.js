(function() {
  'use strict';

  angular.module('gimmeJSONApp').factory('resourceAPIService', resourceAPIService);
  resourceAPIService.$inject = ['Restangular', 'BACKEND_ENDPOINT'];

  function resourceAPIService(Restangular, BACKEND_ENDPOINT) {
    var baseEndpoint = Restangular.all('/resource');

    function get() {
      return baseEndpoint.getList();
    }

    function post(payload) {
      return baseEndpoint.post(payload);
    }

    function remove(resourceId) {
      return baseEndpoint.one(resourceId).remove();
    }

    function put(resourceId, payload) {
      return baseEndpoint.one(resourceId).customPUT(payload);
    }

    return {
      get: get,
      post: post,
      remove: remove,
      put: put
    };
  }
})();
