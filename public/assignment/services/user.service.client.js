
/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);
    function userService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "deleteUser":deleteUser,
            "updateUser":updateUser,
            "createUser":createUser
        };
        return api;

        function updateUser(userId,user)
        {
            for (var u in users) {
                if (users[u]._id === userId) {
                    users[u]=user;
                    return user;
                }
            }
            return user;
        }

        function deleteUser(userId)
        {
            for (var u in users) {
                if (users[u]._id === userId) {
                    users.splice(u,1);
                }
            }
        }

        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);
            return user;
        }

        function findUserByCredentials(username, password) {
            for (var u in users) {
                var _user = users[u];
                if (_user.username === username && _user.password === password) {
                    return _user;
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var u in users) {
                var _user = users[u];
                if (users[u].username === username) {
                    return _user;
                }
            }
            return null;
        }

        function findUserById(userId) {
            for (var u in users) {
                var _user = users[u];
                if (users[u]._id === userId) {
                    return _user;
                }
            }
            return null;
        }

    }
})();