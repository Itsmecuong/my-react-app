const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  slug: { type: String, required: [true, "Please provide slug"], unique: true },
  title: { type: String, required: [true, "Please provide a title!"] },
  description: {
    type: String,
    required: [true, "Please provide a description!"],
  },
  comments: { type: [String], default: [] },
});

module.exports = mongoose.models.Posts || mongoose.model("Posts", PostSchema);
