const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    bookingCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    checkIn: {
      type: Date,
      required: [true, "Check-in date is required"],
    },
    checkOut: {
      type: Date,
      required: [true, "Check-out date is required"],
    },
    numberOfGuests: {
      type: Number,
      required: [true, "Number of guests is required"],
      min: 1,
    },
    numberOfRooms: {
      type: Number,
      default: 1,
      min: 1,
    },
    totalNights: {
      type: Number,
      required: [true, "Total nights is required"],
      min: 1,
    },
    pricePerNight: {
      type: Number,
      required: [true, "Price per night is required"],
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: 0,
    },
    specialRequests: {
      type: String,
      default: "",
      trim: true,
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
