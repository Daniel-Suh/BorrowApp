// MODULE
var angularApp = angular.module('angularApp', ['ngRoute', 'mapboxgl-directive']);

angularApp.config(function ($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'pages/main.html',
            controller: 'mainController'
        })

        .when('/map', {
            templateUrl: 'pages/map.html',
            controller: 'AttachPopupMarkerController'
        })
        .otherwise('/', {
            templateUrl: 'pages/main.html',
            controller: 'mainController'
        })
});
// CONTROLLERS
angularApp.controller('mainController', ['$scope', '$http', '$location', '$log', function ($scope, $http, $location, $log) {

    $scope.appName = 'Borrowing Like a Champion Today';



    $log.info($location.path());

    // Simple GET request example:
    $http({
        method: 'GET',
        url: 'http://localhost:3000/'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log('API response: ', response)
        $scope.items = response.data
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

}]);



//function on() {
//    document.getElementById("overlay").style.display = "block";
//}


angularApp.run([function () {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWhjaGFhYWFhIiwiYSI6ImNqbzZkbjYxYjAwOXQza21nZmppZWI0eXgifQ.PKalkGv7fJNbzUp72PeJag';
}])
//// app.controller('NavigationControlController', ['$scope', function ($scope) {
//        $scope.glControls = {
//          scale: {
//            enabled: true,
//            options: {
//              position: 'top-right'
//            }
//          }
//        };
//      }])
angularApp.controller('AttachPopupMarkerController', ['$scope', function ($scope) {
    $scope.appName = 'Map Page';
    
    function createElement(iconSize) {
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
    $scope.glControls = {
        geolocate: {
            enabled: true,
            options: {
                position: 'top-left'
            }
        }
    }
}]);
