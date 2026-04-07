import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../managers/AuthManager";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setErrorMessage("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await register(formData);
      navigate("/profile");
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[85vh] bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="mt-2 text-sm text-slate-400">
          Start exploring destinations with TravelNest.
        </p>

        {errorMessage && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              minLength={3}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-sky-400"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-sky-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-sky-400"
              placeholder="Choose a strong password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-5 py-3 font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-sky-300 hover:text-sky-400">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
