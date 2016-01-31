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

    questsInterface.updateQuest = function(id, swords, callback) {
      var payload = {
        swords: swords
      };
      return $http.put(baseUrl + "/" + id, payload)
    }

    return questsInterface;

  }])
