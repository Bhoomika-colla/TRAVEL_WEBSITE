import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../managers/AuthManager";

const Profile = () => {
  const { user, fetchProfile, logout } = useAuth();
  const [profile, setProfile] = useState(user || null);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchProfile();
      setProfile(data);
    };
    loadProfile();
  }, []);

  return (
    <section className="min-h-[85vh] bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="mt-2 text-sm text-slate-400">
              Manage your travel account details.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/update-profile"
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-sky-400"
            >
              Update Profile
            </Link>

            {profile?.role === "superadmin" && (
              <Link
                to="/all-users"
                className="rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white"
              >
                All Users
              </Link>
            )}

            <button
              onClick={logout}
              className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <ProfileField label="Full Name" value={profile?.fullName} />
          <ProfileField label="Email" value={profile?.email} />
          <ProfileField label="Phone" value={profile?.phone} />
          <ProfileField
            label="Date of Birth"
            value={profile?.dateOfBirth?.slice(0, 10)}
          />
          <ProfileField label="Gender" value={profile?.gender} />
          <ProfileField label="Role" value={profile?.role} />
          <ProfileField label="Country" value={profile?.country} />
          <ProfileField label="State" value={profile?.state} />
          <ProfileField label="City" value={profile?.city} />
          <ProfileField label="Postal Code" value={profile?.postalCode} />
          <ProfileField label="Address Line 1" value={profile?.addressLine1} />
          <ProfileField label="Address Line 2" value={profile?.addressLine2} />
          <ProfileField label="Nationality" value={profile?.nationality} />
          <ProfileField
            label="Preferred Currency"
            value={profile?.preferredCurrency}
          />
        </div>
      </div>
    </section>
  );
};

const ProfileField = ({ label, value }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <p className="text-xs uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm text-white">{value || "Not provided"}</p>
    </div>
  );
};

export default Profile;
