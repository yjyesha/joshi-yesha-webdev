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
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        model.createWebsite=createWebsite;
        function init()
        {
            model.userId = userId;
            model.websites = websiteService.findWebsitesForUser(userId);
            var website = websiteService.findWebsiteById(websiteId);
            model.website = website;
        }
        init();

        function createWebsite(website)
        {
            var _website = websiteService.createWebsite(userId,website);
            $location.url("/user/" + userId + "/website");
        }
    }
})();