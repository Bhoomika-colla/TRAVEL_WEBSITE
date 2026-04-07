import React from "react";
import { useAuth } from "../../managers/AuthManager";
import { useNavigate, useParams } from "react-router-dom";

const CancelBooking = () => {
  const { id } = useParams();
  const { api } = useAuth();
  const navigate = useNavigate();

  const handleCancelBooking = async () => {
    await api.patch(`/bookings/cancel-booking/${id}`);
    navigate("/my-bookings");
  };

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-2xl rounded-3xl border border-red-500/20 bg-red-500/10 p-8">
        <h1 className="text-3xl font-bold text-white">Cancel Booking</h1>
        <p className="mt-4 text-slate-300">
          Are you sure you want to cancel this booking?
        </p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleCancelBooking}
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white"
          >
            Yes, Cancel Booking
          </button>

          <button
            onClick={() => navigate("/my-bookings")}
            className="rounded-xl bg-slate-700 px-6 py-3 font-semibold text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default CancelBooking;
