// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require controllers/main
//= require services/questsApi
//= require app
//= require_tree .

console.log('maps?');

// var initMapOptions = {
//   center: {
//     lat: 40.712784,
//     lng: -74.005941
//   },
//   scrollwheel: false,
//   zoom: 8
// }
//
// function initMap(mapOptions) {
//   // Create a map object and specify the DOM element for display.
//   var map = new google.maps.Map(document.getElementById('map'), initMapOptions);
//
//   map.addListener('click', function(e) {
//     console.log('lat ', e.latLng.lat())
//     console.log('lng ', e.latLng.lng())
//   })
//
// }
