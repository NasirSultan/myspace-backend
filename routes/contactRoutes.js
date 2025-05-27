const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST /api/contact - submit contact
router.post('/', contactController.createContact);

// GET /api/contact - get all contacts (optional)
router.get('/', contactController.getContacts);

module.exports = router;
