/**
 * Created by yeshajoshi on 8/12/2017.
 */
var app = require("../../../../../express");

const https = require('https');

app.post("/api/project/search", searchFoodSpotByCity);
app.post("/api/project/details", searchFoodSpotById);


// $http.get('https://api.yelp.com/v3/businesses/search?term=food&location='+city, {
//headers: {'Content-Type':'application/x-www-form-urlencoded','Authorization': 'Bearer ZTE-0HHqsbQLo0zbqEAOvDuFKplK6l1N1zTw7T3_w-Hzja7x1VdenPu1-lA1P82VDjogZeywIoLN_WdOxFxJdt3Isl14v1Re73YOWiNOrB2H_4b5Ozg-LBwi3--DWXYx'}
//});

function searchFoodSpotByCity(request, response) {
    console.log("someeeee");
    var city = request.params.city;
    var body = request.body;
    console.log(body);
    if (body.requestType === "GET") {
        var url = body.requestURL;
        https.get({
            host: 'api.yelp.com',
            path: '/v3/businesses/search?term=food&location=' + city,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ZTE-0HHqsbQLo0zbqEAOvDuFKplK6l1N1zTw7T3_w-Hzja7x1VdenPu1-lA1P82VDjogZeywIoLN_WdOxFxJdt3Isl14v1Re73YOWiNOrB2H_4b5Ozg-LBwi3--DWXYx'
            }

        }, function (apiResponse) {
            var resultBody = '';
            apiResponse.on('data', function (d) {
                resultBody += d;
            });
            apiResponse.on('end', function () {
                response.send(JSON.parse(resultBody));
            });
        })
    } else {
        response.sendStatus(400);
    }
}

function searchFoodSpotById(request, response) {
    console.log("someeeee");
    var eId = request.body.requestURL;
    var body = request.body;
    if (body.requestType === "GET") {
        var url = body.requestURL;
        https.get({
            host: 'api.yelp.com',
            path: '/v3/businesses/' + eId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ZTE-0HHqsbQLo0zbqEAOvDuFKplK6l1N1zTw7T3_w-Hzja7x1VdenPu1-lA1P82VDjogZeywIoLN_WdOxFxJdt3Isl14v1Re73YOWiNOrB2H_4b5Ozg-LBwi3--DWXYx'
            }

        }, function (apiResponse) {
            var resultBody = '';
            apiResponse.on('data', function (d) {
                resultBody += d;
            });
            apiResponse.on('end', function () {
                console.log(resultBody);
                response.send(JSON.parse(resultBody));
            });
        })
    } else {
        response.sendStatus(400);
    }
}