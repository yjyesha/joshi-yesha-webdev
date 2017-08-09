
/**
 * Created by yeshajoshi on 7/23/2017.
 */

var app = require("../../express");
var userModel = require("../models/user.model.server");


// http handlers
//api is a convention to return data

app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/user", createUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);


function getAllUsers(req, res) {
    userModel.getAllUsers()
        .then(function (users)
        {
            res.send(users);
        },function (err)
        {
            res.sendStatus(404).send(err);
        });

}

function deleteUser(req,res) {
    var userId = req.params.userId;
    userModel.deleteUser(userId)
        .then(function (status) {
            res.json(status);
        },function (err) {
            res.sendStatus(404).send(err);
        });
}

function getUserById(req, res) {
    userModel.findUserById(req.params.userId)
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

    userModel.updateUser(userId,user)
        .then(function (status)
        {
            res.json(status);
        },function (err) {
            res.status(404).send(err);
        });
}

function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user)
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
        userModel.findUserByCredentials(username,password)
            .then(function (user) {
                res.json(user);
            },function (err) {
                res.sendStatus(404).send(err);
            });
    } else if(username) {
        userModel.findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            },function (err) {
                res.sendStatus(404).send(err);
            });
    }
}


