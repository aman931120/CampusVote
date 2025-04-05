// routes/candidateRoutes.js
const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidates"); // your candidate schema

// POST /api/candidates/add
router.post("/add", async (req, res) => {
  try {
    const { candidates } = req.body;

    if (!candidates || typeof candidates !== "object") {
      return res.status(400).json({ error: "Invalid candidates data" });
    }

    const allNewCandidates = [];

    for (const position in candidates) {
      const positionCandidates = candidates[position];

      if (!Array.isArray(positionCandidates)) continue;

      for (const candidate of positionCandidates) {
        const { name, image } = candidate;

        if (!name || !image) {
          return res.status(400).json({ error: "Missing name or image" });
        }

        const newCandidate = new Candidate({
          position,
          name,
          image,
          votes: 0, // default votes
        });

        await newCandidate.save();
        allNewCandidates.push(newCandidate);
      }
    }

    res
      .status(201)
      .json({ message: "All candidates added", candidates: allNewCandidates });
  } catch (err) {
    console.error("Error adding candidates:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/grouped", async (req, res) => {
  try {
    const candidates = await Candidate.find();

    // Grouping logic
    const grouped = {};
    candidates.forEach((candidate) => {
      const pos = candidate.position;
      if (!grouped[pos]) {
        grouped[pos] = [];
      }
      grouped[pos].push(candidate);
    });

    res.status(200).json(grouped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch candidates" });
  }
});


module.exports = router;
