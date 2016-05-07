(function() {
  'use strict';

  angular.module('gimmeJSONApp').controller('ResourceController', ResourceController);
  ResourceController.$inject = ['resourceAPIService', '$timeout'];

  function ResourceController(resourceAPIService, $timeout) {
      var self = this;

      self.isPanelOpen = false;

      resourceAPIService.get().then(function(resources) {
        self.resources = resources;
      })

      self.create = function() {
        var newResource = {
          'endpoint': '/api/v1/',
          'methods': ['GET'],
          'response': '{}',
          'queryParams': []
        }

        resourceAPIService.post(newResource).then(function(resource) {
          self.resources.push(resource);
          self.openPanel();
        });
      }

      self.remove = function(resourceIndex) {
        var resourceId = self.resources[resourceIndex]['_id']['$oid'];
        resourceAPIService.remove(resourceId).then(function() {
          self.resources.splice(resourceIndex, 1);
        });
      }

      self.save = function(resource) {
        self.isSaving = true;
        var promise = resourceAPIService.put(resource._id.$oid, resource);

        promise.then(null, function(error) {
          self.resourceEditErrors = error;
        })

        promise.finally(function() {
          $timeout(function() {
            self.isSaving = false;
          }, 1000);
        })
      }

      self.edit = function(resource) {
        var draft = cloneResource(resource.plain())
        self.resourceEdit = draft;
      }

      self.openPanel = function() {
          self.isPanelOpen = true;
      }

      self.closePanel = function() {
        self.isPanelOpen = false;
      }

      var cloneResource = function(resource) {
        return angular.copy(resource);
      }

      self.resourceEdit = {
        'endpoint': '/api/v1/',
        'methods': ['GET'],
        'response': '{}',
        'queryParams': []
      };

      self.resourceEditErrors = {};
  }
})();
