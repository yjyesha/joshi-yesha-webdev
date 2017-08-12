/**
 * Created by yeshajoshi on 8/12/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("searchController", searchController);


    function searchController(foodService) {
        var model = this;
        model.searchFoodSpotByCity = searchFoodSpotByCity;
        model.searchFoodSpotByLocation = searchFoodSpotByLocation;
        model.geoFindMe = geoFindMe;
        function init() {
        }
        init();

        function searchFoodSpotByCity(city) {
            console.log("ehaaaaaaaaaa");
            foodService
                .searchFoodSpotByCity(city)
                .then(renderFoodSpots);
        }

        function searchFoodSpotByLocation(lat,lon) {
            foodService
                .searchFoodSpotByLocation(lat,lon)
                .then(renderFoodSpots);
        }

        function renderFoodSpots(response) {
            model.eatSpots = response.data;
        }

        function geoFindMe() {
            var output = document.getElementById("out");
            if (!navigator.geolocation){
                output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
                return;
            }

            function success(position) {
                var latitude  = position.coords.latitude;
                var longitude = position.coords.longitude;

                output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

                var textnode = document.createTextNode("We found you..");

                output.appendChild(textnode);
                searchFoodSpotByLocation(latitude,longitude);
            }

            function error() {
                output.innerHTML = "Unable to retrieve your location";
            }

            output.innerHTML = "<p>Locating…</p>";

            navigator.geolocation.getCurrentPosition(success, error);
        }
    }
    })();