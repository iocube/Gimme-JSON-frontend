(function () {
    'use strict';

    angular.module('gimmeJSONApp').controller('MainController', MainController);
    MainController.$inject = ['endpointAPIService', 'NotificationService', 'serverAPIService', '$interval', 'pollingService'];

    function MainController(endpointAPIService, NotificationService, serverAPIService, $interval, pollingService) {
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

            var promise = endpointAPIService.post(newEndpoint);
            promise.then(function (endpoint) {
                self.endpoints.push(endpoint);
                self.makeDraft(endpoint);
                self.openEditPanel();
            });

            promise.catch(function(error) {
                NotificationService.push({
                    type: NotificationService.types.ERROR,
                    message: error.data
                });
            });
        };

        self.remove = function (endpointId) {
            self.inProgress = true;
            var promise = endpointAPIService.remove(endpointId);

            promise.then(function () {
                var idx = self.endpoints.findIndex(function(endpoint) {
                    return endpoint._id === endpointId;
                });
                self.closePanel();
                self.endpoints.splice(idx, 1);
            });

            promise.finally(function() {
                self.inProgress = false;
            });
        };

        self.save = function (endpoint) {
            self.inProgress = true;
            var promise = endpointAPIService.put(endpoint._id, endpoint);

            promise.then(function (updatedEndpoint) {
                updateEndpointInCollection(self.endpoints, updatedEndpoint);
            }, function (error) {
                self.endpointEditErrors = error.data;
            });

            promise.finally(function () {
                self.inProgress = false;
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
            var draft = angular.copy(endpoint.plain());
            self.endpointEdit = draft;
            self.setAceEditorContent(self.endpointEdit.response);
        };

        self.openEditPanel = function () {
            self.isPanelOpen = true;
        };

        self.closePanel = function () {
            self.isPanelOpen = false;
            self.endpointEditErrors = {};
        };

        self.endpointEdit = {
            'endpoint': '/api/v1/',
            'methods': ['GET'],
            'response': '{}',
            'queryParams': []
        };

        self.endpointEditErrors = {};

        self.restartServer = function() {
            self.inProgress = true;

            var stopIf = function(data) {
                return data.status === 200;
            };

            serverAPIService.restart().then(function() {
                var promise = pollingService.initialize(serverAPIService.status, stopIf, {
                    nextPollIn: 2000,
                    maxTries: 5
                });

                promise.then(function(data) {
                    NotificationService.push({
                        type: NotificationService.types.INFO,
                        message: 'Greetings human, I am the mighty Server and I was able to restart myself successfully.'
                    });
                });

                promise.catch(function(error) {
                    NotificationService.push({
                        type: NotificationService.types.ERROR,
                        message: {'server': 'Hey, server restart failed for some reason, cya.'}
                    });
                });

                promise.finally(function() {
                    self.inProgress = false;
                });
            });
        };

        self.setAceEditorContent = function() {};
    }
})();
