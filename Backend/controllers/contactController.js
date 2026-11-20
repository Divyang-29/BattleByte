const {
  createContactMessage,
  getAllContactMessages,
} = require("../models/contactModel");

/* PUBLIC - SEND MESSAGE */
const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, phone, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Name, email, subject and message are required",
      });
    }

    const newMessage = await createContactMessage(
      name,
      email,
      subject,
      phone || null,
      message
    );

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ADMIN - VIEW MESSAGES */
const fetchContactMessages = async (req, res) => {
  try {
    const messages = await getAllContactMessages();

    res.json({
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendContactMessage,
  fetchContactMessages,
};