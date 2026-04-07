const mongoose = require("mongoose");
const Contact = require("../models/ContactModel");

const createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !String(name).trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    if (!email || !String(email).trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!phone || !String(phone).trim()) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required.",
      });
    }

    if (!message || !String(message).trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const contactMessage = await Contact.create({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      message: String(message).trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully.",
      contactMessage,
    });
  } catch (error) {
    console.log("Error in createContactMessage:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send contact message.",
      error: error.message,
    });
  }
};

const getAllContactMessages = async (_req, res) => {
  try {
    const messages = await Contact.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    console.log("Error in getAllContactMessages:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact messages.",
      error: error.message,
    });
  }
};

const getSingleContactMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact message id.",
      });
    }

    const message = await Contact.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    if (!message.isRead) {
      message.isRead = true;
      await message.save();
    }

    return res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.log("Error in getSingleContactMessage:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact message.",
      error: error.message,
    });
  }
};

const markContactMessageAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact message id.",
      });
    }

    const updatedMessage = await Contact.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true },
    );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact message marked as read.",
      contactMessage: updatedMessage,
    });
  } catch (error) {
    console.log("Error in markContactMessageAsRead:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update contact message.",
      error: error.message,
    });
  }
};

module.exports = {
  createContactMessage,
  getAllContactMessages,
  getSingleContactMessage,
  markContactMessageAsRead,
};
