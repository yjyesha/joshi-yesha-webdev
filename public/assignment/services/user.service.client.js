
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
            "createUser": createUser
        };
        return api;

        function updateUser(userId, user) {
            var url = "/api/user/"+userId;
            return $http.put(url,user);
        }

        function deleteUser(userId) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    users.splice(u, 1);
                }
            }
        }

        function createUser(user) {
            var url = "/api/user";
                    return $http.post(url,user);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&" + "password=" + password;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function findUserById(userId) {
            return $http.get("/api/user/" + userId);
        }
    }
})();