//Map Module
 var app = angular.module('app', ['mapboxgl-directive'])

      .run([function () {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWhjaGFhYWFhIiwiYSI6ImNqbzZkbjYxYjAwOXQza21nZmppZWI0eXgifQ.PKalkGv7fJNbzUp72PeJag';
      }])

      .controller('GeolocateControlController', ['$scope', function ($scope) {
        $scope.glControls = {
          geolocate: {
            enabled: true,
            options: {
              position: 'top-left'
            }
          }
        };
      }]
                         
    
                 )
 
  