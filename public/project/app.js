/**
 * Created by yeshajoshi on 8/4/2017.
 */
(function () {
    angular
        .module("yelpFusionApp", ["ngRoute"])
        .config(configuration)
        .controller("searchController", searchController)
        .controller("detailsController", detailsController)
        .service("foodService", foodService);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/details/:imdbID", {
                templateUrl: "details.html",
                controller: "detailsController",
                controllerAs: "model"
            })
    }

    function detailsController($routeParams, foodService) {
        var model = this;

        var imdbID = $routeParams.imdbID;

        function init() {
            foodService
                .searchMovieByImdbId(imdbID)
                .then(renderMovie);
        }
        init();

        function renderMovie(movie) {
            model.movie = movie;
        }
    }

    function searchController(foodService) {
        var model = this;

        model.searchFoodSpotByCity = searchFoodSpotByCity;
        model.searchFoodSpotByLocation = searchFoodSpotByLocation;
        model.geoFindMe = geoFindMe;
        function init() {
            console.log("ko");
        }
        init();

        function searchFoodSpotByCity(city) {
            foodService
                .searchFoodSpotByCity(city)
                .then(renderFoodSpots);
        }

        function searchFoodSpotByLocation() {
            foodService
                .searchFoodSpotByLocation()
                .then(renderFoodSpots);
        }

        function renderFoodSpots(response) {
            model.movies = response.data;
        }

        function geoFindMe() {
            var output = document.getElementById("out");
            console.log("lkuh");
            if (!navigator.geolocation){
                console.log("ink")
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

    function foodService($http) {
        this.searchFoodSpotByCity = searchFoodSpotByCity;
        this.searchFoodSpotByLocation = searchFoodSpotByLocation;
        this.searchMovieByImdbId = searchMovieByImdbId;

        function searchMovieByImdbId(imdbID) {
            var url = "http://www.omdbapi.com/?s="+movieTitle+"&apikey=852159f0";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function searchFoodSpotByLocation(lat,lng) {
            console.log("ehhh");
            return $http.get('https://api.yelp.com/v3/businesses/search?term=food&latitude='+lat+'&longitude='+lng, {
                headers: {'Content-Type':'application/x-www-form-urlencoded','Authorization': 'Bearer ZTE-0HHqsbQLo0zbqEAOvDuFKplK6l1N1zTw7T3_w-Hzja7x1VdenPu1-lA1P82VDjogZeywIoLN_WdOxFxJdt3Isl14v1Re73YOWiNOrB2H_4b5Ozg-LBwi3--DWXYx'}
            });
        }

        function searchFoodSpotByCity(city) {
        console.log("is");
            return $http.get('https://api.yelp.com/v3/businesses/search?term=food&location='+city, {
                headers: {'Content-Type':'application/x-www-form-urlencoded','Authorization': 'Bearer ZTE-0HHqsbQLo0zbqEAOvDuFKplK6l1N1zTw7T3_w-Hzja7x1VdenPu1-lA1P82VDjogZeywIoLN_WdOxFxJdt3Isl14v1Re73YOWiNOrB2H_4b5Ozg-LBwi3--DWXYx'}
            });
        }
    }
})();