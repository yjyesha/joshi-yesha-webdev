/**
 * Created by yeshajoshi on 8/6/2017.
 */
var mongoose = require("mongoose");
var userSchema = mongoose.Schema(
    {
        username: {type: String, required: true},
        password: {type: String},
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        google: {
            id: String,
            token: String
        },
        role: {type: String, enum: ['Admin', 'HungryUser', 'EateryOwner']},
        followers: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModelP"}],
        follows: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModelP"}],
        eatSpotsLiked: [{type: mongoose.Schema.Types.ObjectId, ref: "EatSpotModel"}],
        eateryOwned: {type: String, ref: "EatSpotModel"},
        dateCreated: {type: Date, default: Date.now}
    }
    , {collection: "userP"}
);
module.exports = userSchema;
