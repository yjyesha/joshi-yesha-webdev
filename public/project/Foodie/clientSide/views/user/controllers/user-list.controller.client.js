/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("userListController",userListController);

    function userListController($routeParams,userService,$location) {
        var model = this;
        var userId = $routeParams["uid"];
        model.addFollower = addFollower;
        //  var websiteId = $routeParams["wid"];

        function init() {
            //       model.websiteId = websiteId;
            model.userId = userId;
            userService
                .getAllUsers()
                .then(function (response) {
                    var users = response;
                    console.log(users);
                    var index = users.indexOf(userId);
                    console.log(index+1);
                    users.splice(index+1, 1);
                    model.users = users;
                });
        }init();
    function addFollower(follower) {
            console.log(follower);
            userService.addFollower(model.userId, follower)
                .then(function (response) {
                    if (!response) {
                        model.error = "Error updating profile";
                    }
                    else {
                        model.successMessage = "followed updated!";
                        $location.url("/user/" + userId);
                    }
                });
        }
    }

})();