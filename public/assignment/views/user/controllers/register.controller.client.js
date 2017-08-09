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
                    var _user = response;
                    if(!_user) {
                        var userTemp = {username:user.username,password:user.password};
                        return userService.createUser(userTemp)
                    } else {
                        model.error = "User already exists";
                    }
                })
                .then(function (response) {
                    _user = response;
                    $rootScope.currentUser = _user;
                    $location.url("/user/" + _user._id);
                });
        }
    }
})();
