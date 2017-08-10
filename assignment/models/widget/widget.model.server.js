/**
 * Created by yeshajoshi on 8/9/2017.
 */
var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var db = require("../database");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
var pageModel = require("../page/page.model.server");

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    var widgetTemp = null;
    widget._page = pageId;
    return widgetModel.create(widget)
        .then(function (widgetDoc) {
            widgetTemp = widgetDoc;
            return pageModel.addWidget(pageId, widgetDoc._id);
        })
        .then(function (pageDoc) {
            return widgetTemp;
        })
}

function findAllWidgetsForPage(pageId) {
    return pageModel.findPageById(pageId)
        .then(function (page) {
            return page.widgets;
        });
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget)  {
    return widgetModel.update({_id: widgetId}, {$set: widget});
}

function deleteWidget(widgetId) {
    return widgetModel.deleteOne({_id: widgetId});
}

function reorderWidget(pageId, start, end) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var _widget = page.widgets.splice(start, 1)[0];
            page.widgets.splice(end, 0, _widget);
            return page.save();
        });
}