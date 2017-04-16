(function () {
    'use strict';

    angular.module('gimmeJSONApp').controller('MainController', MainController);
    MainController.$inject = ['endpointAPIService', 'NotificationService', 'serverAPIService', '$interval', 'pollingService'];

    function MainController(endpointAPIService, NotificationService, serverAPIService, $interval, pollingService) {
        var self = this;
        NotificationService.initialize({position: 'top-left'});

        self.isPanelOpen = false;

        endpointAPIService.getList().$promise.then(function (endpoints) {
            self.endpoints = endpoints;
        })
        .catch(function(error) {
            console.error(error);
        });

        self.create = function () {
            var newEndpoint = {
                'route': '/api/v1/',
                'on_get': '',
                'on_post': '',
                'on_patch': '',
                'on_put': '',
                'on_delete': '',
                'storage': []
            };

            endpointAPIService.post(newEndpoint)
                .$promise
                .then(function (endpoint) {
                    self.endpoints.push(endpoint);
                    self.makeDraft(endpoint);
                    self.openEditPanel();
                })
                .catch(function(error) {
                    NotificationService.push({
                        type: NotificationService.types.ERROR,
                        message: error.data
                    });
                });
        };

        self.remove = function (endpointId) {
            self.inProgress = true;
            endpointAPIService.delete({id: endpointId})
                .$promise
                .then(function () {
                    var idx = self.endpoints.findIndex(function(endpoint) {
                        return endpoint._id === endpointId;
                    });
                    self.closePanel();
                    self.endpoints.splice(idx, 1);
                })
                .catch(function(error) {
                    console.error(error);
                })
                .finally(function() {
                    self.inProgress = false;
                });
        };

        self.save = function (endpoint) {
            self.inProgress = true;

            endpointAPIService.put({id: endpoint._id}, endpoint)
                .$promise
                .then(function (updatedEndpoint) {
                    updateEndpointInCollection(self.endpoints, updatedEndpoint);
                })
                .catch(function (error) {
                    self.endpointEditErrors = error.data;
                })
                .finally(function () {
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
            self.endpointEdit = angular.copy(endpoint);

            // TODO: broken.
            // self.setAceEditorContent();
        };

        self.openEditPanel = function () {
            self.isPanelOpen = true;
        };

        self.closePanel = function () {
            self.isPanelOpen = false;
            self.endpointEditErrors = {};
        };

        self.endpointEdit = {
            'route': '/api/v1/',
            'on_get': '',
            'on_post': '',
            'on_patch': '',
            'on_put': '',
            'on_delete': '',
            'response': '{}',
            'queryParams': []
        };

        self.endpointEditErrors = {};

        self.restartServer = function() {
            self.inProgress = true;

            var stopIf = function(data) {
                return data.status === "ok";
            };

            serverAPIService.restart().$promise.then(function() {
                var promise = pollingService.initialize(serverAPIService.status, stopIf, {
                    nextPollIn: 2000,
                    maxTries: 5
                });

                promise.then(function(data) {
                    NotificationService.push({
                        type: NotificationService.types.INFO,
                        message: 'Greetings human, I am the mighty Server and I was able to restart myself successfully.'
                    });
                })
                .catch(function(error) {
                    NotificationService.push({
                        type: NotificationService.types.ERROR,
                        message: {'server': 'Hey, server restart failed for some reason, cya.'}
                    });
                    console.error(error);
                }).
                finally(function() {
                    self.inProgress = false;
                });
            });
        };

        self.setAceEditorContent = function() {};
    }
})();
