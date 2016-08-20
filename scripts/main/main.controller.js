(function () {
    'use strict';

    angular.module('gimmeJSONApp').controller('MainController', MainController);
    MainController.$inject = ['endpointAPIService', '$timeout', 'NotificationService', '$scope'];

    function MainController(endpointAPIService, $timeout, NotificationService, $scope) {
        var self = this;
        NotificationService.initialize({position: 'top-left'});

        self.isPanelOpen = false;

        endpointAPIService.get().then(function (endpoints) {
            self.endpoints = endpoints;
        });

        self.create = function () {
            var newEndpoint = {
                'endpoint': '/api/v1/',
                'methods': ['GET'],
                'response': '{}',
                'queryParams': []
            };

            endpointAPIService.post(newEndpoint).then(function (endpoint) {
                self.endpoints.push(endpoint);
                self.makeDraft(endpoint);
                self.openEditPanel();
            });
        };

        self.remove = function (endpointIndex) {
            var endpointId = self.endpoints[endpointIndex]._id;
            endpointAPIService.remove(endpointId).then(function () {
                self.endpoints.splice(endpointIndex, 1);
            });
        };

        self.save = function (endpoint) {
            self.isSaving = true;
            var promise = endpointAPIService.put(endpoint._id, endpoint);

            promise.then(function (updatedEndpoint) {
                updateEndpointInCollection(self.endpoints, updatedEndpoint);
            }, function (error) {
                self.endpointEditErrors = error.data;
            });

            promise.finally(function () {
                $timeout(function () {
                    self.isSaving = false;
                }, 1000);
            });
        };

        var findIndexById = function (endpointsList, endpointId) {
            for (var i = 0, max = endpointsList.length; i < max; i += 1) {
                if (endpointsList[i]._id === endpointId) {
                    return i;
                }
            }
        };

        var updateEndpointInCollection = function (endpointsList, endpoint) {
            var idx = findIndexById(endpointsList, endpoint._id);

            if (idx >= 0) {
                endpointsList.splice(idx, 1, endpoint);
            }
        };

        self.makeDraft = function (endpoint) {
            var draft = cloneEndpoint(endpoint.plain());
            self.endpointEdit = draft;
        };

        self.openEditPanel = function () {
            self.isPanelOpen = true;
        };

        self.closePanel = function () {
            self.isPanelOpen = false;
            self.endpointEditErrors = {};
        };

        var cloneEndpoint = function (endpoint) {
            return angular.copy(endpoint);
        };

        self.endpointEdit = {
            'endpoint': '/api/v1/',
            'methods': ['GET'],
            'response': '{}',
            'queryParams': []
        };

        self.endpointEditErrors = {};
    }
})();
