// {
//     title: String,
//     startDate: Date,
//     endDate: Date,
//     tags: {
//       type: Schema.Types.ObjectId,
//       ref: "Tag",
//     },
//     questions: {
//       type: [Schema.Types.ObjectId],
//       ref: "Question",
//     },
//     duration: Number,
//   },

const { isMongoId } = require("validator");

const title = {
  notEmpty: {
    errorMessage: "title is required",
    bail: true,
  },
  isLength: {
    options: {
      min: 10,
    },
    errorMessage: "title must be min 10 characters",
  },
};

const startDate = {
  notEmpty: {
    errorMessage: "Start Date is required",
    bail: true,
  },
  isDate: {
    errorMessage: "invalid date format",
  },
};

const endDate = {
  notEmpty: {
    errorMessage: "End Date is required",
    bail: true,
  },
  isDate: {
    errorMessage: "invalid date format",
  },
};

const tags = {
  isArray: {
    options: {
      min: 1,
    },
    errorMessage: "alteast one tags required",
  },
};

const questions = {
  isArray: {
    options: {
      min: 1,
    },
    errorMessage: "alteast one question should be present in quiz",
    bail: true,
  },
  custom: {
    options: async (value) => {
      const result = value.map((ele) => isMongoId(ele));
      const x = result.every((ele) => ele === true);
      if (x) {
        return true;
      } else {
        throw new Error("invalid mongoid");
      }
    },
  },
};

const duration = {
  notEmpty: {
    errorMessage: "duration is required",
  },
  isNumeric: {
    errorMessage: "duration should be in number",
  },
};

const quizValidation = {
  title,
  startDate,
  endDate,
  duration,
  tags,
  questions,
};

const quizIdvalidation = {
  quizId: {
    in: ["params"],
    notEmpty: {
      errorMessage: "poll id is required",
      bail:true
    },
    isMongoId: {
      errorMessage: "should be a valid id",
    },
  },
};

module.exports = { quizValidation, quizIdvalidation };
