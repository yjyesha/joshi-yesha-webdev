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


    function detailsController($routeParams, foodService) {
        var model = this;
        var eId = $routeParams["eId"];
        function init() {

            foodService
                .searchEatSpotById(eId)
                .then(function (response) {
                    model.eatSpot = response.data;
                    console.log(model.eatSpot);
                })
        }
        init();

    }
})();