/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider,$httpProvider) {
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
            .when("/user/:uid",
                {
                    templateUrl: "views/user/templates/profile.view.client.html",
                    controller: "profileController",
                    controllerAs: "model"
                })
            //website routes
            .when("/:uid/users",
                {
                    templateUrl: "views/user/templates/user-list.view.client.html",
                    controller: "userListController",
                    controllerAs: "model"
                })
    }
})();