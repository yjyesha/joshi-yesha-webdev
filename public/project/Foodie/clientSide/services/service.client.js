/**
 * Created by yeshajoshi on 8/12/2017.
 */
/**
 * Created by yeshajoshi on 8/4/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("foodService", foodService);

    function foodService($http) {
        this.searchFoodSpotByCity = searchFoodSpotByCity;
        this.searchFoodSpotByLocation = searchFoodSpotByLocation;
        this.searchEatSpotById = searchEatSpotById;

        function searchEatSpotById(eId) {
            console.log("eha");
            var url = "/api/project/details";
            var body = {
                "requestType": "GET",
                "requestURL": eId
            };
            return $http.post(url, body);
        }


        function searchFoodSpotByLocation(lat, lng) {
            var url = "/api/project/search";
            var body = {
                "requestType": "GET",
                "requestURL": city
            };
            return $http.post(url, body);

            return $http.get('https://api.yelp.com/v3/businesses/search?term=food&latitude=' + lat + '&longitude=' + lng, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ZTE-0HHqsbQLo0zbqEAOvDuFKplK6l1N1zTw7T3_w-Hzja7x1VdenPu1-lA1P82VDjogZeywIoLN_WdOxFxJdt3Isl14v1Re73YOWiNOrB2H_4b5Ozg-LBwi3--DWXYx'
                }
            });
        }

        function searchFoodSpotByCity(city) {
            console.log("eha");
            var url = "/api/project/search";
            var body = {
                "requestType": "GET",
                "requestURL": city
            };
            return $http.post(url, body);


        }
    }
})();