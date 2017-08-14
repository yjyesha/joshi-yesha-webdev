/**
 * Created by yeshajoshi on 7/24/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams,pageService,$location) {
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        var model = this;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
            pageService
                .findPagesForWebsite(websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
            pageService
                .findPageById(pageId)
                .then(function (page) {
                    model.page = page;
                });
        }

        init();

        function deletePage() {
            pageService.deletePage(pageId)
                .then(function (response) {
                    $location.url("/user/" + userId + "/eatSpot/" + websiteId + "/page");
                });
        }

        function updatePage(page) {
            pageService.updatePage(pageId, page)
                .then(function (response) {
                    page = response.data;
                    $location.url("/user/" + userId + "/eatSpot/" + websiteId + "/page");
                });
        }
    }
})();