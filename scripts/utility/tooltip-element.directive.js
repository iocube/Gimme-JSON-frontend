(function () {
    'use strict';

    angular.module('gimmeJSONApp').directive('tooltipElement', tooltipElement);
    tooltipElement.$inject = [];

    function tooltipElement() {
        var directive = {
            restrict: 'E',
            scope: {
                tooltipText: '@',
                className: '@?'
            },
            templateUrl: 'scripts/utility/tooltip-element.html'
        };

        return directive;
    }
})();
