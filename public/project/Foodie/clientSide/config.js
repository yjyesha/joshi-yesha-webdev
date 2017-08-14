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
            .when("/user/:uid",
                {
                    templateUrl: "views/user/templates/profile.view.client.html",
                    controller: "profileController",
                    controllerAs: "model"
                })
            //eatSpot routes
            .when("/:uid/users",
                {
                    templateUrl: "views/user/templates/user-list.view.client.html",
                    controller: "userListController",
                    controllerAs: "model"
                })
            .when("/:uid/search", {
                templateUrl: "views/search/search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/:uid/details/:eId", {
                templateUrl: "views/search/details.html",
                controller: "detailsController",
                controllerAs: "model"
            })
            /*
            .when("/user/:uid/eatSpot",
                {
                    templateUrl: "views/website/templates/website-list.view.client.html",
                    controller: "websiteListController",
                    controllerAs: "model"
                })

            .when("/user/:uid/eatSpot/new",
                {
                    templateUrl: "views/website/templates/website-new.view.client.html",
                    controller: "websiteNewController",
                    controllerAs: "model"
                })
            .when("/user/:uid/eatSpot/:wid",
                {
                    templateUrl: "views/website/templates/website-edit.view.client.html",
                    controller: "websiteEditController",
                    controllerAs: "model"
                })
                */
    }
})();