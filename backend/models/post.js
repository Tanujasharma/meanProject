const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    id: {type: String},
    title: {type: String, required: true},
    content: {type: String, required: true}
});

module.exports = mongoose.model('Post', postSchema);