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
    };

    $scope.createQuest = function() {
      addMarker();
      questsApi.createQuest($scope.newQuest).then(function(response) {
        $scope.quests = response.data.quests;
        $scope.newQuest = {};
        $scope.updateQuests();
      })
    };

    function addMarker(latLng) {
      console.log('marker? ', latLng)
      var pos = $scope.latLng()
      var mapOptions = {
        zoom: 9,
        center: pos
      }

      var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);


      map.addListener('click', function(e) {
        addMarker(e.latLng)
        $scope.lat = e.latLng.lat();
        $scope.lon = e.latLng.lng();

      })



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

var initMapOptions = {
  center: {
    lat: 40.712784,
    lng: -74.005941
  },
  scrollwheel: false,
  zoom: 8
}

function initMap(mapOptions) {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'),
    initMapOptions);

  map.addListener('click', function(e) {
    addMarker(e.latLng)
    $scope.lat = e.latLng.lat();
    $scope.lon = e.latLng.lng();

  })

}
