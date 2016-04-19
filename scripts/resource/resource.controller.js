(function() {
  'use strict';

  angular.module('gimmeJSONApp').controller('ResourceController', ResourceController);
  ResourceController.$inject = [];

  function ResourceController() {
      var self = this;
      
      self.message = "I Am Resource Controller";
  }
})();
