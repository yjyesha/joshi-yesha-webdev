/**
 * Created by yeshajoshi on 7/24/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams,$location,pageService) {
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        var model = this;
        model.createPage = createPage;

        function init() {
            model.userId = userId;
            model.websiteId = websiteId;
            model.pages = pageService.findPageByWebsiteId(websiteId);
            var page = pageService.findPageById(pageId);
            model.page = page;
        }

        init();

        function createPage(page) {
            var _page = pageService.createPage(websiteId,page);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }
    }
})();
