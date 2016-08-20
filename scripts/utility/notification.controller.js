(function () {
    'use strict';

    angular.module('gimmeJSONApp').controller('NotificationController', NotificationController);
    NotificationController.$inject = ['NotificationService'];

    function NotificationController(NotificationService) {
        var self = this;
        self.messages = [];
        self.types = NotificationService.types;

        function onNewNotification(message) {
            self.messages.unshift(message);
        }

        NotificationService.subscribe(onNewNotification);

        self.close = function(idx) {
            self.messages.splice(idx, 1);
        };
    }
})();
