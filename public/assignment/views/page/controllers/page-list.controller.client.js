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
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
            pageService.findPagesForWebsite(websiteId)
                .then(function (response) {
                    model.pages = response;
                });

        }init();
    }
})();