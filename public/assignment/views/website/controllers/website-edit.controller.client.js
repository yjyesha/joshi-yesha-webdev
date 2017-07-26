/**
 * Created by yeshajoshi on 7/24/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams,websiteService,$location) {
        var model = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        model.updateWebsite=updateWebsite;
        model.deleteWebsite=deleteWebsite;

        function init()
        {
            model.userId = userId;
            model.websiteId = websiteId;
            model.websites = websiteService.findWebsitesForUser(userId);
            model.website = websiteService.findWebsiteById(websiteId);
        }
        init();

        function updateWebsite(website)
        {
            var _website = websiteService.updateWebsite(model.websiteId,website);
            $location.url("/user/"+userId+"/website");

        }
        function deleteWebsite(website)
        {
            websiteService.deleteWebsite(model.websiteId);
            $location.url("/user/"+userId+"/website");
        }
    }
})();