const title = {
  notEmpty: {
    errorMessage: "question is required",
    bail: true,
  },
  isLength: {
    options: {
      min: 10,
    },
    errorMessage: "question length should be minimum 10 characters",
  },
};

const type = {
  notEmpty: {
    errorMessage: "type is required",
    bail: true,
  },
  //   isIn: {
  //     values: ["multiplechoice", "singlechoice"],
  //     errorMessage: "select either multiple-choice or single-choice",
  //   },
};

const options = {
  isArray: {
    options: {
      min: 2,
    },
    errorMessage: "minimum two options are required",
  },
};

const tags = {
  isArray: {
    min: 1,
  },
  errorMessage: "minimum on etag is required for question",
};

const score = {
  isNumeric: {
    errorMessage: "please mention the score for the question",
  },
};

const questionValidation = {
  title,
  type,
  options,
  tags,
  score,
};

const questionIdValidation = {
  questionId: {
    in: ["params"],
    notEmpty: {
      errorMessage: "poll id is required",
    },
    isMongoId: {
      errorMessage: "should be a valid id",
    },
  },
};

module.exports = {
  questionValidation,
  questionIdValidation,
};
