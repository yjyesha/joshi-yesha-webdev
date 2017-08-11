
/**
 * Created by yeshajoshi on 7/23/2017.
 */

var app = require("../../express");
var userModelP = require("../models/user/user.model.server");


// http handlers
//api is a convention to return data

app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/user", createUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);


function addFollow(req, res) {
    var userId = req.params.userId;
    var fId = req.params.fidId;
    userModelP.addFollow(userId,fId)
        .then(function (users)
        {
            res.send(users);
        },function (err)
        {
            res.sendStatus(404).send(err);
        });

}

function getAllUsers(req, res) {
    userModelP.getAllUsers()
        .then(function (users)
        {
            console.log("hey server"+users);
            res.send(users);
        },function (err)
        {
            res.sendStatus(404).send(err);
        });

}

function deleteUser(req,res) {
    var userId = req.params.userId;
    userModelP.deleteUser(userId)
        .then(function (status) {
            res.json(status);
        },function (err) {
            res.sendStatus(404).send(err);
        });
}

function getUserById(req, res) {
    userModelP.findUserById(req.params.userId)
        .then(function (user)
        {
            res.json(user);
        },function (err)
        {
            res.sendStatus(404).send(err);
        });

}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

    userModelP.updateUser(userId,user)
        .then(function (status)
        {
            res.json(status);
        },function (err) {
            res.status(404).send(err);
        });
}

function createUser(req, res) {
    var user = req.body;
    userModelP.createUser(user)
        .then(function(user)
        {

            res.json(user);
        },function (err)
        {
            res.sendStatus(404).send(err);
        });
}

function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if(username && password) {
        userModelP.findUserByCredentials(username,password)
            .then(function (user) {
                res.json(user);
            },function (err) {
                res.sendStatus(404).send(err);
            });
    } else if(username) {
        userModelP.findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            },function (err) {
                res.sendStatus(404).send(err);
            });
    }
}


