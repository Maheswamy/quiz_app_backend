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
      return res.json({ errors: errors.array() });
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
    const singleQuiz = await Quiz.findById(id);
    return res.json(singleQuiz);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = quizCltr;
