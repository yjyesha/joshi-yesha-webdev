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
            console.log("kjbljhb");
            userService.findUserByUsername(user.username)
                .then(function (response) {
                    console.log("username he naaaaaaaaa"+response);
                    var _user = response;
                    console.log("response aaya"+response);
                    if(!_user) {
                        console.log("kaji");
                        var userTemp = {username:user.username,password:user.password};
                        return userService.createUser(userTemp);
                    } else {
                        model.error = "User already exists";
                    }
                })
                .then(function (response) {
                    _user = response;
                    $location.url("/login");
                });
        }
    }
})();
