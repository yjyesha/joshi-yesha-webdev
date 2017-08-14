/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams,userService,$location,$rootScope) {
        var model = this;
        var userId = $routeParams["uid"];


        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function init() {
            model.userId = userId;
            console.log("idhar tak"+userId);
            userService.findUserById(userId)
                .then(function (response) {
                    console.log("aaaaaaan ajoiapsub");
                    model.user = response;
                });
            userService.getAllUsers()
                .then(function (response) {
                    model.users = response;
                });
        }

        init();


        function updateUser(user) {
            userService.updateUser(user._id, user)
                .then(function (response) {
                    if (!response) {
                        model.error = "Error updating profile";
                    }
                    else {
                        model.successMessage = "Profile updated!";
                        $location.url("/user/" + user._id);
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
                console.log("logout");
                delete $rootScope.currentUser;
                $location.url("/login");
            }

        }
    }
})();