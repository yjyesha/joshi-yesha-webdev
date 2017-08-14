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
        role: {type: String, enum: ['Admin', 'HungryUser', 'EateryOwner']},
        followers:[{type:mongoose.Schema.Types.ObjectId,ref:"UserModelP"}],
        follows:[{type:mongoose.Schema.Types.ObjectId,ref:"UserModelP"}],
        eatSpotsLiked:[{type:mongoose.Schema.Types.ObjectId,ref:"EatSpotModel"}],
        eatSpots:[{type:mongoose.Schema.Types.ObjectId,ref:"EatSpotModel"}],
        dateCreated: {type: Date,default: Date.now}}
    ,{collection:"userP"}
);
module.exports = userSchema;
