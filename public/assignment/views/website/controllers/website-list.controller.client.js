/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("websiteListController",websiteListController);

    function websiteListController($routeParams,websiteService) {
        var model = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];

        function init() {
            model.websiteId = websiteId;
            model.userId = userId;
            model.websites = websiteService.findWebsitesForUser(userId);
            model.website = websiteService.findWebsiteById(websiteId);
        }init();
    }
})();