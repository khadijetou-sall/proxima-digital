const express = require('express');
const {
  create,
  getAll,
  updateStatus,
  remove,
} = require('../controllers/contactController');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/', create);
router.get('/', adminMiddleware, getAll);
router.put('/:id/status', adminMiddleware, updateStatus);
router.delete('/:id', adminMiddleware, remove);

module.exports = router;
