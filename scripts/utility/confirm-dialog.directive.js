(function() {
  'use strict';

  angular.module('gimmeJSONApp').directive('confirmDialog', confirmDialog);
  confirmDialog.$inject = ['$window', '$templateRequest', '$compile'];

  function confirmDialog($window, $templateRequest, $compile) {
    var directive = {
      restrict: 'A',
      scope: {
        onAccept: '&',
        onCancel: '&?',
        body: '@'
      },
      link: function(scope, elem, attrs) {
        scope.DIALOG_ID = 'dialog';

        elem.on('click', function() {
          if (isOpen()) {
            return;
          }

          open();
        });

        function isOpen() {
          return document.getElementById(scope.DIALOG_ID) ? true : false;
        }

        function open() {
          $templateRequest('scripts/utility/confirm-dialog.html').then(function(template) {
            template = angular.element(template)[0];
            document.body.appendChild(template);
            $compile(template)(scope);
          });
        }

        function close() {
          var dialog = document.getElementById(scope.DIALOG_ID);
          dialog.parentNode.removeChild(dialog);
        }

        scope.onAcceptWrapper = function() {
          scope.onAccept();
          close();
        }

        scope.onCancelWrapper = function() {
          if (scope.onCancel) {
            scope.onCancel();
          }

          close();
        }

        elem.on('$destroy', function() {
          elem.unbind('click');
        })
      }
    }

    return directive;
  }
})();
