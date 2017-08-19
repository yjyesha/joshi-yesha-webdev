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


    function detailsController($location,$routeParams,userService, foodService, eatSpotService,sessionUser) {
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
                    var tempEat = {
                        _id: model.eatSpot.id,
                        name: model.eatSpot.name,
                        location: model.eatSpot.location,
                        phone: model.eatSpot.phone,
                        rating: model.eatSpot.rating,
                        image_url: model.eatSpot.image_url,
                        price: model.eatSpot.price
                    };
                    console.log(tempEat.price);
                    eatSpotService.createeatSpot(null, tempEat);

                });
        }

        init();

        function favouriteeatSpot(eatSpot) {
            //eatSpot = model.eatSpot;
            // var eatSpotId = eatSpot.id;
            var tempEat = {
                _id: eatSpot.id,
                name: eatSpot.name,
                location: model.eatSpot.location,
                phone: model.eatSpot.phone,
                rating: model.eatSpot.rating,
                image_url: model.eatSpot.image_url,
                price: model.eatSpot.price
            };
                        userService
                            .favourtieeatSpot(userId, tempEat)
                            .then(function (response) {
                                console.log(tempEat.name + "is favourited");
                                $location.url("/profile");
                            });
                    }

                  }
})();