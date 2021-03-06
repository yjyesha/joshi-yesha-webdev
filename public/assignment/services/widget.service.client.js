
/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("widgetService", widgetService);
    function widgetService($http) {

        this.findWidgetById = findWidgetById;
        this.createWidget = createWidget;
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.sendIndexOrder = sendIndexOrder;

        function createWidget(pageId, widget)
        {
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url,widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetsByPageId(pageId)
        {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url)
                .then(function(response)
                {
                    return response.data;
                });
        }

        function sendIndexOrder(pageId,startIndex,endIndex)
        {

            var url = "/api/page/"+pageId+"/widget?start=" + startIndex + "&end=" + endIndex;
            return $http.put(url).then(
                function(response)
                {
                    return response.data;
                });
        }

        function findWidgetById(widgetId)
        {
            var url = "/api/widget/"+widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget(widgetId, widget)
        {
            var url = "/api/widget/"+widgetId;
            return $http.put(url,widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWidget(widgetId)
        {
            var url = "/api/widget/"+widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }

})();