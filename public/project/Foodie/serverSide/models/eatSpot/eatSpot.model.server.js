/**
 * Created by yeshajoshi on 8/6/2017.
 */

var mongoose = require("mongoose");
var eatSpotSchema = require("./eatSpot.schema.server");
var db = require("../database");
var eatSpotModel = mongoose.model("EatSpotModel",eatSpotSchema);
var userModelP = require("../user/user.model.server");

eatSpotModel.createeatSpot = createeatSpot;
eatSpotModel.findeatSpotById = findeatSpotById;
eatSpotModel.updateeatSpot = updateeatSpot;
eatSpotModel.deleteeatSpot = deleteeatSpot;
eatSpotModel.findAlleatSpotsForUser = findAlleatSpotsForUser;

module.exports = eatSpotModel;

function createeatSpot(userId,eatSpot) {
    eatSpot._owner = userId;
    eatSpot.id=eatSpot.name;
    return eatSpotModel
        .create(eatSpot)
        .then(function (eatSpotDoc) {
            return userModelP.addeatSpot(userId, eatSpotDoc._id);
        })
        .then(function (eatspot) {
            console.log("here");
            return eatspot;
        });
}

function findeatSpotById(eatSpotId) {
    return eatSpotModel.findById(eatSpotId)
        .populate("_user")
        .exec();
}

function updateeatSpot(eatSpotId,eatSpot) {
    return eatSpotModel.update({_id:eatSpotId},{$set:eatSpot});
}
function findAlleatSpotsForUser(userId) {
    return eatSpotModel.find({_owner:userId});
}

function deleteeatSpot(userId,eatSpotId) {
    return eatSpotModel.remove({_id: eatSpotId})
        .then(function (status) {
            return userModel.removeeatSpot(userId, eatSpotId)
        });
}
