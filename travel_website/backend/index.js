const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const userRoutes = require("./routes/UserRoutes");
const contactRoutes = require("./routes/ContactRoutes");
const locationRoutes = require("./routes/LocationRoutes");
const bookingRoutes = require("./routes/BookingRoutes");

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Travel Website Backend API is running successfully.",
  });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy.",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

app.use((err, _req, res, _next) => {
  console.error("GLOBAL SERVER ERROR:", err);

  return res.status(500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
});

const DATABASE_URL =
  process.env.DATABASE || "mongodb://127.0.0.1:27017/travel_website";
const PORT = process.env.PORT || 3111;

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully.");

    app.listen(PORT, () => {
      console.log(`Travel website server running successfully on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connection to MongoDB failed:", err);
    process.exit(1);
  });
