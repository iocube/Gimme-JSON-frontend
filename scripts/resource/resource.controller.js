(function() {
  'use strict';

  angular.module('gimmeJSONApp').controller('ResourceController', ResourceController);
  ResourceController.$inject = ['resourceAPIService'];

  function ResourceController(resourceAPIService) {
      var self = this;

      self.message = "I Am Resource Controller";
      self.resources = [
      {
        "methods": [
          "GET",
          "POST"
        ],
        "_id": {
          "$oid": "571b7cfdeceefb4a395ef433"
        },
        "endpoint": "/api/v1/people",
        "queryParams": [],
        "response": "[{\"name\": \"Alice\", \"city\": \"Berlin\"}, {\"name\": \"Bob\", \"city\": \"Tel-Aviv\"}, {\"name\": \"Charlie\", \"city\": \"Paris\"}]"
      },
      {
        "methods": [
          "GET"
        ],
        "_id": {
          "$oid": "571b7cfdeceefb4a395ef434"
        },
        "endpoint": "/api/v1/people/<string:pid>",
        "queryParams": [],
        "response": "{\"name\": \"Alice\", \"city\": \"Berlin\"}"
      },
      {
        "methods": [
          "POST"
        ],
        "_id": {
          "$oid": "571b7cfdeceefb4a395ef435"
        },
        "endpoint": "/api/v1/people/<string:pid>",
        "queryParams": [],
        "response": "{\"name\": \"Alice\", \"city\": \"Tel-Aviv\"}"
      }
    ]

      self.create = function() {
        // make post request to create new resource
        resourceAPIService.post()

        var resource = {
          '_id': {
            '$oid': String(Date.now())
          },
          'endpoint': '/api/v1/',
          'methods': ['GET'],
          'response': '',
          'queryParams': []
        }

        self.resources.push(resource)
      }

      self.remove = function(resourceId) {
        var resourceIndex = -1;

        for (var i = 0, max = self.resources.length; i < max; i += 1) {
          if (self.resources[i]._id.$oid === resourceId) {
            resourceIndex = i;
            break;
          }
        }

        self.resources.splice(i, 1);
        // TODO: make request to remove the resource
      }

      self.saveEndpoint = function(resourceId, changes) {
        // TODO: make patch request
        console.log('new endpoint: ' + resourceId, 'changes: ' + changes)
      }

      self.saveResponse = function(resourceId, changes) {
        // TODO: make patch request
        console.log('new response: ' + resourceId, 'changes: ' + changes)
      }
  }
})();
