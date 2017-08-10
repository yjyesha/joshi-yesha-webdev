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

            widgetService
                .findWidgetById(widgetId)
                .then(function (response) {
                    var _widget = response;
                    model.widget = _widget;
                });
        }
        init();

        function updateWidget(widget) {
            widgetService.updateWidget(widgetId, widget)
                .then(function (response) {
                    widget = response;
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                });
        }

        function deleteWidget()
        {
            widgetService.deleteWidget(widgetId)
                .then(function (response) {
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page/"+pageId+"/widget");
                });
        }
    }
})();