const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  number: { type: String, trim: true },
  subject: { type: String, required: true, trim: true },
  information: { type: String, required: true, trim: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);
