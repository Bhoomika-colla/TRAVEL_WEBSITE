import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../managers/AuthManager";

const SingleCreatedLocation = () => {
  const { id } = useParams();
  const { api } = useAuth();
  const navigate = useNavigate();

  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const res = await api.get(`/locations/single-location/${id}`);
      setLocation(res?.data?.location || null);
    };

    fetchLocation();
  }, [api, id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this location?",
    );
    if (!confirmed) return;

    await api.delete(`/locations/delete-location/${id}`);
    navigate("/admin/all-locations");
  };

  if (!location) {
    return <div className="p-10 text-white">Loading...</div>;
  }

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-6">
        <img
          src={
            location.image ||
            "https://via.placeholder.com/800x500?text=Location"
          }
          alt={location.title}
          className="h-80 w-full rounded-3xl object-cover"
        />
        <h1 className="mt-6 text-4xl font-bold text-white">{location.title}</h1>
        <p className="mt-2 text-slate-300">
          {location.city}, {location.country}
        </p>
        <p className="mt-4 text-sky-300">₹ {location.pricePerNight} / night</p>
        <p className="mt-4 text-slate-300">{location.description}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to={`/admin/update-location/${location._id}`}
            className="rounded-xl bg-amber-500 px-5 py-3 text-white"
          >
            Update
          </Link>
          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-5 py-3 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default SingleCreatedLocation;
