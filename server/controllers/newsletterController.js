const nodemailer = require('nodemailer');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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

exports.sendCampaign = async (req, res) => {
  try {
    const { subject, html } = req.body;
    if (!subject || !html) {
      return res.status(400).json({ message: 'Sujet et contenu requis.' });
    }

    const subscribers = await NewsletterSubscriber.find({ subscribed: true });

    if (subscribers.length === 0) {
      return res.status(400).json({ message: 'Aucun abonné actif.' });
    }

    const results = { sent: 0, failed: 0, errors: [] };

    for (const sub of subscribers) {
      try {
        await transporter.sendMail({
          from: `"Proxima Digital" <${process.env.SMTP_FROM}>`,
          to: sub.email,
          subject,
          html,
        });
        results.sent++;
      } catch (err) {
        results.failed++;
        results.errors.push(sub.email);
      }
    }

    res.json({
      message: `Campagne terminée : ${results.sent} envoyé(s), ${results.failed} échec(s).`,
      results,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
