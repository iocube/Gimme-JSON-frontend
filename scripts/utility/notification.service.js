(function () {
    'use strict';

    angular.module('gimmeJSONApp').factory('NotificationService', NotificationService);
    NotificationService.$inject = ['$compile', '$rootScope', '$interval'];

    function NotificationService($compile, $rootScope, $interval) {
        var temporaryNotificationStorage = [];
        var subscriber;
        var componentDOMElement;
        var isPollingEnabled = false;
        var types = {
            ERROR: 0,
            SUCCESS: 1,
            INFO: 2
        };

        function initialize(configuration) {
            if (componentDOMElement) {
                document.getElementById('notification-component').remove();
            }

            var isolatedScope = $rootScope.$new(true);
            isolatedScope.position = configuration.position;

            componentDOMElement = $compile(
                '<notification id="notification-component" position="{{position}}"></notification>'
            )(isolatedScope);

            document.body.appendChild(componentDOMElement[0]);
        }

        function push(notification) {
            // if component does not exists in the DOM, create it.
            if (subscriber) {
                subscriber(notification);
            } else {
                temporaryNotificationStorage.push(notification);
                polling();
            }
        }

        function subscribe(callback) {
            subscriber = callback;
        }

        function polling() {
            if (isPollingEnabled) {
                return;
            }

            isPollingEnabled = true;
            var promise = $interval(function() {
                console.log('polling');
                if (subscriber) {
                    isPollingEnabled = false;
                    $interval.cancel(promise);
                    angular.forEach(temporaryNotificationStorage, function(notification) {
                        subscriber(notification);
                    });
                }
            }, 200);
        }

        return {
            push: push,
            subscribe: subscribe,
            types: types,
            initialize: initialize
        };
    }
})();
