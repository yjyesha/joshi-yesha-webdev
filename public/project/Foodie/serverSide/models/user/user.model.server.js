/**
 * Created by yeshajoshi on 8/6/2017.
 */

var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var db = require("../database");
var userModelP = mongoose.model("UserModelP",userSchema);

userModelP.createUser = createUser;
userModelP.findUserById = findUserById;
userModelP.updateUser = updateUser;
userModelP.deleteUser = deleteUser;
userModelP.findUserByUsername = findUserByUsername;
userModelP.findUserByCredentials = findUserByCredentials;
userModelP.getAllUsers = getAllUsers;
userModelP.addWebsite = addWebsite;
userModelP.removeWebsite = removeWebsite;

module.exports = userModelP;

function createUser(user) {
    return userModelP.create(user);
}

function findUserById(userId) {
    return userModelP.findById(userId)
        .populate("websites")
        .exec();
}

function updateUser(userId,user) {
    return userModelP.update({_id:userId},{$set:user});
}
function findUserByCredentials(username,password) {
    return userModelP.findOne({username:username},{password:password} );
}

function findUserByUsername(username) {
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
    return userModelP
        .findById(userId)
        .then(function (user) {                    //Alice me Bob
            user.followedBy.push(fId);
            addFollower(fId,userId);
            return user.save();
        });
}
    function addFollows(userId, fId) {
        return userModelP
            .findById(userId)
            .then(function (user) {                //Bob me ALice
                user.follows.push(fId);
                user.save();
                return;
            });
}

