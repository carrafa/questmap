angular.module('mainController', [])
  .controller('main', ['$scope', 'questsApi', function($scope, questsApi) {

    $scope.lat = '';
    $scope.lon = '';
    $scope.name = '';
    $scope.quest = '';

    $scope.quests = {};

    $scope.newQuest = {};

    $scope.updateQuests = function() {
      questsApi.getAll().then(function(response) {
        $scope.quests = response.data.quests;
      })
    }

    $scope.latLng = function() {
      return new google.maps.LatLng($scope.lat, $scope.lon);
      console.log($scope.lat)
    };

    $scope.createQuest = function() {
      addMarker();
      questsApi.createQuest($scope.newQuest).then(function(response) {
        $scope.quests = response.data.quests;
        $scope.newQuest = {};
        $scope.updateQuests();
      })
    };

    function addMarker() {
      var pos = $scope.latLng()
      var mapOptions = {
        zoom: 9,
        center: pos
      }

      console.log('clicked');

      var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

      var marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: pos,
        title: $scope.note
      });

      marker.addListener('click', toggleBounce);
      marker.setMap(map);

      function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
    }

    $scope.updateQuests();



  }]);
