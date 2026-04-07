import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../managers/AuthManager";

const AllUsers = () => {
  const { getAllUsers, updateUserRole } = useAuth();
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Unable to fetch users.",
      );
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      setMessage("");
      await updateUserRole(id, role);
      setMessage("User role updated successfully.");
      loadUsers();
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Unable to update role.",
      );
    }
  };

  return (
    <section className="min-h-[85vh] bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">All Users</h1>
            <p className="mt-2 text-sm text-slate-400">
              Only superadmin can access this page.
            </p>
          </div>

          <Link
            to="/profile"
            className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
          >
            Back to Profile
          </Link>
        </div>

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

        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full overflow-hidden rounded-2xl border border-white/10">
            <thead className="bg-slate-900">
              <tr className="text-left text-sm text-slate-300">
                <th className="px-4 py-4">Full Name</th>
                <th className="px-4 py-4">Email</th>
                <th className="px-4 py-4">Role</th>
                <th className="px-4 py-4">Phone</th>
                <th className="px-4 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-white/10 bg-slate-950/40"
                >
                  <td className="px-4 py-4">{item.fullName}</td>
                  <td className="px-4 py-4">{item.email}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase">
                      {item.role}
                    </span>
                  </td>
                  <td className="px-4 py-4">{item.phone || "-"}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleRoleChange(item._id, "user")}
                        className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm"
                      >
                        Make User
                      </button>
                      <button
                        onClick={() => handleRoleChange(item._id, "superadmin")}
                        className="rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Make Superadmin
                      </button>
                      <Link
                        to={`/update-role/${item._id}`}
                        className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm"
                      >
                        Open Role Page
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-8 text-center text-slate-400"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AllUsers;
