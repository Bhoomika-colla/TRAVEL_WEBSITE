import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3111/api";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setSuccessMessage("");
    setErrorMessage("");

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE_URL}/contact/create-contact-message`,
        formData,
      );

      setSuccessMessage(
        res?.data?.message || "Your message has been sent successfully.",
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message ||
          "Unable to send your message right now. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-160px)] bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <span className="mb-4 inline-flex w-fit rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm font-semibold text-cyan-300">
            Contact Us
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Let’s plan your next journey together
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Have questions, travel ideas, custom trip requirements, or need help
            with bookings? Send us a message and our team will get back to you.
          </p>

          <div className="mt-8 space-y-4 text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                Support
              </p>
              <p className="mt-2 text-base text-white">
                We are here for travelers, planners, and explorers.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                Fast Response
              </p>
              <p className="mt-2 text-base text-white">
                Share your message and our team will review it as soon as
                possible.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <h2 className="text-2xl font-bold text-white">Send a Message</h2>
          <p className="mt-2 text-sm text-slate-300">
            Fill in the form below and we will get in touch with you.
          </p>

          {successMessage ? (
            <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300">
              {successMessage}
            </div>
          ) : null}

          {errorMessage ? (
            <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
              {errorMessage}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Phone <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                placeholder="Write your message here"
                className="w-full resize-none rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition-all duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Sending..." : "Submit Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
