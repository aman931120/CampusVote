const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  studentEmail: { type: String, required: true },
  position: { type: String, required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
  electionId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Vote", voteSchema);
