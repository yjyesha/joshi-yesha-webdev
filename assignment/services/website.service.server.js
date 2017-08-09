
/**
 * Created by yeshajoshi on 7/23/2017.
 */
var app = require("../../express");
var websiteModel = require("../models/website.model.server");

// http handlers

app.get("/api/user/:userId/website", findWebsitesForUser);
app.get ("/api/website/:websiteId", findWebsiteById);
app.post("/api/user/:userId/website", createWebsite);
app.put("/api/website/:websiteId", updateWebsite);
app.delete("/api/website/:websiteId", deleteWebsite);

function findWebsitesForUser(req,res) {
    var userId = req.params.userId;
    websiteModel.findAllWebsitesForUser(userId)
        .then(function(websites)
        {
            res.json(websites);
        },function(err)
        {
            res.sendStatus(404).send(err);
        });
}

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    websiteModel.createWebsite(userId,website)
        .then(function(website)
        {
            res.json(website);
        },function(err)
        {
            res.sendStatus(404).send(err);
        });
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel.findWebsiteById(websiteId)
        .then(function(website)
        {
            res.json(website);
        },function(err)
        {
            res.sendStatus(404).send(err);
        });
}

function updateWebsite(req, res)
{
    var websiteId = req.params.websiteId;
    var website = req.body;
    websiteModel.updateWebsite(websiteId,website)
        .then(function(website)
        {
            res.json(website);
        },function(err)
        {
            res.sendStatus(404).send(err);
        });
}

function deleteWebsite(req,res)
{
    var websiteId = req.params.websiteId;
    websiteModel.deleteWebsite(websiteId)
        .then(function(status)
        {
            res.json(status);
        },function(err)
        {
            res.sendStatus(404).send(err);
        });
}