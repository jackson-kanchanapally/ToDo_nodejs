// Creating the Schema for the todo list...

const mongoose = require("mongoose");
const todoschema = new mongoose.Schema({
  record: { type: String, required: true },
  date: { type: Number, default: Date.now },
});
const model = mongoose.model("tasks", todoschema);
module.exports = model;
