/**
 * Created by yeshajoshi on 7/23/2017.
 */
var app = require("../../../../../express");
var eatSpotModel = require("../models/eatSpot/eatSpot.model.server");

// http handlers

app.get("/api/project/user/:userId/eatSpot", findeatSpotsForUser);
app.get("/api/project/eatSpot/:eatSpotId", findeatSpotById);
app.post("/api/project/eat/:userId/createEatSpot", createeatSpot);
app.put("/api/project/eatSpot/:eatSpotId", updateeatSpot);
app.delete("/api/project/user/:userId/eatSpot", deleteeatSpot);

function findeatSpotsForUser(req, res) {
    var userId = req.params.userId;
    eatSpotModel.findAlleatSpotsForUser(userId)
        .then(function (eatSpots) {
            res.json(eatSpots);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function createeatSpot(req, res) {
    var eatSpot = req.body;
    var userId = req.params.userId;
    console.log(eatSpot.price + "aaheeee");
    eatSpotModel.createeatSpot(userId, eatSpot)
        .then(function (response) {
            console.log(response.data);
            console.log("milaaa data?");
            res.send(response);
        });
}

function findeatSpotById(req, res) {
    var eatSpotId = req.params.eatSpotId;
    console.log(eatSpotId);
    eatSpotModel.findeatSpotById(eatSpotId)
        .then(function (eatSpot) {
            console.log("eatspotmodel se respoinse");
            res.json(eatSpot);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updateeatSpot(req, res) {
    var eatSpotId = req.params.eatSpotId;
    var eatSpot = req.body;
    eatSpotModel.updateeatSpot(eatSpotId, eatSpot)
        .then(function (eatSpot) {
            res.json(eatSpot);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function deleteeatSpot(req, res) {
    var userId = req.params.userId;
    var eatSpotId = req.body;
    eatSpotModel.deleteeatSpot(userId, eatSpotId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}