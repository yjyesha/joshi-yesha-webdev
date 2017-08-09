/**
 * Created by yeshajoshi on 8/9/2017.
 */
var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var db = require("./database");
var websiteModel = require("./website.model.server");
var pageModel = mongoose.model("PageModel", pageSchema);

pageModel.createPageForWebsite = createPageForWebsite;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.removeWidget = removeWidget;

module.exports = pageModel;

function createPageForWebsite(websiteId, page) {
    page._website = websiteId;
    var pageTemp = null;
    return pageModel
        .create(page)
        .then(function (pageDoc) {
            console.log(websiteId + pageDoc);
            pageTemp = pageDoc;
            return websiteModel.addPage(websiteId, pageDoc._id);
        })
        .then(function (websiteDoc) {
            return pageTemp;
        });
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website: websiteId});
}

function findPageById(pageId) {
    return pageModel.findById(pageId)
        .populate("widgets")
        .exec();
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {$set: page});
}

function deletePage(pageId) {
    return pageModel.deleteOne({_id: pageId});
}

function addWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}

function removeWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        })
}