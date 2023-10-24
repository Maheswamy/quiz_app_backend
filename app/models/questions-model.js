const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const questionsSchema = new Schema(
  {
    title: String,
    type: {
      type: String,
      enum: ["multiple-choice", "single-choice"],
    },
    options: [{ optionText: String, isCorrect: Boolean }],
    tags: {
      type: [Schema.Types.ObjectId],
      ref: "Tag",
    },
    Score: Number,
  },
  { timestamps: true }
);

const Question = model("Question", questionsSchema);

module.exports = Question;
