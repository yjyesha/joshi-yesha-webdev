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

        model.updateWebsite=updateWebsite;
        model.deleteWebsite=deleteWebsite;

        var userId =  $routeParams["uid"];
        var websiteId =  $routeParams["wid"];

        function init() {
            model.userId = userId;
            model.websiteId = websiteId;
            websiteService
                .findWebsitesForUser(userId)
                .then(function (response) {
                    model.websites = response;
                });
            websiteService
                .findWebsiteById(websiteId)
                .then(function (response) {
                    var website = Object.assign({}, response);
                    model.website = website;
                });
        }
        init();

        function updateWebsite(website)
        {
            websiteService.updateWebsite(websiteId,website)
                .then (function (response)
            {
                $location.url("/user/"+userId+"/website");
            });

        }

        function deleteWebsite() {
            websiteService.deleteWebsite(userId,websiteId)
                .then(function (response) {
                    $location.url("/user/" +userId + "/website");
                });
        }
    }
})();