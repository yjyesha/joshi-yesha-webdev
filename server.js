var app = require('./express');
var passport = require('passport');
var express = app.express;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: "Yesha",
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./test/app");
port = process.env.PORT || 3000;
app.listen(port);