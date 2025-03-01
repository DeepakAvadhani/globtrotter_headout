const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  continent: { type: String, required: true },
  clues: [{ type: String, required: true }],
  funFacts: [{ type: String, required: true }],
  trivia: [{ type: String, required: true }],
  image: { type: String },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium",
  },
});

module.exports = mongoose.model("Destination", destinationSchema);
