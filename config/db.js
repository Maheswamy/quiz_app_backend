const mongoose = require("mongoose");

const configration = async () => {
  const url = process.env.DB_URL || "mongodb://127.0.0.1:27017";
  const name = process.env.DB_NAME || "quizz_app";
  try {
    const connect = await mongoose.connect(`${url}/${name}`);
    console.log("server connected to mongodb");
  } catch (e) {
    console.log(e);
  }
};

module.exports = configration;
