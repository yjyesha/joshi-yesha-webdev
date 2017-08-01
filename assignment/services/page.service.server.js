
/**
 * Created by yeshajoshi on 7/23/2017.
 */

/**
 * Created by yeshajoshi on 7/23/2017.
 */
var app = require("../../express");

var pages =
    [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];


// http handlers

app.get("/api/website/:websiteId/page", findPagesForWebsite);
app.get ("/api/page/:pageId", findPageById);
app.post("/api/website/:websiteId/page", createPage);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

function findPagesForWebsite(req,res) {

    var websiteId = req.params.websiteId;

    var pagesN = [];
    for(var p in pages){
        if(pages[p].websiteId === websiteId)
        {
            pagesN.push(pages[p]);
        }
    }
    return res.json(pagesN);
}

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    page.websiteId = websiteId;
    page._id = (new Date()).getTime() + "";

    pages.push(page);
    res.json(page);
}

function findPageById(req, res) {
    for(var p in pages) {
        if(pages[p]._id === req.params.pageId) {
            res.json(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
}

function updatePage(req, res)
{
    pageId = req.params.pageId;
    page = req.body;
    for(var p in pages)
    {
        if(pages[p]._id === pageId)
        {
            pages[p] = page;
            res.send(page);
            return;
        }
    }
    res.sendStatus(404);
}

function deletePage(req,res)
{
    pageId = req.params.pageId;
    for(var p in pages)
    {
        if(pages[p]._id === pageId)
        {
            pages.splice(p,1);
        }
    }
    res.send("0");
}