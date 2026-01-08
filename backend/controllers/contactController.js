const Contact = require('../models/Contact');

// POST /api/contact
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    console.log('Contact form data received:', { name, email, subject, message });
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const contact = new Contact({ name, email, subject, message });
    await contact.save();
    res.status(201).json({ message: 'Your message has been received. Thank you!' });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ error: 'An error occurred while submitting the form.' });
  }
}; 