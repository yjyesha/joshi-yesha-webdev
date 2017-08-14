/**
 * Created by yeshajoshi on 7/24/2017.
 */
(function () {
    //iife
    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams,$location,pageService) {
        var model = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];

        model.createPage = createPage;

        function init() {
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId=pageId;
            pageService
                .findPagesForWebsite(websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }
        init();

        function createPage(page) {
            pageService.createPage(websiteId, page)
                .then(function (response) {
                    var _page = response;
                    if (_page) {
                        model.successMessage = "Page created!";
                    }
                    $location.url("/user/" + userId + "/eatSpot/" + websiteId + "/page");
                });
        }
    }
})();
