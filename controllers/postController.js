const Post = require('../models/Post');
const fs = require('fs').promises;
const path = require('path');


const os = require('os');


exports.createPost = async (req, res) => {
  try {
    const { title, explanation } = req.body;
    const file = req.file;

    if (!title || !explanation || !file) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Use OS temp directory (cross-platform safe)
    const tmpDir = os.tmpdir();

    // Create a unique filename to avoid overwrites (optional)
    const uniqueFilename = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    const tmpFilePath = path.join(tmpDir, uniqueFilename);

    await fs.writeFile(tmpFilePath, file.buffer);

    // Save the path or filename in DB (consider storing only filename or URL for portability)
    const newPost = await Post.create({
      title,
      explanation,
      fileUrl: tmpFilePath
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
