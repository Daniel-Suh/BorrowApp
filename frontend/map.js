//Map Module
 var app = angular.module('app', ['mapboxgl-directive'])

      .run([function () {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWhjaGFhYWFhIiwiYSI6ImNqbzZkbjYxYjAwOXQza21nZmppZWI0eXgifQ.PKalkGv7fJNbzUp72PeJag';
      }])
//
      .controller('GeolocateControlController', ['$scope', function ($scope) {
        $scope.glControls = {
          geolocate: {
            enabled: true,
            options: {
              position: 'top-left'
            }
          }
        };
      }])
 .controller('NavigationControlController', ['$scope', function ($scope) {
        $scope.glControls = {
          scale: {
            enabled: true,
            options: {
              position: 'top-right'
            }
          }
        };
      }])
  .controller('AttachPopupMarkerController', ['$scope', function ($scope) {
        function createElement (iconSize) {
          var element = document.createElement('div');
          element.style.backgroundImage = 'url(https://placekitten.com/g/' + iconSize.width + '/' + iconSize.height + '/)';
          element.style.width = iconSize.width + 'px';
          element.style.height = iconSize.height + 'px';
          element.style.borderRadius = '50%';

          return element;
        }

        $scope.glMarkers = [
          {
            coordinates: [-86.234192, 41.702358],
            element: createElement({
              width: 50,
              height: 50
            }),
            options: {
              offset: [-25, -25]
            },
            popup: {
              enabled: true,
              message: 'Data goes here',
              options: {
                offset: 25
              }
            }
          }, {
            coordinates: [-86.233, 41.70224],
            element: createElement({
              width: 40,
              height: 40
            }),
            options: {
              offset: [-20, -20]
            },
            popup: {
              enabled: true,
              message: 'Data goes here',
              options: {
                offset: 20
              }
            }
          }
        ]
      
//      $scope.glControls = {
//          geolocate: {
//            enabled: true,
//            options: {
//              position: 'top-left'
//            }
//          }
//        };
    //  }])
      }]);

 
  