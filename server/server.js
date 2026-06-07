const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const deliverableRoutes = require('./routes/deliverableRoutes');
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const adminRoutes = require('./routes/adminRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/deliverables', deliverableRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/portfolio', portfolioRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve frontend in production (single-server deployment)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      res.sendFile(path.join(__dirname, '../dist', 'index.html'));
    }
  });
}

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });
}).catch((err) => {
  console.error('Erreur de connexion à MongoDB:', err.message);
  process.exit(1);
});
