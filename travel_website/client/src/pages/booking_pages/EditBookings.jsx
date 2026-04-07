import React, { useEffect, useState } from "react";
import { useAuth } from "../../managers/AuthManager";
import { useNavigate, useParams } from "react-router-dom";

const EditBookings = () => {
  const { id } = useParams();
  const { api } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    numberOfGuests: 1,
    numberOfRooms: 1,
    specialRequests: "",
  });

  useEffect(() => {
    const fetchBooking = async () => {
      const res = await api.get(`/bookings/single-booking/${id}`);
      const booking = res?.data?.booking;

      setFormData({
        fullName: booking?.fullName || "",
        email: booking?.email || "",
        phone: booking?.phone || "",
        checkIn: booking?.checkIn
          ? new Date(booking.checkIn).toISOString().split("T")[0]
          : "",
        checkOut: booking?.checkOut
          ? new Date(booking.checkOut).toISOString().split("T")[0]
          : "",
        numberOfGuests: booking?.numberOfGuests || 1,
        numberOfRooms: booking?.numberOfRooms || 1,
        specialRequests: booking?.specialRequests || "",
      });
    };

    fetchBooking();
  }, [api, id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/bookings/update-booking/${id}`, formData);
    navigate("/my-bookings");
  };

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-3xl font-bold text-white">Edit Booking</h1>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
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
              value={formData.numberOfGuests}
              onChange={handleChange}
              className="rounded-xl bg-slate-900 px-4 py-3 text-white"
              required
            />
            <input
              name="numberOfRooms"
              type="number"
              value={formData.numberOfRooms}
              onChange={handleChange}
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
          <button
            type="submit"
            className="rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white"
          >
            Update Booking
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditBookings;
