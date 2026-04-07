const express = require("express");
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  getSingleBooking,
  updateBooking,
  cancelBooking,
  getAllBookingsForAdmin,
} = require("../controllers/BookingController");

const { requireSignIn, isSuperAdmin } = require("../middleware/authMiddleware");

router.post("/create-booking/:locationId", requireSignIn, createBooking);
router.get("/my-bookings", requireSignIn, getMyBookings);
router.get("/single-booking/:id", requireSignIn, getSingleBooking);
router.put("/update-booking/:id", requireSignIn, updateBooking);
router.patch("/cancel-booking/:id", requireSignIn, cancelBooking);

router.get(
  "/admin/all-bookings",
  requireSignIn,
  isSuperAdmin,
  getAllBookingsForAdmin,
);

module.exports = router;
