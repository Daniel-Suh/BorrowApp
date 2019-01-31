// MODULE
var angularApp = angular.module('angularApp', ['ngParse']);

angularApp.config(['ParseProvider', function(ParseProvider) {
    var MY_PARSE_APP_ID = 'Ij4XrXhKGUbcR0Iir0OqXczyXGTlQz6ahMCOwSZj';
    var MY_PARSE_JS_KEY = 'az2K7ObJFnc64jG6Cwd9YIvlGaxDFKbzoTVBU4wt';
    ParseProvider.initialize(MY_PARSE_APP_ID, MY_PARSE_JS_KEY);
    ParseProvider.serverURL = 'https://parseapi.back4app.com';
  }]);

// CONTROLLERS
// TODO : 
// 1. Get All Categories method
// 2. Pair Program with Sarah to figure out routing
// 

angularApp.controller('mainController', ['$scope', '$http', 'CategoryModel', 'ItemsModel', function ($scope, $http, CategoryModel, ItemsModel) {
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