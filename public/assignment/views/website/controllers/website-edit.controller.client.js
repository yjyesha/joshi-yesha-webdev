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
        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;
        model.updateWebsite=updateWebsite;
        model.deleteWebsite=deleteWebsite;

        function init()
        {
            websiteService
                .findWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
            websiteService
                .findWebsiteById(model.websiteId)
                .then(function (response) {
                    var website = Object.assign({}, response.data);
                    model.website = website;
                });
        }
        init();

        function updateWebsite(website)
        {
            var _website = websiteService.updateWebsite(model.websiteId,website);
            $location.url("/user/"+model.userId+"/website");
        }

        function deleteWebsite(website)
        {
            websiteService.deleteWebsite(model.websiteId);
            $location.url("/user/"+model.userId+"/website");
        }
    }
})();