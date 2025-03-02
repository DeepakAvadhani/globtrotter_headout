const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Destination = require('../models/Destinations');

router.get('/random', async (req, res) => {
  try {
    const count = await Destination.countDocuments();
    const random = Math.floor(Math.random() * count);
    
    const destination = await Destination.findOne().skip(random);
    
    res.json({
      id: destination._id,
      clues: destination.clues.slice(0, 2),
      difficulty: destination.difficulty
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/verify/:id', async (req, res) => {
  try {
    const { answer } = req.body;
    const destination = await Destination.findById(req.params.id);
    
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    
    const isCorrect = destination.city.toLowerCase() === answer.toLowerCase();
    
    res.json({
      isCorrect,
      destination: {
        name: destination.city,
        country: destination.country,
        continent: destination.continent,
        funFact: destination.fun_fact[Math.floor(Math.random() * destination.fun_fact.length)],
        ...(isCorrect && {
          clues: destination.clues,
          funFacts: destination.fun_fact,
          trivia: destination.trivia,
          image: destination.image
        })
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/options/:id', async (req, res) => {
  try {
    const correctDestination = await Destination.findById(req.params.id);
    
    if (!correctDestination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    
    const wrongOptions = await Destination.aggregate([
      { $match: { _id: { $ne: new mongoose.Types.ObjectId(req.params.id) } } },
      { $sample: { size: 4 } },
      { $project: { city: 1 } }
    ]);
    
    const options = [
      { name: correctDestination.name },
      ...wrongOptions
    ].sort(() => Math.random() - 0.5);
    
    res.json(options);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
