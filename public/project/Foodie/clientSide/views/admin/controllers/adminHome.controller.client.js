/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("adminViewController",adminViewController);

    function adminViewController($location,$routeParams,userService,sessionUser) {
        var model = this;
        var userId = sessionUser._id;
        model.deleteUser=deleteUser;

        function init() {
            //       model.websiteId = websiteId;
            model.userId = userId;
            userService.getAllUsers()
                .then(function (response) {
                    model.users = response;
                });
        }init();

        function deleteUser(userId) {
            console.log(userId);
            userService.deleteUser(userId);
            $location.url("/profile");
        }
    }
})();