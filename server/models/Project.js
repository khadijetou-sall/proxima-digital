const mongoose = require('mongoose');

const deliverableSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['image', 'file', 'link'], required: true },
  filePath: { type: String, default: '' },
  url: { type: String, default: '' },
  size: { type: String, default: '' },
  date: { type: String, default: '' },
}, { _id: true });

const stepSchema = new mongoose.Schema({
  label: { type: String, required: true },
  done: { type: Boolean, default: false },
}, { _id: false });

const projectSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Le nom du projet est requis'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['pack', 'custom'],
    default: 'custom',
  },
  pack: {
    type: String,
    enum: ['Starter', 'Business', 'Premium', null],
    default: null,
  },
  customDescription: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  startDate: {
    type: String,
    default: '',
  },
  deadline: {
    type: String,
    default: '',
  },
  steps: {
    type: [stepSchema],
    default: [
      { label: 'Brief & Analyse', done: false },
      { label: 'Design', done: false },
      { label: 'Développement', done: false },
      { label: 'Finalisation', done: false },
    ],
  },
  deliverables: {
    type: [deliverableSchema],
    default: [],
  },
  notes: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', projectSchema);
