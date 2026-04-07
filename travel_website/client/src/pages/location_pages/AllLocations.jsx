import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3111/api";

const AllLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/locations/all-locations`);
        setLocations(res?.data?.locations || []);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-4xl font-bold text-white">All Destinations</h1>

        {loading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {locations.map((item) => (
              <Link
                key={item._id}
                to={`/locations/${item._id}`}
                className="rounded-3xl border border-white/10 bg-white/5 p-4"
              >
                <img
                  src={
                    item.image ||
                    "https://via.placeholder.com/600x400?text=Location"
                  }
                  alt={item.title}
                  className="h-56 w-full rounded-2xl object-cover"
                />
                <h2 className="mt-4 text-2xl font-bold text-white">
                  {item.title}
                </h2>
                <p className="mt-2 text-slate-300">
                  {item.city}, {item.country}
                </p>
                <p className="mt-3 text-sm text-slate-400">
                  {item.shortDescription}
                </p>
                <p className="mt-4 text-sky-300">
                  ₹ {item.pricePerNight} / night
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllLocations;
