/**
 * Created by yeshajoshi on 8/6/2017.
 */
var mongoose = require("mongoose");

var eatSpotSchema = mongoose.Schema(
    {
        _owner: [{type:mongoose.Schema.Types.ObjectId,ref:"UserModel"}],
        name: String,
        id: String,
        favouritedBy:[{type:mongoose.Schema.Types.ObjectId,ref:"UserModel"}],
        dateCreated: {type: Date,default: Date.now}}
    ,{collection:"eatSpot"}
);
module.exports = eatSpotSchema;
