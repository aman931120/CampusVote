// backend/routes/nominationRoutes.js

const express = require("express");
const router = express.Router();
const Nominee = require("../models/Nominee");
const multer = require("multer");
const path = require("path");

// Storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route: POST /api/nomination
router.post(
  "/",
  upload.fields([
    { name: "manifesto", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { name, position, passoutYear, email } = req.body;
      const manifestoPath = req.files.manifesto?.[0].path;
      const imagePath = req.files.image?.[0].path;

      const newNominee = new Nominee({
        name,
        position,
        passoutYear,
        email,
        manifesto: manifestoPath,
        image: imagePath,
      });

      await newNominee.save();
      res.status(201).json({ message: "Nomination submitted successfully!" });
    } catch (err) {
      console.error("Error saving nomination:", err);
      res.status(500).json({ error: "Failed to submit nomination." });
    }
  }
);

module.exports = router;
