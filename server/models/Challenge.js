const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  inviteCode: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    expires: '7d'
  }
});

module.exports = mongoose.model('Challenge', challengeSchema);