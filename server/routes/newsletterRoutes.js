const express = require('express');
const {
  subscribe,
  unsubscribe,
  getAll,
  remove,
} = require('../controllers/newsletterController');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);
router.get('/', adminMiddleware, getAll);
router.delete('/:id', adminMiddleware, remove);

module.exports = router;
