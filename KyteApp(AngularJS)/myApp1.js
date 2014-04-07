var kyteApp = angular.module('kypeApp', ['ngRoute', 'kyteAppCtrl']);

kyteApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when($scope.baseUrl, {

        }).
        otherwise({
            redirectTo: '/kytes'
        })
    }])