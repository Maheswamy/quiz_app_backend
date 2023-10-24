const { validationResult } = require("express-validator");
const _ = require("lodash");
const Tag = require("../models/tags-model");
const Question = require("../models/questions-model");

const questionsCltr = {};

questionsCltr.create = async (req, res) => {
  const body = _.pick(req.body, "title", "type", "tags", "score", "options");

  try {
    const errors = validationResult(req);
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
    const newQuestion = await new Question(body).save();
    res.json({ newQuestion });
  } catch (e) {
    res.status(500).json(e);
  }
};

questionsCltr.read = async (req, res) => {
  try {
    const allQuestions = await Question.find();
    res.json(allQuestions);
  } catch (e) {
    res.status(500).json(e);
  }
};

questionsCltr.readOne = async (req, res) => {
  const id = req.params.questionId;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const question = await Question.findById(id);
    res.json(question);
  } catch (e) {
    res.status(500).json(e);
  }
};

questionsCltr.update = async (req, res) => {
  const id = req.params.questionId;
  const body = _.pick(req.body, "title", "type", "tags", "score", "options");

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const tagsIdPromise = body.tags.map(async (ele) => {
      const result = await Tag.findOne({
        name: { $regex: ele, $options: "i" },
      });

      if (result) {
        return result._id;
      } else {
        const newTag = await new Tag({ name: ele }).save();
        return newTag._id;
      }
    });
    const tagsId = await Promise.all(tagsIdPromise);

    body.tags = tagsId;
    const updatedQuestion = await Question.findByIdAndUpdate(id, body, {
      new: true,
      runValidation: true,
    });
    res.json({ updatedQuestion });
  } catch (e) {
    res.status(500).json(e);
  }
};

questionsCltr.remove = async (req, res) => {
  const id = req.params.id;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const removeQuestion = await Question.findByIdAndDelete(id);
    res.json(removeQuestion);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = questionsCltr;
