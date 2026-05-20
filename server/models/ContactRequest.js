const mongoose = require('mongoose');

const contactRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    lowercase: true,
    trim: true,
  },
  projectType: {
    type: String,
    enum: ['site-web', 'application', 'branding', 'reseaux-sociaux', 'autre'],
    default: 'autre',
  },
  message: {
    type: String,
    required: [true, 'Le message est requis'],
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ContactRequest', contactRequestSchema);
