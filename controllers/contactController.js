const Contact = require('../models/Contact');

// POST - Create Contact
const axios = require('axios');
 // adjust path as needed

exports.createContact = async (req, res) => {
  try {
    const { name, email, number, subject, information } = req.body;

    // 1. Save contact in database
    const contact = new Contact({ name, email, number, subject, information });
    await contact.save();

    // 2. Send email using Resend API
    await axios.post(
      'https://api.resend.com/emails',
      {
        from: 'onboarding@resend.dev', // Resend default sender
        to: 'rainasirsultan123@gmail.com', // Change to your admin or notification email
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Number:</strong> ${number}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${information}</p>
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(201).json({ message: 'Contact submitted and email sent successfully.', contact });
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to submit contact or send email.',
      details: error.response?.data || error.message,
    });
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
