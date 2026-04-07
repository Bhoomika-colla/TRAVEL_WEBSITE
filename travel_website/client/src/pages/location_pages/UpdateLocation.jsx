import React, { useEffect, useState } from "react";
import { useAuth } from "../../managers/AuthManager";
import { useNavigate, useParams } from "react-router-dom";

const UpdateLocation = () => {
  const { id } = useParams();
  const { api } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    country: "",
    state: "",
    city: "",
    address: "",
    shortDescription: "",
    description: "",
    category: "resort",
    image: "",
    gallery: "",
    pricePerNight: "",
    maxGuests: "",
    totalRooms: "",
    amenities: "",
    status: "active",
    isFeatured: false,
  });

  useEffect(() => {
    const fetchLocation = async () => {
      const res = await api.get(`/locations/single-location/${id}`);
      const location = res?.data?.location;

      setFormData({
        title: location?.title || "",
        country: location?.country || "",
        state: location?.state || "",
        city: location?.city || "",
        address: location?.address || "",
        shortDescription: location?.shortDescription || "",
        description: location?.description || "",
        category: location?.category || "resort",
        image: location?.image || "",
        gallery: (location?.gallery || []).join(", "),
        pricePerNight: location?.pricePerNight || "",
        maxGuests: location?.maxGuests || "",
        totalRooms: location?.totalRooms || "",
        amenities: (location?.amenities || []).join(", "),
        status: location?.status || "active",
        isFeatured: location?.isFeatured || false,
      });
    };

    fetchLocation();
  }, [api, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/locations/update-location/${id}`, formData);
    navigate(`/admin/location/${id}`);
  };

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-3xl font-bold text-white">Update Location</h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-4 md:grid-cols-2"
        >
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="rounded-xl bg-slate-900 px-4 py-3 text-white"
            required
          />
          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            className="rounded-xl bg-slate-900 px-4 py-3 text-white"
            required
          />
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="rounded-xl bg-slate-900 px-4 py-3 text-white"
          />
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="rounded-xl bg-slate-900 px-4 py-3 text-white"
            required
          />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="rounded-xl bg-slate-900 px-4 py-3 text-white md:col-span-2"
          />
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Main image URL"
            className="rounded-xl bg-slate-900 px-4 py-3 text-white md:col-span-2"
          />
          <input
            name="gallery"
            value={formData.gallery}
            onChange={handleChange}
            placeholder="Gallery URLs separated by comma"
            className="rounded-xl bg-slate-900 px-4 py-3 text-white md:col-span-2"
          />
          <input
            name="pricePerNight"
            type="number"
            value={formData.pricePerNight}
            onChange={handleChange}
            placeholder="Price per night"
            className="rounded-xl bg-slate-900 px-4 py-3 text-white"
            required
          />
          <input
            name="maxGuests"
            type="number"
            value={formData.maxGuests}
            onChange={handleChange}
            placeholder="Max guests"
            className="rounded-xl bg-slate-900 px-4 py-3 text-white"
            required
          />
          <input
            name="totalRooms"
            type="number"
            value={formData.totalRooms}
            onChange={handleChange}
            placeholder="Total rooms"
            className="rounded-xl bg-slate-900 px-4 py-3 text-white"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="rounded-xl bg-slate-900 px-4 py-3 text-white"
          >
            <option value="resort">Resort</option>
            <option value="hotel">Hotel</option>
            <option value="villa">Villa</option>
            <option value="homestay">Homestay</option>
            <option value="destination">Destination</option>
          </select>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="rounded-xl bg-slate-900 px-4 py-3 text-white"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <input
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            placeholder="Amenities separated by comma"
            className="rounded-xl bg-slate-900 px-4 py-3 text-white md:col-span-2"
          />
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Short description"
            rows="3"
            className="rounded-xl bg-slate-900 px-4 py-3 text-white md:col-span-2"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Full description"
            rows="6"
            className="rounded-xl bg-slate-900 px-4 py-3 text-white md:col-span-2"
            required
          />
          <label className="flex items-center gap-3 text-white md:col-span-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
            Featured location
          </label>

          <button
            type="submit"
            className="rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white md:col-span-2"
          >
            Update Location
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateLocation;
