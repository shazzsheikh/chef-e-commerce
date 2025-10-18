const mongoose = require("mongoose");

const getintouchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true],
  },
  email: {
    type: String,
    required: [true],
  },
  phonenumber: {
    type: Number,
    required: [true],
  },
  companyname: {
    type: String,
    required: [true],
  },
  message: {
    type: String,
    required: [true],
  },
});

module.exports = mongoose.model("Getintouch", getintouchSchema);
