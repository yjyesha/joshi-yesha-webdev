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
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];

        model.createPage = createPage;

        function init() {
            pageService
                .findPagesForWebsite(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }
        init();

        function createPage(page)
        {
            pageService.createPage(model.websiteId,page)
                .then(function(response)
            {
                model.page = response.data;
                $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
            });
        }
    }
})();
