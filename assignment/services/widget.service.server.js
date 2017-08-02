
/**
 * Created by yeshajoshi on 7/23/2017.
 */

var app = require("../../express");

var widgets =
    [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

app.get("/api/page/:pageId/widget", findWidgetsByPageId);
app.get ("/api/widget/:widgetId", findWidgetById);
app.post("/api/page/:pageId/widget", createWidget);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);

function findWidgetsByPageId(req,res) {

    var pageId = req.params.pageId;

    var widgetsN = [];
    for(var wd in widgets){
        if(widgets[wd].pageId === pageId)
        {
            widgetsN.push(widgets[wd]);
        }
    }
    return res.json(widgetsN);
}

function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;
    widget.pageId = pageId;
    widget._id = (new Date()).getTime() + "";
    widgets.push(widget);
    res.json(widget);
}

function findWidgetById(req, res) {
    for(var wd in widgets) {
        if(widgets[wd]._id === req.params.widgetId) {
            res.json(widgets[wd]);
            return;
        }
    }
    res.sendStatus(404);
}

function updateWidget(req, res)
{
    widgetId = req.params.widgetId;
    widget = req.body;
    for(var wd in widgets)
    {
        if(widgets[wd]._id === widgetId)
        {
            widgets[wd] = widget;
            res.send(widget);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWidget(req,res)
{
    widgetId = req.params.widgetId;
    for(var wd in widgets)
    {
        if(widgets[wd]._id === widgetId)
        {
            widgets.splice(wd,1);
        }
    }
    res.send("0");
}