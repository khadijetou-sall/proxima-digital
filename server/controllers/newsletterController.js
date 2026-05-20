const NewsletterSubscriber = require('../models/NewsletterSubscriber');

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      if (existing.subscribed) {
        return res.status(400).json({ message: 'Cet email est déjà abonné.' });
      }
      existing.subscribed = true;
      existing.subscribedAt = new Date();
      existing.unsubscribedAt = null;
      await existing.save();
      return res.json({ message: 'Vous êtes de nouveau abonné.' });
    }

    await NewsletterSubscriber.create({ email });
    res.status(201).json({ message: 'Inscription réussie à la newsletter.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const subscriber = await NewsletterSubscriber.findOne({ email });
    if (!subscriber) {
      return res.status(404).json({ message: 'Email non trouvé.' });
    }

    subscriber.subscribed = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    res.json({ message: 'Vous êtes désabonné de la newsletter.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const subscribers = await NewsletterSubscriber.find().sort({ subscribedAt: -1 });
    res.json({ subscribers });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.remove = async (req, res) => {
  try {
    const subscriber = await NewsletterSubscriber.findByIdAndDelete(req.params.id);
    if (!subscriber) return res.status(404).json({ message: 'Abonné introuvable.' });
    res.json({ message: 'Abonné supprimé.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
