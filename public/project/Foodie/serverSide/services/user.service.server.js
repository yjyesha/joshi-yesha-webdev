/**
 * Created by yeshajoshi on 7/23/2017.
 */

var app = require("../../../../../express");
var userModelP = require("../models/user/user.model.server");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


// http handlers
//api is a convention to return data
app.put("/api/project/follower/:userId", addFollower);
app.delete("/api/project/follower/:userId", removeFollower);
app.put("/api/project/favourite/:userId", favourtieeatSpot);
app.get("/api/project/users", getAllUsers);
app.get("/api/project/user/:userId", getUserById);
app.post("/api/project/login", passport.authenticate('local'), login);
app.get("/api/project/user", findUserByUsername);
app.post("/api/project/user", createUser);
app.put("/api/project/user/:userId", updateUser);
app.delete("/api/project/user/:userId", deleteUser);
app.get("/api/project/checkLogin", checkLogin);
app.post("/api/project/logout",logout);
function serializeUser(user, done) {
    done(null, user);
}

function logout(req,res)
{
    req.logOut();
    res.send(200);
}

function checkLogin(req,res)
{
    res.send(req.isAuthenticated() ? req.user : '0');
}
function deserializeUser(user, done) {
    console.log("Debug1" + user._id);
    userModelP
        .findUserById(user._id)
        .then(
            function (user) {
                console.log("Debug2" + user._id);
                done(null, user);
            },
            function (err) {
                console.log("Debug3");
                done(err, null);
            }
        );
}

function login(req, res) {
    var user = req.user;
    console.log("dgfhjk");
    console.log(user);
    res.json(user);
}

function localStrategy(username, password, done) {
    userModelP
        .findUserByCredentials(username, password)
        .then(function (user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            });
}

function getAllUsers(req, res) {
    // console.log("hey here new");
    userModelP.getAllUsers()
        .then(function (users) {
            res.send(users);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function addFollower(req, res) {
    console.log("hbwejb");
    var userId = req.params.userId;
    var fId = req.body;
    console.log(fId);
    //console.log(follower);
    userModelP.addFollower(userId, fId)
        .then(function (users) {
            res.send(users);
        }, function (err) {
            console.log("nabh");
            res.sendStatus(404).send(err);
        });
}

function removeFollower(req, res) {
    console.log("hbwejb");
    var userId = req.params.userId;
    var fId = req.body;
    console.log(fId);
    //console.log(follower);
    userModelP.removeFollower(userId, fId)
        .then(function (users) {
            res.send(users);
        }, function (err) {
            console.log("nabh");
            res.sendStatus(404).send(err);
        });
}

function favourtieeatSpot(req, res) {
    console.log("fav kiya");
    var userId = req.params.userId;
    var fId = req.body;
    console.log(fId);
    //console.log(follower);
    userModelP.favourtieeatSpot(userId, fId)
        .then(function (user) {
            console.log("jiahou");
            res.send(user);
        }, function (err) {
            console.log("nabh");
            res.sendStatus(404).send(err);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModelP.deleteUser(userId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function getUserById(req, res) {
    userModelP.findUserById(req.params.userId)
        .then(function (user) {
            console.log("responss");
            res.json(user);
        }, function (err) {
            console.log("erooooooorr");
            res.sendStatus(404).send(err);
        });

}

function updateUser(req, res) {
    console.log("hbdjah");
    var userId = req.params.userId;
    var user = req.body;

    userModelP.updateUser(userId, user)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.status(404).send(err);
        });
}

function createUser(req, res) {
    var user = req.body;
    userModelP.createUser(user)
        .then(function (user) {

            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}


function findUserByUsername(req, res) {
    var username = req.query.username;

    userModelP.findUserByUsername(username)
        .then(function (user) {
            console.log("abhi"+user);
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}


