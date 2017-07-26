/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController)

    function profileController($routeParams,userService,$location) {
        var model = this;
        var userId = $routeParams["uid"];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init()
        {
            model.user = userService.findUserById(userId);
        }
        init();


        function updateUser(user)
        {
            var _user = userService.updateUser(userId, user);
            if(!_user){
                model.error = "Error updating profile";
            }
            else{
                model.successMessage = "Profile updated!";
                $location.url("/user/"+_user._id);
            }
        }

        function deleteUser(userId)
        {
            userService.deleteUser(userId);
            $location.url("/login");
        }
    }
})();