(function() {
  'use strict';

  angular.module('gimmeJSONApp').controller('ResourceController', ResourceController);
  ResourceController.$inject = ['resourceAPIService'];

  function ResourceController(resourceAPIService) {
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
        resourceAPIService.put(resource._id.$oid, resource);
      }

      self.edit = function(resource) {
      }

      self.openPanel = function() {
          self.isPanelOpen = true;
      }

      self.closePanel = function() {
        self.isPanelOpen = false;
      }

      self.resourceEdit = {
        'endpoint': '/api/v1/',
        'methods': ['GET'],
        'response': '{}',
        'queryParams': []
      }
  }
})();
