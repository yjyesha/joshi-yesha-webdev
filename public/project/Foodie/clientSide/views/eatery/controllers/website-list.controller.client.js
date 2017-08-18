/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("eatSpotViewController",eatSpotViewController);

    function eatSpotViewController($routeParams,eatSpotService,sessionUser) {
        var model = this;
        var userId = sessionUser_id;
        var eatSpotId = $routeParams["eId"];

        function init() {
            //       model.websiteId = websiteId;
            model.userId = userId;
            eatSpotService.findeatSpotById(eatSpotId)
                .then(function (response) {
                    model.eatSpot = response;
                });
        }init();
    }
})();