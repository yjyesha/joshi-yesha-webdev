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

        model.createWidget = createWidget;

        function init()
        {
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
        }
        init();

        function createWidget(widgetType)
        {
            var widget = {widgetType: widgetType};
            var _widget = widgetService.createWidget(pageId, widget);
            if(_widget){
                model.successMessage = "Widget has been created";
            }
            $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+'/widget/'+_widget._id);
        }
    }
})();