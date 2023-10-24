const _ = require("lodash");
const Response = require("../models/reaponse-model");
const { validationResult } = require("express-validator");

const responseCltr = {};

responseCltr.create = async (req, res) => {
  const userId = req.user._id;
  const body = _.pick(req.body, ["quiz", "questions", "score"]);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    body.user = userId;
    const newResponse = await new Response(body).save();
    res.json(newResponse);
  } catch (e) {
    res.status(500).json(e);
  }
};

responseCltr.list = async (req, res) => {
  try {
    const allResponse = await Response.find();
    res.json(allResponse);
  } catch (e) {
    res.status(500).json(e);
  }
};

responseCltr.show = async (req, res) => {
  const id = req.params.responseId;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status().json({ errors: errors.array() });
    }

    const allResponse = await Response.findById(id);
    res.json(allResponse);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = responseCltr;
