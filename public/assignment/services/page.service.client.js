
/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("pageService", pageService);
    function pageService($http) {

        this.findPageById = findPageById;
        this.createPage = createPage;
        this.findPagesForWebsite = findPagesForWebsite;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        function createPage(websiteId, page)
        {
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url,page);
        }

        function findPagesForWebsite(websiteId)
        {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url)
                .then(function(response)
                {
                    return response.data;
                });
        }

        function findPageById(pageId)
        {
            var url = "/api/page/"+pageId;
            return $http.get(url);
        }

        function updatePage(pageId, page)
        {
            var url = "/api/page/"+pageId;
            return $http.put(url,page);
        }

        function deletePage(pageId)
        {
            var url = "/api/page/"+pageId;
            return $http.delete(url,pageId);
        }
    }

})();