const express = require("express");
const router = express.Router();
const Election = require("../models/Election");

router.post("/start", async (req, res) => {
  try {
    const lastElection = await Election.findOne().sort({ electionId: -1 });

    const newElectionId = lastElection ? lastElection.electionId + 1 : 1;

    const newElection = new Election({
      electionId: newElectionId,
      startDate: new Date(),
    });

    await newElection.save();

    res
      .status(201)
      .json({ message: "New election started", election: newElection });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to start new election" });
  }
});

module.exports = router;
