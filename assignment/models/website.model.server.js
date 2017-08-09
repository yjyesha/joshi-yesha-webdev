/**
 * Created by yeshajoshi on 8/6/2017.
 */

var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var db = require("./database");
var websiteModel = mongoose.model("WebsiteModel",websiteSchema);

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;

module.exports = websiteModel;

function createWebsite(userId,website) {
    website._user = userId;
    return websiteModel.create(website);
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId,website) {
    return websiteModel.update({_id:websiteId},{$set:website});
}
function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user:userId});
}

function deleteWebsite(websiteId) {
    return websiteModel.deleteOne({_id:websiteId});
}
