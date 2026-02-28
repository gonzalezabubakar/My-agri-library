const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    type: String,
    url: String,
    image: String,
    description: String,
    createdBy: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);