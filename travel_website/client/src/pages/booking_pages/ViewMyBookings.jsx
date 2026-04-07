import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../managers/AuthManager";

const ViewMyBookings = () => {
  const { api } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await api.get("/bookings/my-bookings");
      setBookings(res?.data?.bookings || []);
    };

    fetchBookings();
  }, [api]);

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-4xl font-bold text-white">My Bookings</h1>

        <div className="grid gap-5">
          {bookings.map((item) => (
            <div
              key={item._id}
              className="rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {item.location?.title}
                  </h2>
                  <p className="mt-2 text-slate-300">
                    {item.location?.city}, {item.location?.country}
                  </p>
                  <p className="mt-2 text-sky-300">
                    Booking Code: {item.bookingCode}
                  </p>
                  <p className="mt-2 text-slate-300">
                    Status: {item.bookingStatus}
                  </p>
                  <p className="mt-2 text-slate-300">
                    Check-in: {new Date(item.checkIn).toLocaleDateString()}
                  </p>
                  <p className="mt-2 text-slate-300">
                    Check-out: {new Date(item.checkOut).toLocaleDateString()}
                  </p>
                  <p className="mt-2 text-slate-300">
                    Total Price: ₹ {item.totalPrice}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/my-bookings/${item._id}`}
                    className="rounded-xl bg-sky-600 px-4 py-2 text-white"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit-booking/${item._id}`}
                    className="rounded-xl bg-amber-500 px-4 py-2 text-white"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/cancel-booking/${item._id}`}
                    className="rounded-xl bg-red-600 px-4 py-2 text-white"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViewMyBookings;
