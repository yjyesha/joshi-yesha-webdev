/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("userListController",userListController);

    function userListController($routeParams,userService) {
        var model = this;
        var userId = $routeParams["uid"];
        //  var websiteId = $routeParams["wid"];

        function init() {
            //       model.websiteId = websiteId;
            model.userId = userId;
            userService
                .getAllUsers()
                .then(function (response) {
                    model.users = response;
                });
        }init();
    }

})();