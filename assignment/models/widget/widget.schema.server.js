/**
 * Created by yeshajoshi on 8/9/2017.
 */
var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.Types.ObjectId,  ref: 'PageModel'},
    type: {type:String, enum:['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "widget"});

module.exports = widgetSchema;