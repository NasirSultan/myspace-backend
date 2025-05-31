const Post = require('../models/Post');
const fs = require('fs').promises;
const path = require('path');

exports.createPost = async (req, res) => {
  try {
    const { title, explanation } = req.body;
    const file = req.file;

    if (!title || !explanation || !file) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // ✅ Write file temporarily to /tmp (Vercel-safe)
    const tmpFilePath = path.join('/tmp', file.originalname);
    await fs.writeFile(tmpFilePath, file.buffer);

    // Store path or just the original filename
    const newPost = await Post.create({
      title,
      explanation,
      fileUrl: tmpFilePath // Optional: upload to Cloudinary or S3 for permanent storage
    });

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('createPost error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    // ✅ Write log of headers to /tmp
    const logPath = path.join('/tmp', 'request-log.txt');
    await fs.writeFile(logPath, JSON.stringify(req.headers, null, 2), 'utf-8');

    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error('getAllPosts error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
