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

module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
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
    return userModel.deleteOne({_id:userId});
}

function getAllUsers() {
    return userModel.find();
}