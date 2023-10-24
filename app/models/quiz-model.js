const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quizSchema = new Schema(
  {
    title: String,
    startDate: Date,
    endDate: Date,
    tags: {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
    questions: {
      type: [Schema.Types.ObjectId],
      ref: "Question",
    },
    duration: Number,
  },
  { timestamps: true }
);

const Quiz = model("Quiz", quizSchema);

module.exports = Quiz;
