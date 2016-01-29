angular.module('questsApiFactory', [])
  .factory('questsApi', ['$http', function($http) {
    var baseUrl = "http://localhost:3000/api/quests";

    var questsInterface = {};

    questsInterface.getAll = function() {
      return $http.get(baseUrl);
    }

    questsInterface.createQuest = function(newQuest, callback) {
      var payload = {
        quest: newQuest
      };
      return $http.post(baseUrl, payload);
    }

    return questsInterface;

  }])
