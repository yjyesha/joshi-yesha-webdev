
/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("pageService", pageService);
    function pageService() {
        var pages =
            [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];

        this.findPageById = findPageById;
        this.createPage = createPage;
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        function createPage(websiteId, page)
        {
            page._id = (new Date()).getTime() + "";
            page.websiteId = websiteId;
            pages.push(page);
            return page;
        }

        function findPageByWebsiteId(websiteId)
        {
            var pagesN = [];
            for(var p in pages){
                if(pages[p].websiteId === websiteId)
                {
                    pagesN.push(pages[p]);
                }
            }
            return pagesN;
        }

        function findPageById(pageId)
        {
            for(var p in pages)
            {
                if(pages[p]._id === pageId)
                {
                    return(pages[p]);
                }
            }
            return null;
        }

        function updatePage(pageId, page)
        {
            page._id = pageId;
            for(var p in pages)
            {
                if(pages[p]._id === pageId)
                {
                    pages[p] = page;
                }
            }
            return page;

        }

        function deletePage(pageId) {
            for(var p in pages){
                if(pages[p]._id === pageId){
                    pages.splice(p,1);
                }
            }
        }
    }

})();