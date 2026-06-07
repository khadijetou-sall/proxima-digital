const PortfolioProject = require('../models/PortfolioProject');
const fs = require('fs');
const path = require('path');

exports.getAll = async (req, res) => {
  try {
    const projects = await PortfolioProject.find().sort({ createdAt: -1 });
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.getById = async (req, res) => {
  try {
    const project = await PortfolioProject.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Projet introuvable.' });
    res.json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.create = async (req, res) => {
  try {
    const project = await PortfolioProject.create(req.body);
    res.status(201).json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.update = async (req, res) => {
  try {
    const project = await PortfolioProject.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ message: 'Projet introuvable.' });
    res.json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.remove = async (req, res) => {
  try {
    const project = await PortfolioProject.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Projet introuvable.' });
    res.json({ message: 'Projet supprimé.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Aucun fichier fourni.' });
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Aucun fichier fourni.' });
    const url = `/uploads/${req.file.filename}`;
    res.json({ name: req.file.originalname, url });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.getUploads = async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      return res.json({ files: [] });
    }
    const files = fs.readdirSync(uploadsDir).map((name) => {
      const stat = fs.statSync(path.join(uploadsDir, name));
      return {
        name,
        url: `/uploads/${name}`,
        size: stat.size,
        modifiedAt: stat.mtime,
      };
    });
    files.sort((a, b) => b.modifiedAt - a.modifiedAt);
    res.json({ files });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.deleteUpload = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);
    const resolvedPath = path.resolve(filePath);
    const uploadsDir = path.resolve(path.join(__dirname, '..', 'uploads'));
    if (!resolvedPath.startsWith(uploadsDir)) {
      return res.status(403).json({ message: 'Accès interdit.' });
    }
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Fichier introuvable.' });
    }
    fs.unlinkSync(filePath);
    res.json({ message: 'Fichier supprimé.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
