const express = require("express");
const router = express.Router();

const {
  createLocation,
  getAllLocations,
  getAllLocationsForAdmin,
  getSingleLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/LocationController");

const { requireSignIn, isSuperAdmin } = require("../middleware/authMiddleware");

router.get("/all-locations", getAllLocations);
router.get("/single-location/:id", getSingleLocation);

router.post("/create-location", requireSignIn, isSuperAdmin, createLocation);

router.get(
  "/admin/all-locations",
  requireSignIn,
  isSuperAdmin,
  getAllLocationsForAdmin,
);

router.put("/update-location/:id", requireSignIn, isSuperAdmin, updateLocation);

router.delete(
  "/delete-location/:id",
  requireSignIn,
  isSuperAdmin,
  deleteLocation,
);

module.exports = router;
