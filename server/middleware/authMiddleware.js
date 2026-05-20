const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Accès non autorisé.' });
  }

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = await User.findById(decoded.id);
    let isAdmin = false;

    if (!user) {
      user = await Admin.findById(decoded.id);
      if (user) isAdmin = true;
    }

    if (!user) {
      return res.status(401).json({ message: 'Utilisateur introuvable.' });
    }

    req.user = { id: user._id.toString(), name: user.name, email: user.email };
    req.isAdmin = isAdmin;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide.' });
  }
};

module.exports = authMiddleware;
