// const responseSchema = new Schema({
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//     quiz: {
//       type: Schema.Types.ObjectId,
//       ref: "Quiz",
//     },
//     quesions: {
//       type: [{ selection: ObjectId, correct: Boolean }],
//     },
//     Score: Number,
//   });

const quiz = {
  notEmpty: {
    errorMessage: "quiz is required",
    bail: true,
  },
  isMongoId: {
    errorMessage: "invalid mongoid",
  },
};

const score = {
  notEmpty: {
    errorMessage: "score required",
    bail: true,
  },
  isNumeric: {
    errorMessage: "score should be  Number type",
  },
};

const questions = {
  isArray: {
    errorMessage: "question must e array of object",
  },
};

const responseValidation = {
  quiz,
  score,
  questions
};

const resIdvalidation = {
    responseId: {
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


module.exports={responseValidation,resIdvalidation}