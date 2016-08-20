(function () {
    'use strict';

    angular.module('gimmeJSONApp').factory('pollingService', pollingService);
    pollingService.$inject = ['$timeout', '$q'];

    function pollingService($timeout, $q) {
        var maxTries,
            currentNumberOfTries = 0,
            nextPollIn,
            deferred,
            asyncAction,
            stopCondition;

        var reason = {
            MAX_TRIES_REACHED: 1,
            STOP_CONDITION: 2
        };

        function initialize(func, stopIfFunc, configuration) {
            nextPollIn = configuration.nextPollIn || 200;
            maxTries = configuration.maxTries || 5;

            deferred = $q.defer();

            asyncAction = func;
            stopCondition = stopIfFunc;

            polling();
            return deferred.promise;
        }

        function polling() {
            currentNumberOfTries += 1;
            var promise = asyncAction();

            promise.then(handleResponse);
            promise.catch(handleResponse);
        }

        function handleResponse(data) {
            if (stopCondition(data)) {
                // stop polling
                deferred.resolve({reason: reason.STOP_CONDITION, data: data});
                return;
            } else if (currentNumberOfTries == maxTries) {
                deferred.reject({reason: reason.MAX_TRIES_REACHED});
                return;
            }

            $timeout(function () {
                polling();
            }, nextPollIn);
        }

        return {
            initialize: initialize,
            reason: reason
        };
    }
})();

