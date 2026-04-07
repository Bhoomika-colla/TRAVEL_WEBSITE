import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../managers/AuthManager";

const UpdateRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateUserRole } = useAuth();

  const [role, setRole] = useState("user");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserRole(id, role);
      setMessage("Role updated successfully.");
      setTimeout(() => navigate("/all-users"), 1000);
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Unable to update role.",
      );
    }
  };

  return (
    <section className="min-h-[85vh] bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-3xl font-bold">Update User Role</h1>
        <p className="mt-2 text-sm text-slate-400">
          Change the role for this user.
        </p>

        {message && (
          <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
            {message}
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-sky-400"
            >
              <option value="user">User</option>
              <option value="superadmin">Superadmin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-5 py-3 font-semibold text-white"
          >
            Update Role
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateRole;
