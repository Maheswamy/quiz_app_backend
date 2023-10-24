const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tagsSchema = new Schema({
  name: String,
});

const Tag = model("Tag", tagsSchema);

module.exports = Tag;
