const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    taskname: { type: String, required: true },
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Todotask = mongoose.model("Todotask", todoSchema);

module.exports = Todotask;
