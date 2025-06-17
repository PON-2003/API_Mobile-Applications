const express = require('express');
const router = express.Router();
const upload = require('../configs/multer'); // เพิ่ม multer

const {
  getAllUsers,
  addUser,
  getUserById,
  updateUserById,
  deleteUserById
} = require('../controllers/userController');

router.get('/getAllUsers', getAllUsers);
router.get('/getUserById/:id', getUserById);
router.post('/addUser', upload.single('image'), addUser); // รองรับอัปโหลดไฟล์ภาพ
router.put('/updateUserById/:id', upload.single('image'), updateUserById); // รองรับอัปโหลดไฟล์ภาพ
router.delete('/deleteUserById/:id', deleteUserById);

module.exports = router;
