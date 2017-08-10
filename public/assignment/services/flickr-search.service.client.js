/**
 * Created by yeshajoshi on 8/9/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("FlickrService", FlickrService);
    function FlickrService($http) {

        this.searchPhotos = searchPhotos;

        var key = "8a2a28923bb46bdc9829776b04b75e27";
        var secret = "964d0db23d6ad646";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url)
                .then(function (response) {
                    return response;
                })
        }
    }
})();