/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("adminEditController",adminEditController);

    function adminEditController($location,$routeParams,userService,sessionUser) {
        var model = this;
        var userId = sessionUser._id;
        var toUpdateId= $routeParams.upid;
        model.updateUser=updateUser;
        function init() {
            //       model.websiteId = websiteId;
            //model.userId = toUpdateId;
            console.log(toUpdateId);
            userService.findUserById(toUpdateId)
                .then(function (response) {
                    model.user = response.data;
                    console.log(model.user._id);
                });
        }init();

        function updateUser(user) {
            console.log("into update");
            console.log(user);
            userService.updateUser(user._id, user)
                .then(function (response) {
                    if (!response) {
                        model.error = "Error updating profile";
                    }
                    else {
                        model.successMessage = "Profile updated!";
                        $location.url("/profile");
                    }
                });
        }
    }
})();