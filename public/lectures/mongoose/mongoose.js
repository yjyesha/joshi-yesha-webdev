/**
 * Created by yeshajoshi on 8/6/2017.
 */
var mongoose = require("mongoose");
var db = mongoose.connect('mongodb://localhost/test');
var userSchema =  mongoose.Schema({
   username: String,
    firstname: String,
    lastname: String,
    status: {type: String, enum: ["MARRIED","SINGLE"]},
    dob: Date,
    created: {type: Date,default: Date.now}
    },{collection: "user"});


var userModel = mongoose.model("UserModel",userSchema);

removeUser("5986c79685d7b2f368ac0936")
    .then(function(user)
    {
        console.log(user);
    });

updateUser("5986c79685d7b2f368ac0936",{firstname:'Alice',lastname:'Wonderland'})
    .then(function(status)
    {
        console.log(status);
    });

findById("alice")
    .then(function(user)
    {
        console.log(user);
    });

findByUsername("alice")
    .then(function(user)
    {
        console.log(user);
    });

findAllUsers()
    .then(function(users)
{
    console.log(users);
});

function removeUser(userId) {
    return userModel.remove({_id:userId});
}

function updateUser(userId,newUserValues) {
    return userModel.update({_id:userId},
        newUserValues);
}

function findById(id) {
    return userModel.findById(id); //syntactic sugar mix of id plus one
}

function findAllUsers() {
    return userModel.find();
    }

function findByUsername(username) {
    return userModel.findOne({usename: username});
}

function createUser(user) {
    userModel.create(user, function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(doc)
        }
    });
}