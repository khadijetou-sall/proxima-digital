const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const adminMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Accès non autorisé.' });
  }

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(403).json({ message: 'Accès réservé aux administrateurs.' });
    }

    req.admin = { id: admin._id.toString(), name: admin.name, email: admin.email, role: admin.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide.' });
  }
};

module.exports = adminMiddleware;
