/**
 * Created by yeshajoshi on 8/6/2017.
 */
var mongoose = require("mongoose");

var eatSpotSchema = mongoose.Schema(
    {
        _id : String,
        _owner: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
        name: String,
        display_address: String,
        location: {
            address1: String,
            address2: String,
            city: String,
            zip_code: String,
            country: String,
            state: String
        },
        phone:String,
        favouritedBy: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
        rating: [{type: Number, enum: ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5']}],
        image_url: String,
        reviews: [String],
        price:[{type: String, enum: ['$', '$$', '$$$']}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "eatSpot"}
);
module.exports = eatSpotSchema;
