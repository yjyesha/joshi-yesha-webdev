
/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("widgetService", widgetService);
    function widgetService() {
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

        this.findWidgetById = findWidgetById;
        this.createWidget = createWidget;
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

        function createWidget(pageId, widget)
        {
            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageId;
            widgets.push(widget);
            return widget;
        }

        function findWidgetsByPageId(pageId)
        {
            var widgetsN = [];
            for(var wd in widgets){
                if(widgets[wd].pageId === pageId)
                {
                    widgetsN.push(widgets[wd]);
                }
            }
            return widgetsN;
        }

        function findWidgetById(widgetId)
        {
            for(var wd in widgets)
            {
                if(widgets[wd]._id === widgetId)
                {
                    return(widgets[wd]);
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget)
        {
            widget._id = widgetId;
            for(var wd in widgets)
            {
                if(widgets[wd]._id === widgetId)
                {
                    widgets[wd] = widget;
                }
            }
            return widget;

        }

        function deleteWidget(widgetId) {
            for(var wd in widgets){
                if(widgets[wd]._id === widgetId){
                    widgets.splice(wd,1);
                }
            }
        }
    }

})();