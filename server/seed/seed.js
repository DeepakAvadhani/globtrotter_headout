const mongoose = require("mongoose");
const Destination = require("../models/Destinations");
const fs = require("fs");
const dotenv = require('dotenv');

dotenv.config({path:"../.env"});

const rawData = fs.readFileSync("../data/data.json", "utf8");
const destinations = JSON.parse(rawData);
const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    await Destination.deleteMany({});
    console.log("Cleared old data");
    await Destination.insertMany(destinations);
    console.log("Seeding completed");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDB();
