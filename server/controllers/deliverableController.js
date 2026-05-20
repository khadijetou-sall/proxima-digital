const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');

exports.getProjectDeliverables = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Projet introuvable.' });

    if (project.clientId.toString() !== req.user.id && !req.isAdmin) {
      return res.status(403).json({ message: 'Accès refusé.' });
    }

    res.json({ deliverables: project.deliverables });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.create = async (req, res) => {
  try {
    const { projectId, name, type, url } = req.body;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Projet introuvable.' });

    const deliverable = {
      name,
      type,
      filePath: req.file ? req.file.path : '',
      url: url || '',
      size: req.file ? (req.file.size / 1024 / 1024).toFixed(1) + ' Mo' : '',
      date: new Date().toLocaleDateString('fr-FR'),
    };

    project.deliverables.push(deliverable);
    await project.save();

    res.status(201).json({ deliverable: project.deliverables[project.deliverables.length - 1] });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.remove = async (req, res) => {
  try {
    const project = await Project.findOne({ 'deliverables._id': req.params.id });
    if (!project) return res.status(404).json({ message: 'Livrable introuvable.' });

    const deliverable = project.deliverables.id(req.params.id);
    if (deliverable.filePath && fs.existsSync(deliverable.filePath)) {
      fs.unlinkSync(deliverable.filePath);
    }

    project.deliverables.pull(req.params.id);
    await project.save();

    res.json({ message: 'Livrable supprimé.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.download = async (req, res) => {
  try {
    const project = await Project.findOne({ 'deliverables._id': req.params.id });
    if (!project) return res.status(404).json({ message: 'Livrable introuvable.' });

    const deliverable = project.deliverables.id(req.params.id);
    if (!deliverable || !deliverable.filePath || !fs.existsSync(deliverable.filePath)) {
      return res.status(404).json({ message: 'Fichier introuvable.' });
    }

    res.download(deliverable.filePath, deliverable.name + path.extname(deliverable.filePath));
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
