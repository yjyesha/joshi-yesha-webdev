
/**
 * Created by yeshajoshi on 7/23/2017.
 */

var app = require("../../express");
var pageModel = require("../models/page/page.model.server");

// http handlers

app.get("/api/website/:websiteId/page", findPagesForWebsite);
app.get ("/api/page/:pageId", findPageById);
app.post("/api/website/:websiteId/page", createPage);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

function findPagesForWebsite(req,res) {

    var websiteId = req.params.websiteId;

    pageModel.findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            res.json(pages);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    pageModel.createPageForWebsite(websiteId, page)
        .then(function (page) {
            res.json(page);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    pageModel.findPageById(pageId)
        .then(function (page) {
            res.json(page);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updatePage(req, res)
{
    pageId = req.params.pageId;
    page = req.body;
    var page = req.body;
    pageModel.updatePage(pageId, page)
        .then(function (page) {
            res.json(page);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function deletePage(req,res)
{
    var pageId = req.params.pageId;
    pageModel.deletePage(pageId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}