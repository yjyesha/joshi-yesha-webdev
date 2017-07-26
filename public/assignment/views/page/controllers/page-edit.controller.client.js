/**
 * Created by yeshajoshi on 7/24/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams,pageService,$location) {
        var userId =  $routeParams["uid"];
        var websiteId =  $routeParams["wid"];
        var pageId = $routeParams["pid"];
        var model = this;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            model.userId = userId;
            model.websiteId = websiteId;
            model.pages = pageService.findPageByWebsiteId(websiteId);
            var page = pageService.findPageById(pageId);
            model.page = page;
        }
        init();

        function deletePage()
        {
            pageService.deletePage(pageId);
            $location.url("/user/"+userId+"/website/"+websiteId+"/page");

        }

        function updatePage(page)
        {
            var _page = pageService.updatePage(pageId, page);
            $location.url("/user/"+userId+"/website/"+websiteId+"/page");

        }

    }
})();