const express = require("express");
const router = express.Router();
const Vote = require("../models/Vote"); // import Vote model
const Candidate = require("../models/Candidates.js"); // import Candidate model

router.post("/", async (req, res) => {
  const { candidateId, studentEmail, position } = req.body;

  try {
    const alreadyVoted = await Vote.findOne({ studentEmail, position });

    if (alreadyVoted) {
      return res
        .status(400)
        .json({ error: "You have already voted for this position." });
    }

    await Vote.create({ studentEmail, position, candidateId });

    await Candidate.findByIdAndUpdate(candidateId, { $inc: { voteCount: 1 } });

    res.status(200).json({ message: "Vote cast successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
