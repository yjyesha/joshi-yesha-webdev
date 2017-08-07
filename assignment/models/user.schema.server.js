/**
 * Created by yeshajoshi on 8/6/2017.
 */
var mongoose = require("mongoose");
var userSchema = mongoose.Schema(
    {
username: String,
    password: String,
        firstName: String,
        lastName: String,
    isAdmin: Boolean}
    ,{collection:"user"}
);
 module.exports = userSchema;
