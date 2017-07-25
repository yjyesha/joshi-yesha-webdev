/**
 * Created by yeshajoshi on 7/24/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController);

    function pageListController($routeParams,pageService) {
        var model = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];

        function init() {
            model.websiteId = websiteId;
            model.userId = userId;
            model.pageId = pageId;
            model.pages = pageService.findPageByWebsiteId(websiteId);
            model.page = pageService.findPageById(pageId);
        }init();
    }
})();