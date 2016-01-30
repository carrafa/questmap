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
        $scope.getMarkerData($scope.quests);
      })
    };

    $scope.getMarkerData = function() {
      var markerArray = [];
      questsApi.getAll().then(function(response) {
        quests = response.data.quests
        quests.forEach(function(quest) {

          newMarker = {
            lat: parseInt(quest.lat),
            lng: parseInt(quest.lon)
          };
          markerArray.push(newMarker);
        });
        initMap($scope.initMapOptions, markerArray);
      })
    }

    $scope.createQuest = function() {
      addMarker();
      questsApi.createQuest($scope.newQuest).then(function(response) {
        $scope.quests = response.data.quests;
        $scope.newQuest = {};
        $scope.updateQuests();
      });
    };

    function addMarker(latLng, map) {
      var marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: latLng
      });
      marker.setMap(map);
      marker.addListener('click', toggleBounce);
    };

    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    };


    $scope.updateQuests();

    $(function() {
      // initMap(initMapOptions);
    })

    var initMapOptions = {
      center: {
        lat: 40.712784,
        lng: -74.005941
      },
      scrollwheel: false,
      zoom: 8
    }

    var map;

    function initMap(mapOptions, markerArray) {
      var map = new google.maps.Map(document.getElementById('map'),
        initMapOptions);

      console.log('markerArray in initMap', markerArray);

      for (i = 0; i < markerArray.length; i++) {
        addMarker(markerArray[i], map);
      }

      map.addListener('mousedown', function(e) {
        addMarker(e.latLng)
        $scope.newQuest.lat = e.latLng.lat();
        $scope.newQuest.lon = e.latLng.lng();
      });

    }



  }]);
