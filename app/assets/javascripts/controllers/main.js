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
    };

    $scope.updateQuests();

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

      var customMapType = new google.maps.StyledMapType([{
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [{
          "color": "#ecdcc3"
        }]
      }, {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{
          "gamma": 0.01
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "saturation": -31
        }, {
          "lightness": -33
        }, {
          "weight": 2
        }, {
          "gamma": 0.8
        }]
      }, {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "administrative.country",
        "elementType": "all",
        "stylers": [{
          "visibility": "simplified"
        }, {
          "color": "#776340"
        }, {
          "invert_lightness": true
        }]
      }, {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [{
          "visibility": "simplified"
        }, {
          "color": "#776340"
        }]
      }, {
        "featureType": "administrative.province",
        "elementType": "geometry.fill",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "administrative.neighborhood",
        "elementType": "geometry.fill",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
          "lightness": 30
        }, {
          "saturation": 30
        }]
      }, {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "landscape.natural",
        "elementType": "all",
        "stylers": [{
          "visibility": "simplified"
        }]
      }, {
        "featureType": "landscape.natural",
        "elementType": "labels",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "landscape.natural.terrain",
        "elementType": "all",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#e5d8c3"
        }, {
          "lightness": "-6"
        }]
      }, {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "saturation": 20
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
          "lightness": 20
        }, {
          "saturation": -20
        }]
      }, {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{
          "weight": "1"
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "lightness": 10
        }, {
          "saturation": -30
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#8f8470"
        }, {
          "lightness": "0"
        }, {
          "weight": "1"
        }, {
          "invert_lightness": true
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{
          "saturation": 25
        }, {
          "lightness": 25
        }, {
          "visibility": "off"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
          "weight": "0.5"
        }, {
          "invert_lightness": true
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [{
          "weight": "2"
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "transit.line",
        "elementType": "all",
        "stylers": [{
          "visibility": "on"
        }, {
          "invert_lightness": true
        }, {
          "lightness": "37"
        }]
      }, {
        "featureType": "transit.station.airport",
        "elementType": "all",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "transit.station.bus",
        "elementType": "all",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "transit.station.rail",
        "elementType": "all",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "transit.station.rail",
        "elementType": "geometry.fill",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#b0b0b0"
        }]
      }, {
        "featureType": "transit.station.rail",
        "elementType": "geometry.stroke",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "transit.station.rail",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{
          "lightness": -20
        }, {
          "visibility": "simplified"
        }]
      }, {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
          "visibility": "on"
        }, {
          "lightness": "28"
        }]
      }, {
        "featureType": "water",
        "elementType": "geometry.stroke",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "water",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      }], {
        name: 'Custom Style'
      });
      var customMapTypeId = 'custom_style';

      initMapOptions.mapTypeControlOptions = {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
      };



      var map = new google.maps.Map(document.getElementById('map'),
        initMapOptions);

      map.mapTypes.set(customMapTypeId, customMapType);
      map.setMapTypeId(customMapTypeId);

      for (i = 0; i < markerArray.length; i++) {
        addMarker(markerArray[i], map);
      }

      map.addListener('click', function(e) {
        latLng = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        }
        addMarker(latLng, map)
        $scope.newQuest.lat = e.latLng.lat();
        $scope.newQuest.lon = e.latLng.lng();
      });

    }



  }]);
