const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
  electionId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Candidate", candidateSchema);
