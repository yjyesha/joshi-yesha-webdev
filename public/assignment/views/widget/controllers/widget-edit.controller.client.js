/**
 * Created by yeshajoshi on 7/24/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, widgetService, $location) {
        var model = this;

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        var userId =  $routeParams["uid"];
        var websiteId =  $routeParams["wid"];
        var pageId = $routeParams["pid"];
        var widgetId = $routeParams["wgid"];

        function init() {
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
            model.widgetId = widgetId;
            var widget = widgetService.findWidgetById(widgetId);
            model.widget = widget;
        }
        init();

        function updateWidget(widget) {
            var _widget = widgetService.updateWidget(widgetId, widget);
            $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
        }

        function deleteWidget() {
            widgetService.deleteWidget(widgetId);
            $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
        }
    }
})();