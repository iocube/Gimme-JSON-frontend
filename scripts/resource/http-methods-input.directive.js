(function() {
  'use strict';

  angular.module('gimmeJSONApp').directive('httpMethodsInput', httpMethodsInput);
  httpMethodsInput.$inject = [];

  function httpMethodsInput() {
    var directive = {
      templateUrl: 'scripts/resource/http-methods-input.html',
      restrict: 'E',
      scope: {
        methods: '='
      },
      controller: httpMethodsInputController,
      controllerAs: 'self',
      bindToController: true
    };

    return directive;
  }

  httpMethodsInputController.$inject = [];
  function httpMethodsInputController() {
    var self = this;

    self.toggle = function(method) {
      var idx = self.find(method);

      if (idx >= 0) {
        if (!self.isLastActiveMethod()) {
          self.methods.splice(idx, 1);
        }
      } else {
        self.methods.push(method);
      }
    };

    self.find = function(method) {
      return self.methods.indexOf(method);
    };

    self.isActive = function(method) {
      return self.find(method) >= 0;
    };

    self.isLastActiveMethod = function() {
      return self.methods.length === 1;
    };
  }
})();
