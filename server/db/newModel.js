const mongoose = require("mongoose");

const NewSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Please provide id"],
    unique: [true, "Id exist"],
  },
  title: {
    type: String,
    required: [true, "Please provide title"],
  },
  content: {
    type: String,
    required: [true, "Please provide content"],
  },
});
module.exports = mongoose.models.News || mongoose.model("News", NewSchema);
