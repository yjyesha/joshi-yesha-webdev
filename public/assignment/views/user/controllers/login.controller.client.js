/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($location, userService) {
        var model =  this;
        model.login = login;
        function init()
        {}
        init();
        function login(user) {
            if(!user)
            {
                model.errorMessage = "User not found";
                return;
            }
            user = userService.findUserByCredentials(user.username, user.password);
            if (user === null) {
                model.errorMessage = "User not found";
            }
            else {
                $location.url("/user/" + user._id);
            }
        }
    }
})();