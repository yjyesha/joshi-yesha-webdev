/**
 * Created by yeshajoshi on 7/23/2017.
 */
var widgetModel = require("../models/widget/widget.model.server");
var app = require("../../express");
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/uploads'});


app.get("/api/page/:pageId/widget", findWidgetsByPageId);
app.get("/api/widget/:widgetId", findWidgetById);
app.post("/api/page/:pageId/widget", createWidget);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);
app.post("/api/upload", upload.single('myFile'), uploadImage);
app.put("/api/page/:pageId/widget", orderWidgets);

function findWidgetsByPageId(req, res) {

    var pageId = req.params.pageId;

    widgetModel.findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;
    widgetModel.createWidget(pageId, widget)
        .then(function (widget) {
            res.json(widget);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}
function updateWidget(req, res) {
    widgetId = req.params.widgetId;
    widget = req.body;
    widgetModel.updateWidget(widgetId, widget)
        .then(function (widget) {
            res.json(widget);

        }, function (err) {
            res.sendStatus(404).send(err);

        });
}

function deleteWidget(req, res) {
    widgetId = req.params.widgetId;
    widgetModel.deleteWidget(widgetId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}
function getWidgetById(widgetId) {
    widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            return widget;
        }, function (err) {
            return err;
        });
}

function orderWidgets(req, res) {
    var pageId = req.params.pageId;
    var initial = req.query.start;
    var final = req.query.end;

    widgetModel.reorderWidget(pageId, initial, final)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var widgetTemp = null;
    widgetModel.findWidgetById(widgetId)
        .then(function (response) {
            widget = response;
            widget.url = '/uploads/'+filename;
            widgetModel.updateWidget(widgetId, widget)
                .then(function (widget) {
                });
        });

    var callbackUrl = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;

    res.redirect(callbackUrl);
}