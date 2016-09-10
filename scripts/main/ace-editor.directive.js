(function () {
    'use strict';

    angular.module('gimmeJSONApp').directive('aceEditor', aceEditor);
    aceEditor.$inject = ['$timeout'];

    function aceEditor($timeout) {
        return {
            restrict: 'A',
            scope: {
                content: '=',
                setValue: '=?'
            },
            link: function (scope, element) {
                var editor = ace.edit(element[0]);
                editor.$blockScrolling = Infinity;

                scope.setValue = function(content) {
                    editor.setValue(content, 1);
                };

                editor.setTheme("ace/theme/twilight");
                editor.session.setMode("ace/mode/json");

                editor.getSession().on('change', function() {
                    scope.content = editor.getValue();

                    $timeout(function() {
                        scope.$apply();
                    });
                });

                scope.$on('$destroy', function() {
                    editor.getSession().removeAllListeners('change');
                });
            }
        };
    }
})();
