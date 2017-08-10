/**
 * Created by yeshajoshi on 8/9/2017.
 */
(function () {
      angular
            .module("WebAppMaker")
            .controller("flickrSearchController", flickrSearchController);

            function flickrSearchController($routeParams, widgetService, FlickrService, $location) {
                    var model = this;

                        //Event handles:
                            model.searchPhotos = searchPhotos;
                    model.selectPhoto = selectPhoto;

                       var userId =  $routeParams["uid"];
                    var websiteId =  $routeParams["wid"];
                    var pageId = $routeParams["pid"];
                    var widgetId = $routeParams["wgid"];

                        function init() {
                                model.userId = userId;
                                model.websiteId = websiteId;
                                model.pageId = pageId;
                                model.widgetId = widgetId;
                            }
                    init();

                        function searchPhotos (searchTerm) {
                                FlickrService
                                   .searchPhotos(searchTerm)
                                    .then(function(response) {
                                            data = response.data.replace("jsonFlickrApi(","");
                                            data = data.substring(0,data.length - 1);
                                            data = JSON.parse(data);
                                            model.photos = data.photos;
                                        });
                           }

                    function selectPhoto(photo) {
                            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
                            url += "/" + photo.id + "_" + photo.secret + ".jpg";

                                widgetService.findWidgetById(widgetId).then(function (response) {
                                        var _widget = response;
                                        _widget.url = url;
                                        return widgetService.updateWidget(widgetId, _widget);
                                    })
                                .then(function (response) {
                                        $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
                                    });
                        }


                    }
    })();