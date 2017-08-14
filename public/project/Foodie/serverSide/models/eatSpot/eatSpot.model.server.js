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
    eatSpot._user = userId;
    var eatSpotTemp = null;
    return eatSpotModel
        .create(eatSpot)
        .then(function (eatSpotDoc) {
            eatSpotTemp = eatSpotDoc;
            console.log(userId + eatSpotDoc);
            // UserModel object is not declared -_-
            return userModel.addeatSpot(userId, eatSpotDoc._id);
        })
        .then(function (userDoc) {
            return eatSpotTemp;
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
