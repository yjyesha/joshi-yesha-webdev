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
        var userId =  $routeParams["uid"];
        var websiteId =  $routeParams["wid"];
        var pageId = $routeParams["pid"];

        function init() {
            model.userId = userId;
            model.websiteId = websiteId;
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
            websiteService.updateWebsite(model.websiteId,website)
                .then (function (response)
            {
                website = response.data;
                $location.url("/user/"+model.userId+"/website");
            });

        }

        function deleteWebsite(website) {
            websiteService.deleteWebsite(model.websiteId)
                .then(function (response) {

                    $location.url("/user/" + model.userId + "/website");
                });
        }
    }
})();