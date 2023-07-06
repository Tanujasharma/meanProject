const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
  createdBy: {type: mongoose.Schema.Types.ObjectId, required: true, ref:"User"}
});

module.exports = mongoose.model("Post", postSchema);
