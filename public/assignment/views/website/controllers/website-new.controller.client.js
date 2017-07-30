/**
 * Created by yeshajoshi on 7/24/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams,$location,websiteService) {
        var model = this;
        model.userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        model.createWebsite=createWebsite;

        function init()
        {
            websiteService
                .findWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
            //var website = websiteService.findWebsiteById(websiteId);
            //model.website = website;
        }
        init();

        function createWebsite(website)
        {
            websiteService.createWebsite(model.userId,website)
                .then(function()
                {
                    $location.url("/user/" + model.userId + "/website");
                });
        }
    }
})();