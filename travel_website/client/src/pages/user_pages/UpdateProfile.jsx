import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../managers/AuthManager";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { user, fetchProfile, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    nationality: "",
    preferredCurrency: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const profile = user || (await fetchProfile());
      setFormData({
        fullName: profile?.fullName || "",
        phone: profile?.phone || "",
        dateOfBirth: profile?.dateOfBirth
          ? profile.dateOfBirth.slice(0, 10)
          : "",
        gender: profile?.gender || "",
        addressLine1: profile?.addressLine1 || "",
        addressLine2: profile?.addressLine2 || "",
        city: profile?.city || "",
        state: profile?.state || "",
        country: profile?.country || "",
        postalCode: profile?.postalCode || "",
        nationality: profile?.nationality || "",
        preferredCurrency: profile?.preferredCurrency || "",
      });
    };

    loadData();
  }, []);

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
      await updateProfile(formData);
      setSuccessMessage("Profile updated successfully.");
      setTimeout(() => navigate("/profile"), 1000);
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Unable to update profile.",
      );
    }
  };

  return (
    <section className="min-h-[85vh] bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-3xl font-bold">Update Profile</h1>
        <p className="mt-2 text-sm text-slate-400">
          Complete your travel profile for faster future bookings.
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

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <InputField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <SelectField
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={["Male", "Female", "Other"]}
          />
          <InputField
            label="Address Line 1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
          />
          <InputField
            label="Address Line 2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
          />
          <InputField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <InputField
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
          <InputField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
          <InputField
            label="Postal Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
          />
          <InputField
            label="Nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
          />
          <InputField
            label="Preferred Currency"
            name="preferredCurrency"
            value={formData.preferredCurrency}
            onChange={handleChange}
          />

          <div className="md:col-span-2 flex flex-wrap gap-4 pt-2">
            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-6 py-3 font-semibold text-white"
            >
              Save Profile
            </button>

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 font-semibold text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="mb-2 block text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-sky-400"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="mb-2 block text-sm font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-sky-400"
    >
      <option value="">Select</option>
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
);

export default UpdateProfile;
