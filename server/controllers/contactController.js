const ContactRequest = require('../models/ContactRequest');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');

const autoSubscribe = async (email) => {
  try {
    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      if (!existing.subscribed) {
        existing.subscribed = true;
        existing.subscribedAt = new Date();
        existing.unsubscribedAt = null;
        await existing.save();
      }
    } else {
      await NewsletterSubscriber.create({ email });
    }
  } catch {
    // silence auto-subscribe errors
  }
};

exports.create = async (req, res) => {
  try {
    const { name, email, projectType, message } = req.body;

    const contact = await ContactRequest.create({ name, email, projectType, message });

    await autoSubscribe(email);

    res.status(201).json({ message: 'Votre demande a été envoyée avec succès.', contact });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const contacts = await ContactRequest.find().sort({ createdAt: -1 });
    res.json({ contacts });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await ContactRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Demande introuvable.' });
    res.json({ contact });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.remove = async (req, res) => {
  try {
    const contact = await ContactRequest.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Demande introuvable.' });
    res.json({ message: 'Demande supprimée.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
