const Project = require('../models/Project');

exports.getClientProjects = async (req, res) => {
  try {
    const projects = await Project.find({ clientId: req.user.id }).sort({ createdAt: -1 });
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.getById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Projet introuvable.' });

    if (project.clientId.toString() !== req.user.id && !req.isAdmin) {
      return res.status(403).json({ message: 'Accès refusé.' });
    }

    res.json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.create = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.update = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ message: 'Projet introuvable.' });
    res.json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.delete = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Projet introuvable.' });
    res.json({ message: 'Projet supprimé.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { progress } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { progress },
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ message: 'Projet introuvable.' });
    res.json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const projects = await Project.find().populate('clientId', 'name email').sort({ createdAt: -1 });
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
