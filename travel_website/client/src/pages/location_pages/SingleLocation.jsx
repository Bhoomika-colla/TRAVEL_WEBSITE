import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../managers/AuthManager";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3111/api";

const SingleLocation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { api, user, isAuthenticated } = useAuth();

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    checkIn: "",
    checkOut: "",
    numberOfGuests: 1,
    numberOfRooms: 1,
    specialRequests: "",
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/locations/single-location/${id}`,
        );
        setLocation(res?.data?.location || null);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [id]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      fullName: user?.fullName || prev.fullName,
      email: user?.email || prev.email,
      phone: user?.phone || prev.phone,
    }));
  }, [user]);

  const totalNights = useMemo(() => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  }, [formData.checkIn, formData.checkOut]);

  const totalPrice = useMemo(() => {
    if (!location || totalNights < 1) return 0;
    return (
      Number(location.pricePerNight) *
      Number(totalNights) *
      Number(formData.numberOfRooms || 1)
    );
  }, [location, totalNights, formData.numberOfRooms]);

  const handleChange = (e) => {
    setSuccessMessage("");
    setErrorMessage("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBookNow = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      setBookingLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const res = await api.post(`/bookings/create-booking/${id}`, formData);

      setSuccessMessage(res?.data?.message || "Booking created successfully.");

      const bookingId = res?.data?.booking?._id;
      if (bookingId) {
        navigate(`/my-bookings/${bookingId}`);
      }
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Unable to create booking.",
      );
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-white">Loading...</div>;
  if (!location)
    return <div className="p-10 text-white">Location not found.</div>;

  return (
    <section className="px-4 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <img
            src={
              location.image ||
              "https://via.placeholder.com/800x500?text=Location"
            }
            alt={location.title}
            className="h-80 w-full rounded-3xl object-cover"
          />
          <h1 className="mt-6 text-4xl font-bold text-white">
            {location.title}
          </h1>
          <p className="mt-2 text-slate-300">
            {location.city}, {location.country}
          </p>
          <p className="mt-4 text-slate-300">{location.description}</p>
          <p className="mt-5 text-sky-300">
            ₹ {location.pricePerNight} / night
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {(location.amenities || []).map((item, index) => (
              <span
                key={index}
                className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-3xl font-bold text-white">Book This Stay</h2>

          {successMessage && (
            <div className="mt-4 rounded-xl bg-emerald-500/10 p-3 text-emerald-300">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 rounded-xl bg-red-500/10 p-3 text-red-300">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleBookNow} className="mt-6 grid gap-4">
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full name"
              className="rounded-xl bg-slate-900 px-4 py-3 text-white"
              required
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="rounded-xl bg-slate-900 px-4 py-3 text-white"
              required
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="rounded-xl bg-slate-900 px-4 py-3 text-white"
              required
            />
            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="checkIn"
                type="date"
                value={formData.checkIn}
                onChange={handleChange}
                className="rounded-xl bg-slate-900 px-4 py-3 text-white"
                required
              />
              <input
                name="checkOut"
                type="date"
                value={formData.checkOut}
                onChange={handleChange}
                className="rounded-xl bg-slate-900 px-4 py-3 text-white"
                required
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="numberOfGuests"
                type="number"
                min="1"
                max={location.maxGuests}
                value={formData.numberOfGuests}
                onChange={handleChange}
                placeholder="Guests"
                className="rounded-xl bg-slate-900 px-4 py-3 text-white"
                required
              />
              <input
                name="numberOfRooms"
                type="number"
                min="1"
                value={formData.numberOfRooms}
                onChange={handleChange}
                placeholder="Rooms"
                className="rounded-xl bg-slate-900 px-4 py-3 text-white"
                required
              />
            </div>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows="4"
              placeholder="Special requests"
              className="rounded-xl bg-slate-900 px-4 py-3 text-white"
            />

            <div className="rounded-2xl bg-slate-900 p-4 text-white">
              <p>Total Nights: {totalNights > 0 ? totalNights : 0}</p>
              <p>Total Price: ₹ {totalPrice}</p>
            </div>

            <button
              type="submit"
              disabled={bookingLoading}
              className="rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white"
            >
              {bookingLoading ? "Booking..." : "Book Now"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SingleLocation;
