/**
 * Created by yeshajoshi on 8/6/2017.
 */

var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var db = require("./database");
var websiteModel = mongoose.model("WebsiteModel",websiteSchema);
var userModel = require("./user.model.server");

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.addPage = addPage;
websiteModel.removePage = removePage;

module.exports = websiteModel;

function createWebsite(userId,website) {
    website._user = userId;
    var websiteTemp = null;
    return websiteModel
        .create(website)
        .then(function (websiteDoc) {
            websiteTemp = websiteDoc;
            console.log(userId + websiteDoc);
            // UserModel object is not declared -_-
            return userModel.addWebsite(userId, websiteDoc._id);
        })
        .then(function (userDoc) {
            return websiteTemp;
        });
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId)
        .populate("_user")
        .exec();
}

function updateWebsite(websiteId,website) {
    return websiteModel.update({_id:websiteId},{$set:website});
}
function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user:userId});
}

function deleteWebsite(userId,websiteId) {
    return websiteModel.remove({_id: websiteId})
        .then(function (status) {
            console.log("hely"+userId+websiteId);
            return userModel.removeWebsite(userId, websiteId)
        });
}

function addPage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        });
}

function removePage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        })
}