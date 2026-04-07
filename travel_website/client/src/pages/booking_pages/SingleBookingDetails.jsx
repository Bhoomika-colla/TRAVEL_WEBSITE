import React, { useEffect, useState } from "react";
import { useAuth } from "../../managers/AuthManager";
import { Link, useParams } from "react-router-dom";
import jsPDF from "jspdf";

const SingleBookingDetails = () => {
  const { id } = useParams();
  const { api } = useAuth();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      const res = await api.get(`/bookings/single-booking/${id}`);
      setBooking(res?.data?.booking || null);
    };

    fetchBooking();
  }, [api, id]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = () => {
    if (!booking) return;

    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text("Booking Details", 20, 20);
    pdf.setFontSize(12);
    pdf.text(`Booking Code: ${booking.bookingCode}`, 20, 35);
    pdf.text(`Name: ${booking.fullName}`, 20, 45);
    pdf.text(`Email: ${booking.email}`, 20, 55);
    pdf.text(`Phone: ${booking.phone}`, 20, 65);
    pdf.text(`Location: ${booking.location?.title}`, 20, 75);
    pdf.text(
      `Check-In: ${new Date(booking.checkIn).toLocaleDateString()}`,
      20,
      85,
    );
    pdf.text(
      `Check-Out: ${new Date(booking.checkOut).toLocaleDateString()}`,
      20,
      95,
    );
    pdf.text(`Guests: ${booking.numberOfGuests}`, 20, 105);
    pdf.text(`Rooms: ${booking.numberOfRooms}`, 20, 115);
    pdf.text(`Total Nights: ${booking.totalNights}`, 20, 125);
    pdf.text(`Total Price: ₹ ${booking.totalPrice}`, 20, 135);
    pdf.text(`Booking Status: ${booking.bookingStatus}`, 20, 145);
    pdf.save(`booking-${booking.bookingCode}.pdf`);
  };

  const handleExportWord = () => {
    if (!booking) return;

    const content = `
      <html>
        <head><meta charset="utf-8" /></head>
        <body>
          <h1>Booking Details</h1>
          <p><strong>Booking Code:</strong> ${booking.bookingCode}</p>
          <p><strong>Name:</strong> ${booking.fullName}</p>
          <p><strong>Email:</strong> ${booking.email}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
          <p><strong>Location:</strong> ${booking.location?.title}</p>
          <p><strong>Check-In:</strong> ${new Date(booking.checkIn).toLocaleDateString()}</p>
          <p><strong>Check-Out:</strong> ${new Date(booking.checkOut).toLocaleDateString()}</p>
          <p><strong>Guests:</strong> ${booking.numberOfGuests}</p>
          <p><strong>Rooms:</strong> ${booking.numberOfRooms}</p>
          <p><strong>Total Nights:</strong> ${booking.totalNights}</p>
          <p><strong>Total Price:</strong> ₹ ${booking.totalPrice}</p>
          <p><strong>Status:</strong> ${booking.bookingStatus}</p>
          <p><strong>Special Requests:</strong> ${booking.specialRequests || "-"}</p>
        </body>
      </html>
    `;

    const blob = new Blob(["\ufeff", content], {
      type: "application/msword",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `booking-${booking.bookingCode}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!booking) return <div className="p-10 text-white">Loading...</div>;

  return (
    <section className="px-4 py-10 print:bg-white">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-6 print:border-none print:bg-white">
        <div className="mb-6 flex flex-wrap gap-3 print:hidden">
          <Link
            to="/my-bookings"
            className="rounded-xl bg-slate-700 px-4 py-2 text-white"
          >
            Back
          </Link>
          <button
            onClick={handlePrint}
            className="rounded-xl bg-sky-600 px-4 py-2 text-white"
          >
            Print
          </button>
          <button
            onClick={handleExportPdf}
            className="rounded-xl bg-red-600 px-4 py-2 text-white"
          >
            Export PDF
          </button>
          <button
            onClick={handleExportWord}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-white"
          >
            Export Word
          </button>
        </div>

        <h1 className="text-4xl font-bold text-white print:text-black">
          Booking Details
        </h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-900 p-4 text-white print:bg-white print:text-black">
            <p>
              <strong>Booking Code:</strong> {booking.bookingCode}
            </p>
            <p>
              <strong>Name:</strong> {booking.fullName}
            </p>
            <p>
              <strong>Email:</strong> {booking.email}
            </p>
            <p>
              <strong>Phone:</strong> {booking.phone}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-4 text-white print:bg-white print:text-black">
            <p>
              <strong>Location:</strong> {booking.location?.title}
            </p>
            <p>
              <strong>Guests:</strong> {booking.numberOfGuests}
            </p>
            <p>
              <strong>Rooms:</strong> {booking.numberOfRooms}
            </p>
            <p>
              <strong>Status:</strong> {booking.bookingStatus}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-4 text-white print:bg-white print:text-black md:col-span-2">
            <p>
              <strong>Check-In:</strong>{" "}
              {new Date(booking.checkIn).toLocaleDateString()}
            </p>
            <p>
              <strong>Check-Out:</strong>{" "}
              {new Date(booking.checkOut).toLocaleDateString()}
            </p>
            <p>
              <strong>Total Nights:</strong> {booking.totalNights}
            </p>
            <p>
              <strong>Total Price:</strong> ₹ {booking.totalPrice}
            </p>
            <p>
              <strong>Special Requests:</strong>{" "}
              {booking.specialRequests || "-"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleBookingDetails;
