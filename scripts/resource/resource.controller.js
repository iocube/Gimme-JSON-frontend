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
          self.makeDraft(resource);
          self.openEditPanel();
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

        promise.then(function(updatedResource) {
          updateResourceInCollection(self.resources, updatedResource);
        }, function(error) {
          self.resourceEditErrors = error;
        })

        promise.finally(function() {
          $timeout(function() {
            self.isSaving = false;
          }, 1000);
        })
      }

      var findIndexById = function(resourcesList, resourceId) {
        for (var i = 0, max = resourcesList.length; i < max; i += 1) {
          if (resourcesList[i]._id.$oid === resourceId) {
            return i;
          }
        }
      }

      var updateResourceInCollection = function(resourcesList, resource) {
        var idx = findIndexById(resourcesList, resource._id.$oid);

        if (idx >= 0) {
          resourcesList.splice(idx, 1, resource);
        }
      }

      self.makeDraft = function(resource) {
        var draft = cloneResource(resource.plain())
        self.resourceEdit = draft;
      }

      self.openEditPanel = function() {
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
