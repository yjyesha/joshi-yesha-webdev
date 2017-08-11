
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
            "getAllUsers":getAllUsers
        };
        return api;

        function updateUser(userId, user) {
            var url = "/api/user/"+userId;
            return $http.put(url,user)
                .then(function (res)
                {
                    return res.data;
                });
        }
        function getAllUsers() {
            var url = "/api/users";
            return $http.get(url)
                .then(function (res)
                {
                    return res.data;
                });
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId)
                .then(function (res)
                {
                    return res.data;
                });
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url,user)
                .then(function (res)
                {
                    return res.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&" + "password=" + password;
            return $http.get(url)
                .then(function (res)
                {
                    return res.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url)
                .then(function (res)
                {
                    return res.data;
                });
        }

        function findUserById(userId) {
            return $http.get("/api/user/" + userId)
                .then(function (res)
                {
                    return res.data;
                });
        }
    }
})();