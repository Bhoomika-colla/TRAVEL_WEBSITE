import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/common_components/Header";
import Footer from "./components/common_components/Footer";

import Homepage from "./pages/common_pages/Homepage";
import AboutUs from "./pages/common_pages/AboutUs";
import ContactUs from "./pages/contact_pages/ContactUs";

import Login from "./pages/user_pages/Login";
import Register from "./pages/user_pages/Register";
import ForgotPassword from "./pages/user_pages/ForgotPassword";
import ResetPassword from "./pages/user_pages/ResetPassword";
import Profile from "./pages/user_pages/Profile";
import UpdateProfile from "./pages/user_pages/UpdateProfile";
import AllUsers from "./pages/user_pages/AllUsers";
import UpdateRole from "./pages/user_pages/UpdateRole";

import AllContactMessages from "./pages/contact_pages/AllContactMessages";
import SingleContactMessage from "./pages/contact_pages/SingleContactMessage";

import CreateLocation from "./pages/location_pages/CreateLocation";
import ViewAllLocations from "./pages/location_pages/ViewAllLocations";
import SingleCreatedLocation from "./pages/location_pages/SingleCreatedLocation";
import UpdateLocation from "./pages/location_pages/UpdateLocation";
import AllLocations from "./pages/location_pages/AllLocations";
import SingleLocation from "./pages/location_pages/SingleLocation";

import ViewMyBookings from "./pages/booking_pages/ViewMyBookings";
import EditBookings from "./pages/booking_pages/EditBookings";
import CancelBooking from "./pages/booking_pages/CancelBooking";
import SingleBookingDetails from "./pages/booking_pages/SingleBookingDetails";

import {
  AuthProvider,
  PrivateRoute,
  AdminRoute,
  PublicRoute,
} from "./managers/AuthManager";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="w-full bg-slate-950 text-white">
          <Header />

          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />

            <Route path="/locations" element={<AllLocations />} />
            <Route path="/locations/:id" element={<SingleLocation />} />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />
            <Route
              path="/reset-password/:token"
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/update-profile"
              element={
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <PrivateRoute>
                  <ViewMyBookings />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-bookings/:id"
              element={
                <PrivateRoute>
                  <SingleBookingDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-booking/:id"
              element={
                <PrivateRoute>
                  <EditBookings />
                </PrivateRoute>
              }
            />
            <Route
              path="/cancel-booking/:id"
              element={
                <PrivateRoute>
                  <CancelBooking />
                </PrivateRoute>
              }
            />

            <Route
              path="/all-users"
              element={
                <AdminRoute>
                  <AllUsers />
                </AdminRoute>
              }
            />
            <Route
              path="/update-role/:id"
              element={
                <AdminRoute>
                  <UpdateRole />
                </AdminRoute>
              }
            />
            <Route
              path="/all-contact-messages"
              element={
                <AdminRoute>
                  <AllContactMessages />
                </AdminRoute>
              }
            />
            <Route
              path="/contact-messages/:id"
              element={
                <AdminRoute>
                  <SingleContactMessage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/create-location"
              element={
                <AdminRoute>
                  <CreateLocation />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/all-locations"
              element={
                <AdminRoute>
                  <ViewAllLocations />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/location/:id"
              element={
                <AdminRoute>
                  <SingleCreatedLocation />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/update-location/:id"
              element={
                <AdminRoute>
                  <UpdateLocation />
                </AdminRoute>
              }
            />
          </Routes>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
