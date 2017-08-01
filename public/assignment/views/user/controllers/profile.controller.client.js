/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController)

    function profileController($routeParams,userService,$location,$rootScope) {
        var model = this;
        var userId = $routeParams["uid"];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function init() {
            userService.findUserById(userId)
            .then(function (response) {
                model.user = response.data;
            });
        }

        init();


        function updateUser(user) {
            userService.updateUser(userId, user)
            .then(function (response) {
                var _user = response.data;
                if (!_user) {
                    model.error = "Error updating profile";
                }
                else {
                    model.successMessage = "Profile updated!";
                    $location.url("/user/" + _user._id);
                }
            });
        }

        function deleteUser(userId) {
            userService.deleteUser(userId)
                .then(function (response) {
                    $location.url("/login");
                });
        }

        function logout() {
            if ($rootScope.currentUser) {
                delete $rootScope.currentUser;
                $location.url("/login");
            }

        }
    }
})();