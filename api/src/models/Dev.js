const mongoose = require("mongoose");
const pointSchema = require("./utils/PointSchema");

const devSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: pointSchema,
    index: "2dsphere"
  },
  password: String
});

module.exports = mongoose.model("dev", devSchema);
