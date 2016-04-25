(function() {
  'use strict';

  angular.module('gimmeJSONApp').factory('resourceAPIService', resourceAPIService);
  resourceAPIService.$inject = [];

  function resourceAPIService() {
    return {
      get: function() { console.log('get'); },
      post: function() { console.log('post'); },
      delete: function() { console.log('post'); },
      patch: function() { console.log('patch'); }
    }
  }
})();
