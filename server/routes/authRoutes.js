const express = require('express');
const {
  clientRegister,
  clientLogin,
  adminRegister,
  adminLogin,
  getMe,
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', clientRegister);
router.post('/login', clientLogin);
router.post('/admin/register', adminRegister);
router.post('/admin/login', adminLogin);
router.get('/me', authMiddleware, getMe);

module.exports = router;
