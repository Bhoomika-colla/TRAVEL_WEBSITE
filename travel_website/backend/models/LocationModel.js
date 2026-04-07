const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Location title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    state: {
      type: String,
      default: "",
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["resort", "hotel", "villa", "homestay", "destination"],
      default: "resort",
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    gallery: {
      type: [String],
      default: [],
    },
    pricePerNight: {
      type: Number,
      required: [true, "Price per night is required"],
      min: 0,
    },
    maxGuests: {
      type: Number,
      required: [true, "Max guests is required"],
      min: 1,
    },
    totalRooms: {
      type: Number,
      default: 1,
      min: 1,
    },
    amenities: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Location || mongoose.model("Location", locationSchema);
