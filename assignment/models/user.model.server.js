/**
 * Created by yeshajoshi on 8/6/2017.
 */

var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var db = require("./database");
var userModel = mongoose.model("UserModel",userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.getAllUsers = getAllUsers;
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;

module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId)
        .populate("websites")
        .exec();
}

function updateUser(userId,user) {
    return userModel.update({_id:userId},{$set:user});
}
function findUserByCredentials(username,password) {
    return userModel.findOne({username:username},{password:password} );
}

function findUserByUsername(username) {
    return userModel.findOne({username:username});
}

function deleteUser(userId,user) {
    return userModel
        .findById(userId)
        .then(function (user) {
            return userModel.remove({_id: userId});
        });
}

function getAllUsers() {
    return userModel.find();
}

function addWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function removeWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}