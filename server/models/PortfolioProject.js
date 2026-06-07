const mongoose = require('mongoose');

const portfolioProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
    trim: true,
  },
  category: {
    type: String,
    enum: ['Logo', 'Site Web', 'Application', 'Community Management', 'Branding', 'Design Graphique'],
    required: [true, 'La catégorie est requise'],
  },
  tags: {
    type: [String],
    default: [],
  },
  clientName: {
    type: String,
    default: '',
  },
  projectDate: {
    type: Date,
    default: '',
  },
  projectUrl: {
    type: String,
    default: '',
  },
  appUrl: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  images: {
    type: [String],
    default: [],
  },
  files: [{
    name: { type: String, required: true },
    url: { type: String, required: true },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PortfolioProject', portfolioProjectSchema);
