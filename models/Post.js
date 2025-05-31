const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  explanation: { type: String, required: true },
  fileUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
