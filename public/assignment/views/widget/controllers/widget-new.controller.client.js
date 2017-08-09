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
            var widget = {type: widgetType};
            widgetService.createWidget(pageId, widget).then(function (response) {
                    var _widget = response;
                    if (_widget) {
                        model.successMessage = "Widget created!";
                    }
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + '/widget/' + _widget._id);
                },
                function (error) {
                    console.log("error encountered");
                });
        }
    }
})();