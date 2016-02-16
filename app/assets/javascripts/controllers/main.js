angular.module('mainController', [])
  .controller('main', ['$scope', 'questsApi', function($scope, questsApi) {

    $scope.lat = '';
    $scope.lon = '';
    $scope.name = '';
    $scope.quest = '';

    $scope.quests = {};

    $scope.newQuest = {
      swords: 0
    };

    $scope.newQuest.fav_color = "#f0f0f0";

    $scope.updateQuests = function() {
      questsApi.getAll().then(function(response) {
        response.data.quests.sort(function(a, b) {
          return b.swords - a.swords;
        });
        $scope.quests = response.data.quests;
        $scope.getMarkerData($scope.quests);
      });
    };

    $scope.updateQuest = function(id, swords) {
      if (isNaN(swords)) {
        swords = 0;
      }
      swords = swords + 1;
      angular.element(this)[0].quest.swords = swords
      questsApi.updateQuest(id, swords).then(function() {});
    };

    $scope.getMarkerData = function() {
      var markerArray = [];
      questsApi.getAll().then(function(response) {
        quests = response.data.quests
        quests.forEach(function(quest) {

          newMarker = {
            lat: Number(quest.lat),
            lng: Number(quest.lon),
            quest: quest.quest,
            name: quest.name,
            color: quest.fav_color
          };
          markerArray.push(newMarker);
        });
        initMap($scope.initMapOptions, markerArray);
      })
    }

    $scope.createQuest = function() {
      $scope.newQuest.fav_color = $scope.newQuest.fav_color.toString();
      console.log("COLOR: ", $scope.newQuest.fav_color)
      questsApi.createQuest($scope.newQuest).then(function(response) {
        $scope.quests = response.data.quests;
        $scope.newQuest = {};
        $scope.updateQuests();
      });
    };


    function addMarker(markerData, map) {
      latLng = {
        lat: markerData.lat,
        lng: markerData.lng
      }

      var contentString =
        "<div class='marker'><div class='marker-name'>" +
        markerData.name +
        "</div><div class='marker-quest'>" + markerData.quest +
        "</div></div>";

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      sword.fillColor = markerData.color;
      sword.strokeColor = markerData.color;
      console.log(sword);

      var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: latLng,
        icon: sword,
        title: name
      });

      marker.setMap(map);
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    };

    $scope.updateQuests();

    var initMapOptions = {
      center: {
        lat: 40.732784,
        lng: -73.975941
      },
      scrollwheel: false,
      zoom: 13
    };

    var map;
    var sword = {
      path: "M15.862,18.586 L16.802,1.694 L16.803,1.665 C16.803,0.747 16.056,0 15.138,0 L8.862,0 C7.944,0 7.197,0.747 7.197,1.665 L8.138,18.586 L0.401,18.586 L0.401,21.332 L2.724,21.332 L2.724,23.447 L6.759,23.447 L6.169,79.921 L6.176,79.921 L6.245,80.2 L11.473,88.805 L11.473,88.83 L11.488,88.83 L12.199,90 L17.762,80.186 L17.872,79.896 L17.83,79.898 L17.323,23.562 C17.323,23.522 17.321,23.486 17.32,23.447 L21.276,23.447 L21.276,21.332 L23.599,21.332 L23.599,18.586 L15.862,18.586 L15.862,18.586 Z M8.862,1.054 L11.779,1.054 L11.938,18.388 L9.182,18.388 L8.251,1.653 C8.257,1.321 8.529,1.054 8.862,1.054 L8.862,1.054 Z M11.473,79.926 L11.473,86.775 L7.224,79.804 L7.813,23.447 L11.474,23.447 L11.474,79.926 L11.473,79.926 Z M12.527,87.286 L12.527,79.927 L12.527,23.447 L16.268,23.447 C16.269,23.486 16.27,23.525 16.27,23.567 L16.776,79.75 L12.527,87.286 L12.527,87.286 Z M20.223,22.394 L3.777,22.394 L3.777,21.755 L20.222,21.755 L20.222,22.394 L20.223,22.394 Z M22.546,20.278 L1.454,20.278 L1.454,19.64 L22.545,19.64 L22.545,20.278 L22.546,20.278 Z",
      fillColor: 'black',
      fillOpacity: 0.8,
      fillRule: 'evenodd',
      strokeWidth: 1,
      scale: 0.6,
      anchor: new google.maps.Point(15, 100),
      strokeColor: 'black',
      strokeWeight: 1
    };

    //need to separate this stuff out.

    function initMap(mapOptions, markerArray) {

      var customMapType = new google
        .maps.StyledMapType([{
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
            "visibility": "off"
          }, {
            "color": "#776340"
          }, {
            "invert_lightness": true
          }]
        }, {
          "featureType": "administrative.province",
          "elementType": "all",
          "stylers": [{
            "visibility": "off"
          }, {
            "color": "#776340"
          }]
        }, {
          "featureType": "administrative.province",
          "elementType": "geometry.fill",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [{
            "visibility": "off"
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
