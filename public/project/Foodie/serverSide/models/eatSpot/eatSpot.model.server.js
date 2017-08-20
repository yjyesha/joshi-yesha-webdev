/**
 * Created by yeshajoshi on 8/6/2017.
 */

var mongoose = require("mongoose");
var eatSpotSchema = require("./eatSpot.schema.server");
var db = require("../database");
var eatSpotModel = mongoose.model("EatSpotModel", eatSpotSchema);
var userModelP = require("../user/user.model.server");

eatSpotModel.createeatSpot = createeatSpot;
eatSpotModel.findeatSpotById = findeatSpotById;
eatSpotModel.updateeatSpot = updateeatSpot;
eatSpotModel.deleteeatSpot = deleteeatSpot;
eatSpotModel.findAlleatSpotsForUser = findAlleatSpotsForUser;

module.exports = eatSpotModel;

function createeatSpot(userId, eatSpot) {
    if(userId.toString()!=="ByApi") {
        eatSpot._owner = userId;
        return eatSpotModel
            .create(eatSpot).then(function (eatSpotDoc) {
                return userModelP.addeatSpot(userId, eatSpotDoc)
                    .then(function (response) {
                        console.log("back to eatspot model");
                        console.log(response);
                        return eatSpotDoc;
                    });
            }, function (error) {
                console.log(error);
            });
    }
    else
    {
        return eatSpotModel
            .create(eatSpot).then(function (eatSpotDoc) {
                        console.log("back to eatspot by else model");
                        console.log(response);
                        return eatSpotDoc;
                    });
    }
}

function findeatSpotById(eatSpotId) {
    return eatSpotModel.findById(eatSpotId);
}

function updateeatSpot(eatSpotId, eatSpot) {
    return eatSpotModel.update({_id: eatSpotId}, {$set: eatSpot});
}
function findAlleatSpotsForUser(userId) {
    return eatSpotModel.find({_owner: userId});
}

function deleteeatSpot(eatSpotId,userId) {
    console.log("into delete eatspot model");
    console.log(eatSpotId);
    return eatSpotModel.remove({_id: eatSpotId})
        .then(function (status) {
            console.log("removed successfully");
            return userModelP.removeeatSpot(userId)
                .then(function (response) {
                    console.log(response);
                });
        });
}
