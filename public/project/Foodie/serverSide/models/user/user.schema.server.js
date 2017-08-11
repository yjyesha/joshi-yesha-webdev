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
        email: String,
        phone:String,
        followers:[{type:mongoose.Schema.Types.ObjectId,ref:"UserModelP"}],
        follower:[{type:mongoose.Schema.Types.ObjectId,ref:"UserModelP"}],
        isAdmin: Boolean,
        dateCreated: {type: Date,default: Date.now}}
    ,{collection:"userP"}
);
module.exports = userSchema;
