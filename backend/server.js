const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const InstructionPDF = require("./models/InstructionPDF");

// Routes imports
const adminRoutes = require("./routes/adminLoginRoute");
const studentRoutes = require("./routes/studentRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const voteRoute = require("./routes/vote");
const electionRoutes = require("./routes/election");
const nomineeRoutes = require("./routes/nomineeRoute");

const app = express();

// ✅ Increase payload limit to 50MB
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cors());

// ✅ Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ DB connection
mongoose.connect("mongodb://localhost:27017/collegeVoting", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ✅ Multer config for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
});

// ✅ Upload PDF and save to MongoDB
app.post("/api/admin/uploadPDF", upload.single("pdf"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const filePath = `/uploads/${req.file.filename}`;

  try {
    const newPDF = new InstructionPDF({ filePath });
    await newPDF.save();

    res.status(200).json({
      message: "File uploaded and saved to DB",
      filePath: filePath,
    });
  } catch (err) {
    console.error("Error saving to DB:", err);
    res.status(500).json({ error: "Failed to save file info to DB" });
  }
});

// ✅ Fetch latest PDF path from MongoDB
app.get("/api/admin/getPDF", async (req, res) => {
  try {
    const latestPDF = await InstructionPDF.findOne().sort({ uploadedAt: -1 });

    if (!latestPDF) {
      return res.status(404).json({ message: "No PDF found" });
    }

    res.status(200).json({ filePath: latestPDF.filePath });
  } catch (error) {
    console.error("Error fetching PDF:", error);
    res.status(500).json({ error: "Failed to retrieve PDF from DB" });
  }
});

// ✅ Other routes
app.use("/api", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/vote", voteRoute);
app.use("/api/election", electionRoutes);
app.use("/api/nominee", nomineeRoutes); // ✅ MOUNT NOMINEE ROUTE

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
