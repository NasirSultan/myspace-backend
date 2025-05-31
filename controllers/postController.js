const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { title, explanation } = req.body;
    const file = req.file;

    if (!title || !explanation || !file) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newPost = await Post.create({
      title,
      explanation,
      fileUrl: `/uploads/${file.filename}`
    });

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
