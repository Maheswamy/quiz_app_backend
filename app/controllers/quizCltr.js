const { validationResult } = require("express-validator");
const _ = require("lodash");
const Quiz = require("../models/quiz-model");
const Tag = require("../models/tags-model");
const quizCltr = {};

quizCltr.create = async (req, res) => {
  const body = _.pick(req.body, [
    "title",
    "startDate",
    "endDate",
    "tags",
    "questions",
    "duration",
  ]);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const tagsIdPromise = body.tags.map(async (ele) => {
      const result = await Tag.findOne({
        name: { $regex: ele, $options: "i" },
      });

      if (result) {
        console.log(result, true);
        return result._id;
      } else {
        console.log(result, false);
        const newTag = await new Tag({ name: ele }).save();
        return newTag._id;
      }
    });
    const tagsId = await Promise.all(tagsIdPromise);
    body.tags = tagsId;
    const newQuiz = await new Quiz(body).save();
    res.json(newQuiz);
  } catch (e) {
    res.status(500).json(e);
  }
};

quizCltr.list = async (req, res) => {
  const id = req.params.quizId;
  try {
    if (!id) {
      const allQuizzes = await Quiz.find();
      return res.json(allQuizzes);
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const singleQuiz = await Quiz.findById(id);
    return res.json(singleQuiz);
  } catch (e) {
    res.status(500).json(e);
  }
};

quizCltr.update = async (req, res) => {
  const id = req.params.quizId;
  const body = _.pick(req.body, [
    "title",
    "startDate",
    "endDate",
    "tags",
    "questions",
    "duration",
  ]);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, body, { new: true });
    res.json(updatedQuiz);
  } catch (e) {
    res.status(500).json(e);
  }
};

quizCltr.remove = async (req, res) => {
  const id = req.params.quizId;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const removedQuiz = await Quiz.findByIdAndDelete(id);
    if (!removedQuiz) {
      return res.status(404).json({ error: "quiz not found" });
    }
    res.json(removedQuiz);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = quizCltr;
