const Candidate = require("../models/Candidate.js");

// Save candidates for each position
const addCandidates = async (req, res) => {
  try {
    const { candidates } = req.body;

    // Save all candidates to DB
    for (const position in candidates) {
      const candidateList = candidates[position];
      for (const candidate of candidateList) {
        const newCandidate = new Candidate({
          position,
          name: candidate.name,
          image: candidate.image,
        });
        await newCandidate.save();
      }
    }

    res.status(201).json({ message: "Candidates saved successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save candidates." });
  }
};

// Get all candidates
const getCandidates = async (req, res) => {
  try {
    const allCandidates = await Candidate.find();
    res.status(200).json(allCandidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch candidates." });
  }
};

// Export both functions
module.exports = {
  addCandidates,
  getCandidates,
};
