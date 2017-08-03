
/**
 * Created by yeshajoshi on 7/23/2017.
 */

var app = require("../../express");
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/uploads' });

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
app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.put("/api/page/:pageId/widget",orderWidgets);

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
function getWidgetById(widgetId) {
    for(var w in widgets){
        if(widgets[w]._id === widgetId){
            return widgets[w];
        }
    }
    return null;
}

function orderWidgets(req,res) {
    var pageId = req.params.pageId;
    var initial = req.query.start;
    var final = req.query.end;

    var widgetsForPage = [];
    var widgetsRest = [];
    for ( var w in widgets) {
        if (widgets[w].pageId === pageId) {
            widgetsForPage.push(widgets[w]);
        }
        else
            widgetsRest.push(widgets[w]);
    }
    widgetsForPage.splice(final, 0, widgetsForPage.splice(initial, 1)[0]);
    widgets = widgetsRest.concat(widgetsForPage);
    res.sendStatus(200);
    //res.send([pageId, initial, final]);
}

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    console.log("original name: "+myFile.originalname);
    console.log("original name: "+myFile.filename);

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget = getWidgetById(widgetId);
    widget.url = '/uploads/'+filename;

    var callbackUrl = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;

    res.redirect(callbackUrl);
}