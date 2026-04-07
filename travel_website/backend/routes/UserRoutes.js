const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  updateUserRole,
} = require("../controllers/UserController");

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

router.get("/me", isAuthenticatedUser, getMyProfile);
router.put("/update-profile", isAuthenticatedUser, updateMyProfile);

router.get(
  "/all-users",
  isAuthenticatedUser,
  authorizeRoles("superadmin"),
  getAllUsers,
);

router.put(
  "/update-role/:id",
  isAuthenticatedUser,
  authorizeRoles("superadmin"),
  updateUserRole,
);

module.exports = router;
