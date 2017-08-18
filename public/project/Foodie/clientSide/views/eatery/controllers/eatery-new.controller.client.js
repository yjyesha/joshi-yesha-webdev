/**
 * Created by yeshajoshi on 7/24/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("eatSpotNewController", eatSpotNewController);

    function eatSpotNewController($routeParams,$location,eatSpotService,sessionUser) {
        var model = this;
        var userId = sessionUser._id;
        var eatSpotId = $routeParams.wid;

        model.createeatSpot=createeatSpot;

        function init()
        {
            model.userId = userId;
            model.eatSpotId = eatSpotId;
        }
        init();

        function createeatSpot(eatSpot)
        {
            console.log("controller me");
            eatSpotService.createeatSpot(userId,eatSpot)
                .then(function(response)
                {
                    var _eatSpot = response;
                    if(!_eatSpot)
                    {
                        model.errorMessage = "some error encountered";
                    }
                    console.log("xasctviwuhcqbcqwnubow");
                    $location.url(_eatSpot.id+"/eatSpot/edit");
                });
        }
    }
})();