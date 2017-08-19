/**
 * Created by yeshajoshi on 8/6/2017.
 */

var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var db = require("../database");
var userModelP = mongoose.model("UserModelP", userSchema);
userModelP.createUser = createUser;
userModelP.findUserById = findUserById;
userModelP.updateUser = updateUser;
userModelP.deleteUser = deleteUser;
userModelP.findUserByUsername = findUserByUsername;
userModelP.findUserByCredentials = findUserByCredentials;
userModelP.getAllUsers = getAllUsers;
userModelP.addFollower = addFollower;
userModelP.favouriteeatSpot = favouriteeatSpot;
userModelP.removeFollower = removeFollower;
userModelP.findUserByGoogleId = findUserByGoogleId;
userModelP.addeatSpot = addeatSpot;
userModelP.removeeatSpot = removeeatSpot;
userModelP.findUserByFacebookId = findUserByFacebookId;
module.exports = userModelP;


function findUserByFacebookId(facebookId) {
    console.log(facebookId);
    return userModelP.findOne({'facebook.id': facebookId});
}

function findUserByGoogleId(googelId) {
    return userModelP.findOne({'google.id': googelId});
}
function createUser(user) {
    return userModelP.create(user);
}

function findUserById(userId) {
    console.log("weraaa" + userId);
    return userModelP.findById(userId)
        .populate("followers")
        .populate("follows")
        .populate("eateryOwned")
        .populate("eatSpotSLiked")
        .exec();
}

function updateUser(userId, user) {
    return userModelP.update({_id: userId}, {$set: user});
}
function findUserByCredentials(username, password) {
    return userModelP.findOne({"username": username, "password": password});
}

function findUserByUsername(username) {
    console.log("username");
    return userModelP.findOne({username: username});
}

function deleteUser(userId, user) {
    return userModelP
        .findById(userId)
        .then(function (user) {
            return userModelP.remove({_id: userId});
        });
}

function getAllUsers() {
    console.log("hey " + userModelP.find());
    return userModelP.find();
}

function addFollower(userId, fId) {
    console.log(userId + "  use  " + fId);
    return userModelP
        .findById(userId)
        .then(function (user) {
            var index = user.follows.indexOf(fId);
            if (index < 0) {
                user.follows.push(fId);  //duplicate left
                userModelP.findById(fId)
                    .then(function (user) {
                        var index = user.follows.indexOf(userId);
                        if (index < 0) {
                            user.followers.push(userId);
                        }
                        user.save();
                    });
                return user.save();
            }
        });
}

function removeFollower(userId, fId) {
    console.log(userId + "  use  " + fId);
    return userModelP
        .findById(userId)
        .then(function (user) {
            var index = user.follows.indexOf(fId);
            if (index < 0) {
                user.follows.splice(index, 1);
                userModelP.findById(fId)
                    .then(function (user) {
                        var index = user.follows.indexOf(usrId);
                        if (index < 0) {
                            user.followers.splice(index, 1);
                            user.save();
                        }
                    });
                return user.save();
            }
        });
}


function addeatSpot(userId, eatSpot) {
    console.log(userId + " : " + eatSpot);
    return userModelP.findById(userId)
        .then(function (user) {
            console.log("jack");
            userModelP.findByIdAndUpdate(user._id, {$set: {"eateryOwned": eatSpot._id}},
                {new: true}, function (error, newUser) {
                    console.log(newUser);
                    user = newUser;
                });
            return user;
        });
}

function removeeatSpot(userId) {
    console.log("into remove eatspot");
    return userModelP
        .findById(userId)
        .then(function (user) {
            return userModelP.findById(user._id)
                .then(function (user) {
                    delete user.eateryOwned;
                    console.log(user);
                    return user.save();
                });
        });
}


function favouriteeatSpot(userId, eatSpotId) {
    return userModelP.findById(userId)
        .then(function (user) {
            console.log(eatSpotId);//Bob me ALice
            if (user.eatSpotsLiked.indexOf(eatSpotId._id) < 1) {
                user.eatSpotsLiked.push(eatSpotId._id);
            }
            console.log(user);//Bob me ALice
            return user.save();
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
