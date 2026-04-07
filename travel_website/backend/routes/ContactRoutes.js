const express = require("express");
const router = express.Router();

const {
  createContactMessage,
  getAllContactMessages,
  getSingleContactMessage,
  markContactMessageAsRead,
} = require("../controllers/ContactController");

const { requireSignIn, isSuperAdmin } = require("../middleware/authMiddleware");

// public route
router.post("/create-contact-message", createContactMessage);

// superadmin only routes
router.get(
  "/all-contact-messages",
  requireSignIn,
  isSuperAdmin,
  getAllContactMessages,
);

router.get(
  "/single-message/:id",
  requireSignIn,
  isSuperAdmin,
  getSingleContactMessage,
);

router.patch(
  "/mark-as-read/:id",
  requireSignIn,
  isSuperAdmin,
  markContactMessageAsRead,
);

module.exports = router;
