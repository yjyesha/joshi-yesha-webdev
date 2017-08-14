
/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);
    function userService($http) {

        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "deleteUser": deleteUser,
            "updateUser": updateUser,
            "createUser": createUser,
            "getAllUsers":getAllUsers,
            "addFollower":addFollower,
            "favourtieeatSpot":favourtieeatSpot
        };
        return api;

        function updateUser(userId, user) {
            var url = "/api/project/user/"+userId;
            return $http.put(url,user)
                .then(function (res)
                {
                    return res.data;
                });
        }

        function addFollower(userId, fId) {
            var url = "/api/project/follower/"+userId;
            console.log("yeshajjjjjjjjj");
            return $http.put(url,fId)
                .then(function (res)
                {
                    return res.data;
                });
        }

        function favourtieeatSpot(userId, fId) {
            console.log("service ke anda");
            var url = "/api/project/favourite/"+userId;
            console.log("fav in server");
            console.log(fId);
            return $http.put(url,fId)
                .then(function (res)
                {
                    console.log("response toh aaya");
                    return res.data;
                });
        }


        function getAllUsers() {
            var url = "/api/project/users";
            return $http.get(url)
                .then(function (res)
                {
                    return res.data;
                });
        }

        function deleteUser(userId) {
            return $http.delete("/api/project/user/"+userId)
                .then(function (res)
                {
                    return res.data;
                });
        }

        function createUser(user) {
            var url = "/api/project/user";
            return $http.post(url,user)
                .then(function (res)
                {
                    return res.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username=" + username + "&" + "password=" + password;
            return $http.get(url)
                .then(function (res)
                {
                    return res.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/project/user?username=" + username;
            return $http.get(url)
                .then(function (res)
                {
                    return res.data;
                });
        }

        function findUserById(userId) {
            return $http.get("/api/project/user/" + userId)
                .then(function (res)
                {
                    console.log(res.data);
                    return res.data;
                });
        }
    }
})();