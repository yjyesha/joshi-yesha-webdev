/**
 * Created by yeshajoshi on 8/2/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .directive('wbdvSortable', wbdvSortableDir);

    function wbdvSortableDir() {
        function linkFunction(scope, element) {
            console.log(element);
            $(element).sortable({
                axis: 'y',
                handle: '.handle'
            });
        }

        return {
            link: linkFunction
        }
    }
})();