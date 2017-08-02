/**
 * Created by yeshajoshi on 7/24/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, widgetService, $location) {


        var model = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        var widgetId = $routeParams["wgid"];

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        function init()
        {
            model.websiteId = websiteId;
            model.userId = userId;
            model.pageId = pageId;
            model.widgetId  = widgetId;
            widgetService.findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });

            widgetService
                .findWidgetById(model.widgetId)
                .then(function (response) {
                    var _widget = Object.assign({}, response.data);
                    model.widget = _widget;
                });
        }
        init();

        function updateWidget(widget) {
            widgetService.updateWidget(model.widgetId, model.widget)
                .then(function (response) {
                    widget = response.data;
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                });
        }

        function deleteWidget()
        {
            widgetService.deleteWidget(model.widgetId)
                .then(function (response) {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/"+model.pageId+"/widget");
                });
        }
    }
})();