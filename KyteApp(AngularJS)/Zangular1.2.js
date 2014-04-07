var kyteAppCtrl = angular.module("kyteAppCtrl", ["firebase"]);


kyteAppCtrl.controller("loginCtrl", ["$scope", "$http", "$firebase",
    function ($scope, $http, $firebase) {
        $scope.$scope.baseUrl = "https://stansecure.firebaseio.com/";
        //------------------authorization--------------
        $scope.currentUser = 'Please Login';
        $scope.gotKytes = '';
        var authRef = new Firebase($scope.baseUrl);
        var auth = new FirebaseSimpleLogin(authRef, function (error, user) {
            if (error) {
                console.log(error);
            } else if (user) {
                console.log('UserID' + user.id + 'Provider' + user.provider);
                $scope.kytes = $firebase(new Firebase($scope.baseUrl + user.id + '/'));
                $scope.currentUser = user.id;
            } else {
                console.log("you are logged out");
            }
        });
        $scope.Login = function () {
            auth.login('persona')
        };
        $scope.Logout = function () {
            auth.logout();
            $scope.currentUser = 'Please Login';
        };
        //-------------------------------------------
    }]);

kyteAppCtrl.controller('VeiwKytesCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.kyte = $routeParams.kyte
        $scope.getKytes = function () {
            $http.get($scope.baseUrl + '.json').success(function (data) {
                $scope.gotKytes = [];
                for (users in data) {
                    for (x in data[users]) {
                        $scope.gotKytes.push(data[users][x]);
                        //var holder = data[y][x];
                    }
                }
            }).error(function () { console.log(data) });
        };
        $scope.sendKyte = function (kyte, username) {

            $scope.kytes.$add({ Kyte: kyte, Date: Date(), User: $scope.currentUser });
            $scope.kyte = '';
            $scope.getKytes();
        };
    }]);

//=============================
//trying to get kyte to print on page
//
//link to certan friends to send kytes too
//find users name / make model to enter name
//=========================