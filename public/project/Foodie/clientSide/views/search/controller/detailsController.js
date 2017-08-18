/**
 * Created by yeshajoshi on 8/12/2017.
 */
/**
 * Created by yeshajoshi on 8/4/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("detailsController", detailsController);


    function detailsController($routeParams,userService, foodService, eatSpotService,sessionUser) {
        var model = this;
        var eId = $routeParams["eId"];
        var userId = sessionUser._id;

        model.favouriteeatSpot = favouriteeatSpot;

        function init() {
            model.userId = userId;
            foodService
                .searchEatSpotById(eId)
                .then(function (response) {
                    model.eatSpot = response.data;
                    console.log(model.eatSpot);
                });
        }

        init();

        function favouriteeatSpot(eatSpot) {
            //eatSpot = model.eatSpot;
            var eatSpotId = eatSpot.id;
            var tempEatSpot = {};
            console.log(eatSpot.id + " is in the controllwe");
            eatSpotService.findeatSpotById(eatSpot._id)
             .then(function (response) {
                 console.log(eatSpot.name + "is found");
             },function (response) {
                 console.log("Nahiiiiis found");
             })();
             console.log("kuch bhi");
            console.log("eatspot ka id"+eatSpot);
             userService
             .favourtieeatSpot(userId, eatSpot)
             .then(function (response) {
             console.log(eatSpot.name + "is favourited");
             $location.url("/user/" + userId);
             }
             , function (error) {
             console.log("eatSpot is not found");
             eatSpotService.createeatSpot(userId, eatSpot)
             .then(function (response) {
             console.log("eatSpot is created");
             var _eatSpot = response;
             if (!_eatSpot) {
             model.errorMessage = "some error encountered";
             }
             else {
             foodService
             .favourtieeatSpot(userId, eatSpotId)
             .then(function (response) {
             console.log(eatSpot.name + "is favourited");
             $location.url("/profile");
             });
             }
             });
             }
             );

        }
    }
})();