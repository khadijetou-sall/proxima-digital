const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.clientRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const user = await User.create({ name, email, password });
    const token = createToken(user._id);

    NewsletterSubscriber.findOne({ email }).then((existing) => {
      if (existing) {
        if (!existing.subscribed) {
          existing.subscribed = true;
          existing.subscribedAt = new Date();
          existing.unsubscribedAt = null;
          existing.save();
        }
      } else {
        NewsletterSubscriber.create({ email });
      }
    }).catch(() => {});

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.clientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    }

    const token = createToken(user._id);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.adminRegister = async (req, res) => {
  try {
    const { name, email, password, secretKey } = req.body;

    if (secretKey !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: 'Clé secrète invalide.' });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const admin = await Admin.create({ name, email, password, role: 'admin' });
    const token = createToken(admin._id);

    res.status(201).json({
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    }

    const token = createToken(admin._id);

    res.json({
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.getMe = async (req, res) => {
  try {
    if (req.isAdmin) {
      const admin = await Admin.findById(req.user.id);
      if (!admin) return res.status(404).json({ message: 'Administrateur introuvable.' });
      return res.json({ user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role, isAdmin: true } });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable.' });
    res.json({ user: { id: user._id, name: user.name, email: user.email, isAdmin: false } });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
