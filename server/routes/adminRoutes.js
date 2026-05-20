const express = require('express');
const {
  getClients,
  getClientById,
  removeClient,
  getStats,
} = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/clients', adminMiddleware, getClients);
router.get('/clients/:id', adminMiddleware, getClientById);
router.delete('/clients/:id', adminMiddleware, removeClient);
router.get('/stats', adminMiddleware, getStats);

module.exports = router;
