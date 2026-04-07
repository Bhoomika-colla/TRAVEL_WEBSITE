const mongoose = require("mongoose");
const Booking = require("../models/BookingModel");
const Location = require("../models/LocationModel");

const calculateNights = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = end.getTime() - start.getTime();
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return nights;
};

const generateBookingCode = () => {
  return `BK-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
};

const createBooking = async (req, res) => {
  try {
    const { locationId } = req.params;
    const {
      fullName,
      email,
      phone,
      checkIn,
      checkOut,
      numberOfGuests,
      numberOfRooms,
      specialRequests,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(locationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid location id.",
      });
    }

    const location = await Location.findById(locationId);
    if (!location || location.status !== "active") {
      return res.status(404).json({
        success: false,
        message: "Location not found.",
      });
    }

    const totalNights = calculateNights(checkIn, checkOut);

    if (totalNights < 1) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date.",
      });
    }

    if (Number(numberOfGuests) > Number(location.maxGuests)) {
      return res.status(400).json({
        success: false,
        message: `Maximum ${location.maxGuests} guests are allowed for this location.`,
      });
    }

    const totalPrice =
      Number(location.pricePerNight) *
      Number(totalNights) *
      Number(numberOfRooms || 1);

    const booking = await Booking.create({
      user: req.user._id,
      location: location._id,
      bookingCode: generateBookingCode(),
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      checkIn,
      checkOut,
      numberOfGuests: Number(numberOfGuests),
      numberOfRooms: Number(numberOfRooms || 1),
      totalNights,
      pricePerNight: Number(location.pricePerNight),
      totalPrice,
      specialRequests: String(specialRequests || "").trim(),
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate("user", "fullName email")
      .populate("location", "title city country image pricePerNight");

    return res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      booking: populatedBooking,
    });
  } catch (error) {
    console.log("Error in createBooking:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create booking.",
      error: error.message,
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("location", "title city country image pricePerNight")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.log("Error in getMyBookings:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings.",
      error: error.message,
    });
  }
};

const getSingleBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking id.",
      });
    }

    const booking = await Booking.findById(id)
      .populate("user", "fullName email")
      .populate(
        "location",
        "title city country image pricePerNight shortDescription",
      );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    const isOwner = String(booking.user._id) === String(req.user._id);
    const isSuperAdmin = req.user.role === "superadmin";

    if (!isOwner && !isSuperAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to view this booking.",
      });
    }

    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.log("Error in getSingleBooking:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch booking.",
      error: error.message,
    });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      email,
      phone,
      checkIn,
      checkOut,
      numberOfGuests,
      numberOfRooms,
      specialRequests,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking id.",
      });
    }

    const booking = await Booking.findById(id).populate("location");
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    if (String(booking.user) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this booking.",
      });
    }

    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cancelled booking cannot be updated.",
      });
    }

    const totalNights = calculateNights(checkIn, checkOut);

    if (totalNights < 1) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date.",
      });
    }

    if (Number(numberOfGuests) > Number(booking.location.maxGuests)) {
      return res.status(400).json({
        success: false,
        message: `Maximum ${booking.location.maxGuests} guests are allowed for this location.`,
      });
    }

    booking.fullName = String(fullName).trim();
    booking.email = String(email).trim().toLowerCase();
    booking.phone = String(phone).trim();
    booking.checkIn = checkIn;
    booking.checkOut = checkOut;
    booking.numberOfGuests = Number(numberOfGuests);
    booking.numberOfRooms = Number(numberOfRooms || 1);
    booking.totalNights = totalNights;
    booking.totalPrice =
      Number(booking.pricePerNight) *
      Number(totalNights) *
      Number(numberOfRooms || 1);
    booking.specialRequests = String(specialRequests || "").trim();

    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate("user", "fullName email")
      .populate("location", "title city country image pricePerNight");

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully.",
      booking: updatedBooking,
    });
  } catch (error) {
    console.log("Error in updateBooking:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update booking.",
      error: error.message,
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking id.",
      });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    if (String(booking.user) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to cancel this booking.",
      });
    }

    booking.bookingStatus = "cancelled";
    booking.cancelledAt = new Date();

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully.",
      booking,
    });
  } catch (error) {
    console.log("Error in cancelBooking:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to cancel booking.",
      error: error.message,
    });
  }
};

const getAllBookingsForAdmin = async (_req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user", "fullName email role")
      .populate("location", "title city country")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.log("Error in getAllBookingsForAdmin:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings.",
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getSingleBooking,
  updateBooking,
  cancelBooking,
  getAllBookingsForAdmin,
};
