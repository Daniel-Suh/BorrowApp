// MODULE
var angularApp = angular.module('angularApp', ['ngRoute', 'mapboxgl-directive','ngParse']);
angularApp.config(['ParseProvider', function(ParseProvider) {
    var MY_PARSE_APP_ID = 'Ij4XrXhKGUbcR0Iir0OqXczyXGTlQz6ahMCOwSZj';
    var MY_PARSE_JS_KEY = 'az2K7ObJFnc64jG6Cwd9YIvlGaxDFKbzoTVBU4wt';
    ParseProvider.initialize(MY_PARSE_APP_ID, MY_PARSE_JS_KEY);
    ParseProvider.serverURL = 'https://parseapi.back4app.com';
  }]);

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

=======
// TODO : 
// 1. Get All Categories method
// 2. Pair Program with Sarah to figure out routing
// 

angularApp.controller('mainController', ['$scope', '$http','$location', '$log', 'CategoryModel', 'ItemsModel', function ($scope, $http, $location, $log, CategoryModel, ItemsModel) {
    //CategoryModel.data = CategoryModel.New();
    //var category = CategoryModel.New({ name: 'myname' });
    //ItemsModel.New(itemsEx.json);
    var category = CategoryModel.New();
    /*
    CategoryModel.getById('5azbFTutkw').then(function(result){
        console.log('Category Result: ', result);
    });
    ItemsModel.getById('kDc3dH1iuc').then(function(result){
        console.log('Items Result: ', result);
    });
    */
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
/**
 * @ngdoc service
 * @name common.service:AgencyModel
 *
 * @description Model and helper methods for Agency parse object.
 */

angularApp.service('CategoryModel', ['Parse', function(Parse){
    this.Parse = Parse;
    this.data = {};
    this.collection = [];
    this.name = 'Category';
    this.fields = [
        'name',
        'image',
        'quantity'
    ];

    this.New = New;
    this.getById = getById;

    function New(obj) {
        if (angular.isUndefined(obj)) {
            const parseObject = new this.Parse.Object(this.name)
            this.Parse.defineAttributes(parseObject, this.fields);
            return parseObject;
        } else {
            this.Parse.defineAttributes(obj, this.fields);
            return obj;
        }
    }
    function getById(id) {
        return new this.Parse.Query(this.New()).get(id)
            .then(result => {
                this.Parse.defineAttributes(result, this.fields);
                this.data = result;
                return Promise.resolve(result);
            }).catch(error => Promise.reject(error));
    }
    function getAllCategories(){
        return new this.Parse.Query(this.New()).find(agencies => {
            agencies.forEach(agency =>
                this.Parse.defineAttributes(agency, this.fields)
            );
            this.collection = agencies;
            return Promise.resolve(agencies);
        }).catch(error => Promise.reject(error));
    }
    /*getByName(name) {
        console.log('name', name)
        return new this.Parse.Query(this.New())
            .equalTo('name', name)
            .first()
            .then(result => {
                this.Parse.defineAttributes(result, this.fields);
                this.data = result;
                console.log('result', result)
                return result
            })
    }
    getAllAgencies() {
        return new this.Parse.Query(this.New()).find(agencies => {
            agencies.forEach(agency =>
                this.Parse.defineAttributes(agency, this.fields)
            );
            this.collection = agencies;
            return Promise.resolve(agencies);
        }).catch(error => Promise.reject(error));
    }
    */
}]);

angularApp.service('ItemsModel', ['Parse', function(Parse){
    this.Parse = Parse;
    this.data = {};
    this.collection = [];
    this.name = 'Items';
    this.fields = [
        'price',
        'available',
        'name',
        'location',
        'image',
        'lender',
        'category'
    ];

    this.New = New;
    this.getById = getById;

    function New(obj) {
        if (angular.isUndefined(obj)) {
            const parseObject = new this.Parse.Object(this.name)
            this.Parse.defineAttributes(parseObject, this.fields);
            return parseObject;
        } else {
            this.Parse.defineAttributes(obj, this.fields);
            return obj;
        }
    }
    function getById(id) {
        return new this.Parse.Query(this.New()).get(id)
            .then(result => {
                this.Parse.defineAttributes(result, this.fields);
                this.data = result;
                return Promise.resolve(result);
            }).catch(error => Promise.reject(error));
    }
    /*getByName(name) {
        console.log('name', name)
        return new this.Parse.Query(this.New())
            .equalTo('name', name)
            .first()
            .then(result => {
                this.Parse.defineAttributes(result, this.fields);
                this.data = result;
                console.log('result', result)
                return result
            })
    }
    getAllAgencies() {
        return new this.Parse.Query(this.New()).find(agencies => {
            agencies.forEach(agency =>
                this.Parse.defineAttributes(agency, this.fields)
            );
            this.collection = agencies;
            return Promise.resolve(agencies);
        }).catch(error => Promise.reject(error));
    }
    */
}]);
