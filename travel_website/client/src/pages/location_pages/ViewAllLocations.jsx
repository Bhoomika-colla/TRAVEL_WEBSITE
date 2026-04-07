import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../managers/AuthManager";

const ViewAllLocations = () => {
  const { api } = useAuth();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await api.get("/locations/admin/all-locations");
        setLocations(res?.data?.locations || []);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [api]);

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">
            All Created Locations
          </h1>
          <Link
            to="/admin/create-location"
            className="rounded-xl bg-sky-600 px-5 py-3 text-white"
          >
            Create Location
          </Link>
        </div>

        {loading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {locations.map((item) => (
              <Link
                key={item._id}
                to={`/admin/location/${item._id}`}
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
              >
                <img
                  src={
                    item.image ||
                    "https://via.placeholder.com/600x400?text=Location"
                  }
                  alt={item.title}
                  className="h-52 w-full rounded-2xl object-cover"
                />
                <h2 className="mt-4 text-xl font-bold text-white">
                  {item.title}
                </h2>
                <p className="mt-2 text-slate-300">
                  {item.city}, {item.country}
                </p>
                <p className="mt-2 text-sky-300">
                  ₹ {item.pricePerNight} / night
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Status: {item.status}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ViewAllLocations;
