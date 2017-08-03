/**
 * Created by yeshajoshi on 8/2/2017.
 */
(function () {
    angular
        .module("wbdvDirectives",[])
        .directive('wbdvSortable', wbdvSortableDir);

    function wbdvSortableDir($routeParams, widgetService, $http) {
        function linkFunction(scope, element) {
            console.log(element);
            var pageId = $routeParams["pid"];
            $(element).sortable({
                axis: 'y',
                handle: '.handle',
                start: function (event, ui) {
                    startIndex = $(ui.item).index();
                }
                ,
                stop: function (event, ui) {
                    endIndex = $(ui.item).index();
                    console.log([startIndex, endIndex]);
                    /*var url = "/api/page/" + pageId + "/widget?start=" + startIndex + "&end=" + endIndex;
                     $http.put(url);*/
                    widgetService.sendIndexOrder(pageId, startIndex, endIndex);
                }
            });
        }

        return {
            link: linkFunction
        }
    }
})();