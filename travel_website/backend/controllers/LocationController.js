const mongoose = require("mongoose");
const Location = require("../models/LocationModel");
const Booking = require("../models/BookingModel");

const normalizeSlug = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const parseStringArray = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const createLocation = async (req, res) => {
  try {
    const {
      title,
      country,
      state,
      city,
      address,
      shortDescription,
      description,
      category,
      image,
      gallery,
      pricePerNight,
      maxGuests,
      totalRooms,
      amenities,
      status,
      isFeatured,
    } = req.body;

    if (
      !title ||
      !country ||
      !city ||
      !shortDescription ||
      !description ||
      pricePerNight === undefined ||
      maxGuests === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, country, city, short description, description, price per night and max guests are required.",
      });
    }

    const slug = normalizeSlug(title);

    const existingLocation = await Location.findOne({ slug });
    if (existingLocation) {
      return res.status(400).json({
        success: false,
        message: "A location with this title already exists.",
      });
    }

    const locationPayload = {
      title: String(title).trim(),
      slug,
      country: String(country).trim(),
      state: String(state || "").trim(),
      city: String(city).trim(),
      address: String(address || "").trim(),
      shortDescription: String(shortDescription).trim(),
      description: String(description).trim(),
      category: String(category || "resort").trim(),
      image: String(image || "").trim(),
      gallery: parseStringArray(gallery),
      pricePerNight: Number(pricePerNight),
      maxGuests: Number(maxGuests),
      totalRooms: Number(totalRooms || 1),
      amenities: parseStringArray(amenities),
      status: String(status || "active").trim(),
      isFeatured:
        isFeatured === true ||
        isFeatured === "true" ||
        isFeatured === 1 ||
        isFeatured === "1",
    };

    const location = await Location.create(locationPayload);

    return res.status(201).json({
      success: true,
      message: "Location created successfully.",
      location,
    });
  } catch (error) {
    console.log("Error in createLocation:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create location.",
      error: error.message,
    });
  }
};

const getAllLocations = async (_req, res) => {
  try {
    const locations = await Location.find({ status: "active" }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: locations.length,
      locations,
    });
  } catch (error) {
    console.log("Error in getAllLocations:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch locations.",
      error: error.message,
    });
  }
};

const getAllLocationsForAdmin = async (_req, res) => {
  try {
    const locations = await Location.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: locations.length,
      locations,
    });
  } catch (error) {
    console.log("Error in getAllLocationsForAdmin:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch locations.",
      error: error.message,
    });
  }
};

const getSingleLocation = async (req, res) => {
  try {
    const { id } = req.params;

    let location = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      location = await Location.findById(id);
    }

    if (!location) {
      location = await Location.findOne({ slug: id });
    }

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found.",
      });
    }

    return res.status(200).json({
      success: true,
      location,
    });
  } catch (error) {
    console.log("Error in getSingleLocation:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch location.",
      error: error.message,
    });
  }
};

const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid location id.",
      });
    }

    const existingLocation = await Location.findById(id);
    if (!existingLocation) {
      return res.status(404).json({
        success: false,
        message: "Location not found.",
      });
    }

    const updateData = { ...req.body };

    if (updateData.title) {
      updateData.title = String(updateData.title).trim();
      updateData.slug = normalizeSlug(updateData.title);
    }

    if (updateData.country !== undefined) {
      updateData.country = String(updateData.country).trim();
    }

    if (updateData.state !== undefined) {
      updateData.state = String(updateData.state).trim();
    }

    if (updateData.city !== undefined) {
      updateData.city = String(updateData.city).trim();
    }

    if (updateData.address !== undefined) {
      updateData.address = String(updateData.address).trim();
    }

    if (updateData.shortDescription !== undefined) {
      updateData.shortDescription = String(updateData.shortDescription).trim();
    }

    if (updateData.description !== undefined) {
      updateData.description = String(updateData.description).trim();
    }

    if (updateData.image !== undefined) {
      updateData.image = String(updateData.image).trim();
    }

    if (updateData.gallery !== undefined) {
      updateData.gallery = parseStringArray(updateData.gallery);
    }

    if (updateData.amenities !== undefined) {
      updateData.amenities = parseStringArray(updateData.amenities);
    }

    if (updateData.pricePerNight !== undefined) {
      updateData.pricePerNight = Number(updateData.pricePerNight);
    }

    if (updateData.maxGuests !== undefined) {
      updateData.maxGuests = Number(updateData.maxGuests);
    }

    if (updateData.totalRooms !== undefined) {
      updateData.totalRooms = Number(updateData.totalRooms);
    }

    if (updateData.isFeatured !== undefined) {
      updateData.isFeatured =
        updateData.isFeatured === true ||
        updateData.isFeatured === "true" ||
        updateData.isFeatured === 1 ||
        updateData.isFeatured === "1";
    }

    const location = await Location.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Location updated successfully.",
      location,
    });
  } catch (error) {
    console.log("Error in updateLocation:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update location.",
      error: error.message,
    });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid location id.",
      });
    }

    const location = await Location.findByIdAndDelete(id);
    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found.",
      });
    }

    await Booking.deleteMany({ location: id });

    return res.status(200).json({
      success: true,
      message: "Location deleted successfully.",
    });
  } catch (error) {
    console.log("Error in deleteLocation:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete location.",
      error: error.message,
    });
  }
};

module.exports = {
  createLocation,
  getAllLocations,
  getAllLocationsForAdmin,
  getSingleLocation,
  updateLocation,
  deleteLocation,
};
