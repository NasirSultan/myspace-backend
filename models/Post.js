const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  explanation: { type: String, required: true, trim: true },
  fileUrl: { type: String, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
