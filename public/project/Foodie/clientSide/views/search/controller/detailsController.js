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

        var imdbID = $routeParams.imdbID;

        function init() {
            foodService
                .searchEatSpotById(eId)
                .then(renderEatery);
        }
        init();

        function renderEatery(response) {
            model.eatSpot = response.data;
        }
    }
})();