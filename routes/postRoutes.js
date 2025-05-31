const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const multer = require('multer');

// ✅ Use memory storage — required for Vercel
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/posts
router.post('/', upload.single('file'), postController.createPost);

// GET /api/posts
router.get('/', postController.getAllPosts);

module.exports = router;
