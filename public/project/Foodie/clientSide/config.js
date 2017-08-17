/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider, $httpProvider) {
        $httpProvider.defaults.headers.post['Accept'] = 'application/json;charset=utf-8';
        $routeProvider

            .when("/login",
                {
                    templateUrl: "views/user/templates/login.view.client.html",
                    controller: "loginController",
                    controllerAs: "model"
                })
            .when("/",
                {
                    templateUrl: "views/home/home.view.client.html",
                    controller: "homeController",
                    controllerAs: "model"
                })
            .when("/default",
                {
                    templateUrl: "views/user/templates/login.view.client.html",
                    controller: "loginController",
                    controllerAs: "model"
                })
            .when("/register",
                {
                    templateUrl: "views/user/templates/register.view.client.html",
                    controller: "registerController",
                    controllerAs: "model"
                })
            .when("/profile",
                {
                    templateUrl: "views/user/templates/profile.view.client.html",
                    controller: "profileController",
                    controllerAs: "model",
                    resolve:
                        {
                            sessionUser : checkLogin
                        }
                })
            //eatSpot routes
            .when("/users",
                {
                    templateUrl: "views/user/templates/user-list.view.client.html",
                    controller: "userListController",
                    controllerAs: "model",
                    resolve:
                        {
                            sessionUser : checkLogin
                        }
                })
            .when("/search", {
                templateUrl: "views/search/search.html",
                controller: "searchController",
                controllerAs: "model",
                resolve:
                    {
                        sessionUser : checkLogin
                    }
            })
            .when("/details/:eId", {
                templateUrl: "views/search/details.html",
                controller: "detailsController",
                controllerAs: "model",
                resolve:
                    {
                        sessionUser : checkLogin
                    }
            })

            .when("/eatery/edit",
                {
                    templateUrl: "views/eatery/templates/eatery-edit.view.client.html",
                    controller: "eateryListController",
                    controllerAs: "model",
                    resolve:
                        {
                            sessionUser : checkLogin
                        }
                })

            .when("/eatery/new",
                {
                    templateUrl: "views/eatery/templates/eatery-new.view.client.html",
                    controller: "eatSpotNewController",
                    controllerAs: "model",
                    resolve:
                        {
                            sessionUser : checkLogin
                        }
                })

            /*
            .when("/eatery/:wid",
                {
                    templateUrl: "views/eatery/templates/eatery-edit.view.client.html",
                    controller: "eateryEditController",
                    controllerAs: "model"
                })
                */
    }
    function checkLogin(userService,$q,$location)
    {
        var deferred = $q.defer();
        userService
            .checkLogin()
            .then(function (user)
            {
                if(user ==='0')
                {
                    deferred.reject();
                    $location.url("/login");
                }
                else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
})();