angular.module('questmap', [])
  .controller('main', ['$scope', function($scope) {

    $scope.lat = '';
    $scope.lon = '';
    $scope.name = '';
    $scope.quest = '';

    $scope.quests = {};

    $scope.latLon = function() {
      return new google.maps.LatLng($scope.lat, $scope.lon);
      console.log($scope.lat)
    };

    $scope.markIt = function() {
      var pos = $scope.latLon()
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
    };



  }]);
