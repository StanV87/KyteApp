var kyteApp = angular.module("kyteApp", ["firebase"]);


kyteApp.controller("Ctrl1", ["$scope", "$http", "$firebase",
    function ($scope, $http, $firebase) {
        var baseUrl = "https://stansecure.firebaseio.com/";
        $scope.gotKytes;
        $scope.friends;
        $scope.currentUser = 'Please Login';
        document.getElementById('logout').style.visibility = 'hidden';
        $scope.key =[];
        //------------------authorization--------------

        var authRef = new Firebase(baseUrl);
        var auth = new FirebaseSimpleLogin(authRef, function (error, user) {
            if (error) {
                console.log(error);
            } else if (user) {
                console.log('UserID' + user.id + 'Provider' + user.provider);
                $scope.kytes = $firebase(new Firebase(baseUrl + user.id + '/tweets'));
                $scope.friends = $firebase(new Firebase(baseUrl + user.id + '/friends'));
                $scope.profile = $firebase(new Firebase(baseUrl + user.id + '/profile'));
                $scope.currentUser = user.id;
            } else {
                console.log("you are logged out");
            }
        });

        $scope.Login = function () {
            auth.login('persona');
            if (auth.login) {
                $('#nameModal').modal();
                document.getElementById('login').style.visibility = 'hidden';
                document.getElementById('logout').style.visibility = 'visible';
            } else {
                document.getElementById('login').style.visibility = 'visible';
                document.getElementById('logout').style.visibility = 'hidden';
            }
        };

        $scope.Logout = function () {
            auth.logout();
            $scope.currentUser = 'Please Login';
            document.getElementById('login').style.visibility = 'visible';
        };
        //-------------------------------------------

        $scope.getKytes = function () {
            $http.get(baseUrl + $scope.currentUser + '/.json').success(function (data) {
                $scope.gotKytes = [];
                for (tweets in data) {
                    for (x in data[tweets]) {
                        $scope.key.push(x)
                        data[tweets][x].id = x;
                        $scope.gotKytes.push(data[tweets][x]);

                        //var holder = data[y][x];
                    }
                }
            }).error(function () { console.log(data) });
        };

        $scope.saveName = function (userName) {
            $scope.name = userName;
            $('#nameModal').modal('hide');
        }

        $scope.sendKyte = function (kyte) {
            if ($scope.currentUser == "Please Login") {
                alert("Please sign in before sending a Kype.")
            } else {
                $scope.kytes.$add({ Kyte: kyte, Date: Date(), User: $scope.currentUser, Name: $scope.name });
                $scope.kyte = '';
                $scope.getKytes();
                $scope.getFriends();
            }
        };

        $scope.getFriends = function () {
            $http.get(baseUrl + '/.json').success(function (data) {
                $scope.friends = [];
                for (friends in data) {
                    alert(data)
                    $scope.friends.push(data[friends])
                }
                }).error(function (){console.log(data); });

        };

        //$scope.printFriends = function (data) {
        //    $scope.friends = [];
        //    alert(data);
        //    for (person in data) {
                
        //        $scope.friends.push(data[person]);

        //    }
        //};
        $scope.deleteKyte = function (key) {
            $scope.kytes.$remove(key);

            //$http.delete(baseUrl + $scope.currentUser + "/tweets/" + key + ".json").success(function () { }).error(function (data) { console.log(user.id)});

            //this.AjaxCall = function () {
            //    var call = new XMLHttpRequest();
            //    call.open("Delete", baseUrl + $scope.currentUser + "/tweets/" + key + ".json", true);
            //    call.onload = function () {
            //        if (this.status >= 200 && this.status < 400) {
            //            JSON.parse(this.response);
            //        } else {
            //            alert(this.response);
            //        };
            //    };
            //    call.onerror = function () { alert("error"); }
            //}

            $scope.getKytes();
            }


    }]);
//=============================
//trying to get kyte to print on page
//
//link to certan friends to send kytes too
//find users name / make model to enter name
//=========================