const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const responseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  quiz: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
  },
  quesions: {
    type: [{ selection: Schema.Types.ObjectId, correct: Boolean }],
  },
  Score: Number,
});

const Response = model("Response", responseSchema);

module.exports = Response;
