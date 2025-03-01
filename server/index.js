const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
dotenv.config();

const destinationRoutes = require('./routes/destinationRoutes');
const userRoutes = require('./routes/userRoutes');
const challengeRoutes = require('./routes/challengeRoutes');

const app = express();

app.use(cors());
app.use(express.json());
const password = process.env.PASSWORD;
mongoose.connect(`mongodb+srv://deepakavadhani2:${password}@cluster0.sfp21.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/api/destinations', destinationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/challenges', challengeRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Welcome to the globtrotter game");
  });

module.exports = app;