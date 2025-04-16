// backend/models/Nominee.js
const mongoose = require("mongoose");

const nomineeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  passoutYear: { type: Number, required: true },
  email: { type: String, required: true },
  manifesto: { type: String }, // will store file path
  image: { type: String }, // will store file path
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Nominee", nomineeSchema);
