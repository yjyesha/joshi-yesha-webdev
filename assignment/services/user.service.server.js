
/**
 * Created by yeshajoshi on 7/23/2017.
 */

var app = require("../../express");
var userModel = require("../models/user.model.server");

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];

// http handlers
//api is a convention to return data

app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/user", createUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);


function getAllUsers(req, res) {
    res.send(users);
}

function deleteUser(req,res) {
    var userId = req.params.userId;
    for(var u in users){
        if(users[u]._id === userId){
            users.splice(u,1);
        }
    }
    res.send("0");
}

function getUserById(req, res) {
    userModel.findUserById(req.params.userId)
        .then(function (user) {
        res.json(user);
        })

//    for(var u in users) {
  //      if(users[u]._id === req.params.userId) {
    //        res.send(users[u]);
      //  }
    }


function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

//    for(var u in users) {
  //      if(users[u]._id === userId) {
    //        users[u] = user;
      //      res.send(user);
        //    return;
        //}
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
    })
    //user._id = (new Date()).getTime() + "";
    //users.push(user);
    //res.send(user);
}

function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if(username && password) {
        userModel.findUserByCredentials(username,password)
            .then(function (user) {
                res.json(user);
                return;
            },function (err) {
                res.sendStatus(404).send(err);
                return;
            });
        return;
    } else if(username) {

    }
    res.send("0");
}


