// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const adminRoutes = require("./routes/adminLoginRoute");

const app = express();

// ✅ Increase payload limit to 50MB
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect("mongodb://localhost:27017/collegeVoting", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Routes
app.use("/api", adminRoutes);


const studentRoutes = require("./routes/studentRoutes");
app.use("/api/student", studentRoutes);

// ✅ CommonJS syntax
const candidateRoutes = require("./routes/candidateRoutes");
app.use("/api/candidates", candidateRoutes);

const voteRoute = require("./routes/vote");
app.use('/api/vote', voteRoute); // Now your frontend can POST to /api/vote


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
