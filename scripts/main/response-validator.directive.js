(function() {
  'use strict';

  angular.module('gimmeJSONApp').directive('responseValidator', responseValidator);
  responseValidator.$inject = [];

  function responseValidator() {
    var directive = {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl) {
        ctrl.$validators.response = function(modelValue, viewValue) {
          try {
            JSON.parse(modelValue);
          } catch(err) {
            return false;
          }

          return true;
        };
      }
    };

    return directive;
  }
})();
