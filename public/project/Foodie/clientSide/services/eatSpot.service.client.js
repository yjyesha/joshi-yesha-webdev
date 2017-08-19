
/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("eatSpotService", eatSpotService);
    function eatSpotService($http) {

        this.findeatSpotsForUser = findeatSpotsForUser;
        this.createeatSpot = createeatSpot;
        this.findeatSpotById = findeatSpotById;
        this.updateeatSpot = updateeatSpot;
        this.deleteeatSpot = deleteeatSpot;

        function createeatSpot(userId, eatSpot)
        {
            var url = "/api/project/eat/" + userId + "/createEatSpot";
            console.log(userId+"here"+eatSpot.name+"ikdeeeeee");
            return $http.post(url,eatSpot)
                .then(function (response)
                {

                    return response;
                });
        }


        function findeatSpotsForUser(userId) {
            var url = "/api/project/user/" + userId + "/eatSpot";
            return $http.get(url)
                .then(function(response)
                {
                    return response.data;
                });
        }

        function findeatSpotById(eatSpotId)
        {
            var url = "/api/project/eatSpot/"+eatSpotId;
            return $http.get(url)
                .then(function (response)
                {
                    return response.data;
                });
        }

        function updateeatSpot(eatSpotId, eatSpot)
        {
            var url = "/api/project/eatSpot/"+eatSpotId;
            return $http.put(url,eatSpot)
                .then(function (response)
                {
                    return response.data;
                });
        }

        function deleteeatSpot(userId,eatSpotId)
        {
            var url = "/api/project/user/"+userId+"/eatSpot/";
            return $http.delete(url,eatSpotId)
                .then(function (response)
                {
                    console.log("deleted");
                    return response.data;
                });
        }
    }
})();