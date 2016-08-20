(function () {
    'use strict';

    angular.module('gimmeJSONApp').directive('notification', notification);
    notification.$inject = [];

    function notification() {
        var directive = {
            restrict: 'E',
            scope: {
                position: '@'
            },
            templateUrl: 'scripts/utility/notification.html',
            controller: 'NotificationController as self',
            bindToController: true
        };

        return directive;
    }
})();
