const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');
const User = require('../models/User');
const crypto = require('crypto');

router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const inviteCode = crypto.randomBytes(4).toString('hex');
    
    const challenge = new Challenge({
      createdBy: userId,
      inviteCode
    });
    
    await challenge.save();
    
    res.status(201).json({
      inviteCode,
      shareUrl: `${process.env.FRONTEND_URL}/challenge/${inviteCode}`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:inviteCode', async (req, res) => {
  try {
    const challenge = await Challenge.findOne({ 
      inviteCode: req.params.inviteCode 
    }).populate('createdBy');
    
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    res.json({
      challenge,
      creator: {
        username: challenge.createdBy.username,
        score: challenge.createdBy.score
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;