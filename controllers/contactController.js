const Contact = require('../models/Contact');

// POST - Create Contact
exports.createContact = async (req, res) => {
  try {
    const { name, email, number, subject, information } = req.body;

    const contact = new Contact({ name, email, number, subject, information });
    await contact.save();

    res.status(201).json({ message: 'Contact submitted successfully.', contact });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit contact.', details: error.message });
  }
};

// GET - List All Contacts (Optional)
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts.' });
  }
};
