/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($location, userService, $rootScope) {
        var model = this;

        model.login = login;

        function init() {

        }
        init();

        function login(user) {

            userService.findUserByCredentials(user.username, user.password)
                .then(function (response) {
                    console.log("sdlkjhblasb");
                    var _user = response;
                    if(!_user) {
                        model.errorMessage = "User not found";
                    } else {
                        console.log("hiusdbvoaydb");
                        console.log(response);
                        $rootScope.currentUser = _user;
                        $location.url("/profile");
                    }
                });
        }
    }
})();