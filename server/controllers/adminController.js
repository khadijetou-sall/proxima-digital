const User = require('../models/User');
const Project = require('../models/Project');
const ContactRequest = require('../models/ContactRequest');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');

exports.getClients = async (req, res) => {
  try {
    const clients = await User.find().sort({ createdAt: -1 });
    const clientsWithProjectCount = await Promise.all(
      clients.map(async (client) => {
        const projectCount = await Project.countDocuments({ clientId: client._id });
        return { ...client.toObject(), projectCount };
      })
    );
    res.json({ clients: clientsWithProjectCount });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await User.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client introuvable.' });

    const projects = await Project.find({ clientId: client._id }).sort({ createdAt: -1 });
    res.json({ client, projects });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.removeClient = async (req, res) => {
  try {
    const client = await User.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client introuvable.' });

    await Project.deleteMany({ clientId: client._id });
    res.json({ message: 'Client et ses projets supprimés.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const [
      totalClients,
      totalProjects,
      inProgressProjects,
      completedProjects,
      pendingProjects,
      totalContacts,
      newContacts,
      totalSubscribers,
    ] = await Promise.all([
      User.countDocuments(),
      Project.countDocuments(),
      Project.countDocuments({ status: 'in-progress' }),
      Project.countDocuments({ status: 'completed' }),
      Project.countDocuments({ status: 'pending' }),
      ContactRequest.countDocuments(),
      ContactRequest.countDocuments({ status: 'new' }),
      NewsletterSubscriber.countDocuments({ subscribed: true }),
    ]);

    res.json({
      stats: {
        totalClients,
        totalProjects,
        inProgressProjects,
        completedProjects,
        pendingProjects,
        totalContacts,
        newContacts,
        totalSubscribers,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
