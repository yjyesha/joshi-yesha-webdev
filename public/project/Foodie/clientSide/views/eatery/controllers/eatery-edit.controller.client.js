/**
 * Created by yeshajoshi on 7/24/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("eateryEditController", eateryEditController);

    function eateryEditController($routeParams,eatSpotService,$location,sessionUser) {
        var model = this;

        model.updateeatSpot=updateeatSpot;
        model.deleteeatSpot=deleteeatSpot;

        var userId = sessionUser._id;
        var eatSpotId =  $routeParams["eId"];

        function init() {
            model.userId = userId;
            model.eatSpotId = eatSpotId;
            console.log("below eatspotId");
            console.log(eatSpotId);
            eatSpotService.findeatSpotById(eatSpotId)
                .then(function (response) {
                    console.log("responser");
                    console.log(response);
                    model.eatSpot = response;
                });
        }
        init();

        function updateeatSpot(eatSpot)
        {
            eatSpotService.updateeatSpot(eatSpotId,eatSpot)
                .then (function (response)
                {
                    $location.url("/profile")
                });

        }

        function deleteeatSpot(eatSpotId) {
            console.log("into delete eatspot controller");
            eatSpotService.deleteeatSpot(userId,eatSpotId)
                .then(function (response) {
                    $location.url("/profile");
                });
        }
    }
})();