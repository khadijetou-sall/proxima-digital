const express = require('express');
const {
  getClientProjects,
  getById,
  create,
  update,
  delete: deleteProject,
  updateProgress,
  getAll,
} = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/client', authMiddleware, getClientProjects);
router.get('/all', adminMiddleware, getAll);
router.get('/:id', authMiddleware, getById);
router.post('/', adminMiddleware, create);
router.put('/:id/progress', adminMiddleware, updateProgress);
router.put('/:id', adminMiddleware, update);
router.delete('/:id', adminMiddleware, deleteProject);

module.exports = router;
