/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("userListController", userListController);

    function userListController($routeParams, userService, $location, sessionUser) {
        var model = this;
        var userId = sessionUser._id;
        model.addFollower = addFollower;
        model.removeFollower = removeFollower;
        //  var websiteId = $routeParams["wid"];

        function init() {
            //       model.websiteId = websiteId;
            model.userId = userId;
            model.user = sessionUser;
            userService.getAllUsers()
                .then(function (response) {
                    var users = response;
                    console.log(users);
                    var index = -1;
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].role === "Admin") {
                            index = i;
                            break;
                        }
                    }
                    users.splice(index,1);
                    for (var i = 0; i < users.length; i++) {
                        if (users[i]._id === userId) {
                            index = i;
                            break;
                        }
                    }
                    users.splice(index,1);
                    console.log(users);
                    console.log(sessionUser.follows);
                    console.log("joi le");
                    for (var i = 0; i < users.length; i++) {
                        for (var j = 0; j < sessionUser.follows.length; j++) {
                            if (users[j]._id === sessionUser.follows[j]._id) {
                                index = i;
                                users.splice(index, 1);
                            }
                        }
                    }
                     console.log(users);
                    //users.diff(sessionUser.follows);
                    model.users = users;
                });
        }

        init();
        function addFollower(follower) {
            console.log(follower);
            userService.addFollower(model.userId, follower)
                .then(function (response) {
                    if (!response) {
                        model.error = "Error updating profile";
                    }
                    else {
                        model.successMessage = "followed updated!";
                        $location.url("/profile");
                    }
                });
        }

        function removeFollower(follower) {
            console.log(follower);
            userService.removeFollower(model.userId, follower)
                .then(function (response) {
                    if (!response) {
                        model.error = "Error removing follow";
                    }
                    else {
                        model.successMessage = "follow removed!";
                        $location.url("/profile");
                    }
                });
        }
    }

})();