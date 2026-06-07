const express = require('express');
const {
  getAll,
  getById,
  create,
  update,
  remove,
  uploadImage,
  uploadFile,
  getUploads,
  deleteUpload,
} = require('../controllers/portfolioController');
const adminMiddleware = require('../middleware/adminMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', adminMiddleware, create);
router.put('/:id', adminMiddleware, update);
router.delete('/:id', adminMiddleware, remove);
router.post('/upload', adminMiddleware, upload.single('image'), uploadImage);
router.post('/upload-file', adminMiddleware, upload.single('file'), uploadFile);
router.get('/uploads/list', adminMiddleware, getUploads);
router.delete('/uploads/:filename', adminMiddleware, deleteUpload);

module.exports = router;
