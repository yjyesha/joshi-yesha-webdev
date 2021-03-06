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
                {templateUrl: "views/user/templates/login.view.client.html",
                    controller: "loginController",
                    controllerAs: "model"})
            .when("/",
                {templateUrl: "views/home/home.view.client.html",
                    controller: "homeController",
                    controllerAs: "model"})
            .when("/default",
                {templateUrl: "views/user/templates/login.view.client.html",
                    controller: "loginController",
                    controllerAs: "model"})
            .when("/register",
                {templateUrl: "views/user/templates/register.view.client.html",
                    controller: "registerController",
                    controllerAs: "model"})
            .when("/user/:uid",
                {templateUrl: "views/user/templates/profile.view.client.html",
                    controller: "profileController",
                    controllerAs: "model"})
            //eatSpot routes
            .when("/user/:uid/eatSpot",
                {templateUrl: "views/website/templates/website-list.view.client.html",
                    controller: "websiteListController",
                    controllerAs: "model"})

            .when("/user/:uid/eatSpot/new",
                {templateUrl: "views/website/templates/website-new.view.client.html",
                    controller: "websiteNewController",
                    controllerAs: "model"
                })
            .when("/user/:uid/eatSpot/:wid",
                {templateUrl: "views/website/templates/website-edit.view.client.html",
                    controller: "websiteEditController",
                    controllerAs: "model"
                })
            .when("/user/:uid/eatSpot/:wid/page",
                {templateUrl: "views/page/templates/page-list.view.client.html",
                    controller: "pageListController",
                    controllerAs: "model"
                })
            .when("/user/:uid/eatSpot/:wid/page/new",
                {templateUrl: "views/page/templates/page-new.view.client.html",
                    controller: "pageNewController",
                    controllerAs: "model"
                })
            .when("/user/:uid/eatSpot/:wid/page/:pid",
                {templateUrl: "views/page/templates/page-edit.view.client.html",
                    controller: "pageEditController",
                    controllerAs: "model"
                })
            .when("/user/:uid/eatSpot/:wid/page/:pid/widget",
                {templateUrl: "views/widget/templates/widget-list.view.client.html",
                    controller: "widgetListController",
                    controllerAs: "model"
                })
            .when("/user/:uid/eatSpot/:wid/page/:pid/widget/new",
                {templateUrl: "views/widget/templates/widget-chooser.view.client.html",
                    controller: "widgetNewController",
                    controllerAs: "model"
                })
            .when("/user/:uid/eatSpot/:wid/page/:pid/widget/:wgid",
                {templateUrl: "views/widget/templates/widget-edit.view.client.html",
                    controller: "widgetEditController",
                    controllerAs: "model"
                })
            .when("/user/:uid/eatSpot/:wid/page/:pid/widget/:wgid/search", {
                                templateUrl: "views/widget/templates/flickr-search.view.client.html",
                            controller: "flickrSearchController",
                            controllerAs: "model"})
    }
})();