const express = require('express');
const {
  getProjectDeliverables,
  create,
  remove,
  download,
} = require('../controllers/deliverableController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/project/:projectId', authMiddleware, getProjectDeliverables);
router.post('/', adminMiddleware, upload.single('file'), create);
router.delete('/:id', adminMiddleware, remove);
router.get('/download/:id', authMiddleware, download);

module.exports = router;
