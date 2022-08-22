const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Result = new Schema(
  {
    w_0: { type: Number, require: false },
    w_1: { type: Number, require: false },
    weight: { type: Number, require: false },
    userName: { type: String, require: false },
    height: { type: Number, require: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Result", Result);
