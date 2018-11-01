// MODULE
var angularApp = angular.module('angularApp', []);

// CONTROLLERS
angularApp.controller('mainController', ['$scope', '$http', function ($scope, $http) {
    
    $scope.appName = 'Borrow';
    
    // Simple GET request example:
    $http({
        method: 'GET',
        url: 'http://localhost:3000/'
        }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
        console.log('API response: ', response)
        $scope.items=response.data
        }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });

}]);
