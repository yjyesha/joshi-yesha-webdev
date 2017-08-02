/**
 * Created by yeshajoshi on 7/24/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, widgetService, $location) {
        var model = this;
        var userId =  $routeParams["uid"];
        var websiteId =  $routeParams["wid"];
        var pageId = $routeParams["pid"];
        var widgetId = $routeParams["wgid"];

        model.createWidget = createWidget;

        function init()
        {
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
            model.widgetId = widgetId;
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
        }
        init();

        function createWidget(widgetType) {
            widgetService.createWidget(model.pageId, model.widget)
                .then
                (function (response) {
                    model.widget = response.data;
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/"+model.pageId+"/widget");
                },
                function (error) {
                    console.log("error encountered");
                });
        }
    }
})();