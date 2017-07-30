
/**
 * Created by yeshajoshi on 7/23/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("websiteService", websiteService);
    function websiteService($http) {

        this.findWebsitesForUser = findWebsitesForUser;
        this.createWebsite = createWebsite;
        this.findWebsiteById = findWebsiteById;
        //this.updateWebsite = updateWebsite;
        //this.deleteWebsite = deleteWebsite;

        function createWebsite(userId, website)
        {
            var url = "/api/user/" + userId + "/website";
            return $http.post(url,website);
        }

        function findWebsitesForUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url)
                .then(function(response)
                {
                   return response.data;
                });
        }

        function findWebsiteById(userId,websiteId)
        {
            var url = "/api/user/" + userId + "/website/"+websiteId;
            return $http.get(url);
        }

        function updateWebsite(websiteId, website)
        {
            website._id = websiteId;
            for(var w in websites)
            {
                if(websites[w]._id === websiteId)
                {
                    websites[w] = website;
                }
            }
            return website;

        }

        function deleteWebsite(websiteId)
        {
            for(var w in websites)
            {
                if(websites[w]._id === websiteId)
                {
                    websites.splice(w,1);
                }
            }
        }

    }
})();