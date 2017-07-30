/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(userService,$location,$rootScope) {
        var model = this;

        model.createUser = createUser;

        function init()
        {

        }
        init();

        function createUser(user) {
            userService.findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;
                    if(_user === "0") {
                        return userService.createUser(user)
                    } else {
                        model.error = "User already exists";
                    }
                })
                .then(function (response) {
                    _user = response.data;
                    $location.url("/user/" + _user._id);
                });
        }
    }
})();
