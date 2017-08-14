/**
 * Created by yeshajoshi on 8/6/2017.
 */

var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var db = require("../database");
var userModelP = mongoose.model("UserModelP",userSchema);
var eatSpotModel = require("../eatSpot/eatSpot.model.server");
userModelP.createUser = createUser;
userModelP.findUserById = findUserById;
userModelP.updateUser = updateUser;
userModelP.deleteUser = deleteUser;
userModelP.findUserByUsername = findUserByUsername;
userModelP.findUserByCredentials = findUserByCredentials;
userModelP.getAllUsers = getAllUsers;
userModelP.addFollower = addFollower;
userModelP.favourtieeatSpot = favourtieeatSpot;

module.exports = userModelP;

function createUser(user) {
    return userModelP.create(user);
}

function findUserById(userId) {
    console.log("weraaa"+userId);
    return userModelP.findById(userId)
         .populate("followers")
         .populate("follows")
         .exec();
}

function updateUser(userId,user) {
    return userModelP.update({_id:userId},{$set:user});
}
function findUserByCredentials(username,password) {
    return userModelP.findOne({username:username},{password:password} );
}

function findUserByUsername(username) {
    console.log("username");
    return userModelP.findOne({username:username});
}

function deleteUser(userId,user) {
    return userModelP
        .findById(userId)
        .then(function (user) {
            return userModelP.remove({_id: userId});
        });
}

function getAllUsers() {
    console.log("hey "+userModelP.find());
    return userModelP.find();
}

function addFollower(userId, fId) {
    console.log(userId+"  use  "+fId);
            return userModelP
            .findById(userId)
            .then(function (user) {                    //Alice me Bob
                user.follows.push(fId);
                userModelP.findById(fId)
                    .then(function (user) {                //Bob me ALice
                        user.followers.push(userId);
                        user.save();
                    });
                return user.save();
            });
}

function addeatSpot(userId, eatSpotId) {
    return userModelP
        .findById(userId)
        .then(function (user) {
            user.eatSpots.push(eatSpotId);
            return user.save();
        });
}

function removeeatSpot(userId, eatSpoteId) {
    return userModelP
        .findById(userId)
        .then(function (user) {
            var index = user.eatSpots.indexOf(eatSpotId);
            user.eatSpots.splice(index, 1);
            return user.save();
        });
}

function favourtieeatSpot(userId, eatSpotId) {
    return eatSpotModel.
        findById(eatSpotId)
        .then(function (eatSpot) {                    //Alice me Bob
            eatSpot.favouritedBy.push(userId);
            eatSpot.save();
            userModelP.findById(userId)
                .then(function (user) {                //Bob me ALice
                    user.eatSpotsLiked.push(eatSpotId);
                    user.save();
                    return user;
                });
        });
}


function unfavouriteeatSpot(userId, eatSpotId) {
    return userModelP
        .findById(userId)
        .then(function (user) {
            var index = user.eatSpotsLiked.indexOf(eatSpotId);
            user.eatSpots.splice(index, 1);
            return user.save();
        });
}
