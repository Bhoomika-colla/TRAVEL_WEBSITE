import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../managers/AuthManager";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setErrorMessage("");
    setSuccessMessage("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(formData);
      setSuccessMessage("Login successful.");
      navigate("/profile");
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Unable to login. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[85vh] bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="mt-2 text-sm text-slate-400">
          Login to continue your travel journey.
        </p>

        {errorMessage && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
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
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-sky-400"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link
              to="/forgot-password"
              className="text-sky-300 hover:text-sky-400"
            >
              Forgot password?
            </Link>
            <Link to="/register" className="text-slate-300 hover:text-white">
              Create account
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-5 py-3 font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
