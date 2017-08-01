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
                .findPagesForWebsite(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
            pageService
                .findPageById(model.pageId)
                .then(function (response) {
                    var page = Object.assign({}, response.data);
                    model.page = page;
                });
        }

        init();

        function deletePage() {
            pageService.deletePage(model.pageId)
                .then(function (response) {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                });
        }

        function updatePage(page) {
            pageService.updatePage(model.pageId, page)
                .then(function (response) {
                    page = response.data;
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                });
        }
    }
})();