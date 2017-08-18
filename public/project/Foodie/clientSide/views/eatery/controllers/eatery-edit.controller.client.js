/**
 * Created by yeshajoshi on 7/24/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams,eatSpotService,$location,sessionUser) {
        var model = this;

        model.updateWebsite=updateWebsite;
        model.deleteWebsite=deleteWebsite;

        var userId = sessionUser.id;
        var eId =  $routeParams["eId"];

        function init() {
            model.userId = userId;
            model.eatSpotId = eid;
            eatSpotService.findeatSpotById(eId)
                .findWebsitesForUser(userId)
                .then(function (response) {
                    model.eatSpotId = response;
                });
        }
        init();

        function updateeatSpot(eatSpot)
        {
            eatSpotService.updateeatSpot(eatSpotId,eatSpot)
                .then (function (response)
                {
                    $location.url("/")
                });

        }

        function deleteeatSpot() {
            websiteService.deleteeatSpot(userId,eid)
                .then(function (response) {
                    $location.url("/user/" +userId + "/eatSpot");
                });
        }
    }
})();