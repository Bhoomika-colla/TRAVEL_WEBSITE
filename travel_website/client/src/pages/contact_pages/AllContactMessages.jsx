import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../managers/AuthManager";

const AllContactMessages = () => {
  const { api, user, loading: authLoading, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (authLoading) {
          return;
        }

        if (!isAuthenticated) {
          setErrorMessage("Please login to continue.");
          setLoading(false);
          return;
        }

        if (user?.role !== "superadmin") {
          setErrorMessage("Only superadmin can view contact messages.");
          setLoading(false);
          return;
        }

        setLoading(true);
        setErrorMessage("");

        const res = await api.get("/contact/all-contact-messages");
        setMessages(res?.data?.messages || []);
      } catch (error) {
        setErrorMessage(
          error?.response?.data?.message || "Unable to fetch contact messages.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [api, authLoading, isAuthenticated, user]);

  return (
    <section className="min-h-[calc(100vh-160px)] bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm font-semibold text-cyan-300">
              Superadmin Panel
            </span>
            <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              All Contact Messages
            </h1>
            <p className="mt-2 text-slate-300">
              Review all messages submitted through the contact page.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
            Total Messages:{" "}
            <span className="font-semibold text-white">{messages.length}</span>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-white">
            Loading contact messages...
          </div>
        ) : errorMessage ? (
          <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-6 text-red-300">
            {errorMessage}
          </div>
        ) : messages.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-300">
            No contact messages found.
          </div>
        ) : (
          <div className="grid gap-5">
            {messages.map((item, index) => (
              <Link
                key={item._id}
                to={`/contact-messages/${item._id}`}
                className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-sky-400/30 hover:bg-white/10"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-300">
                        #{index + 1}
                      </span>

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          item.isRead
                            ? "bg-emerald-500/10 text-emerald-300"
                            : "bg-amber-500/10 text-amber-300"
                        }`}
                      >
                        {item.isRead ? "Read" : "Unread"}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-white transition-all duration-300 group-hover:text-sky-300">
                      {item.name}
                    </h2>

                    <div className="mt-2 flex flex-col gap-1 text-sm text-slate-300 sm:flex-row sm:flex-wrap sm:gap-4">
                      <span>Email: {item.email}</span>
                      <span>Phone: {item.phone}</span>
                    </div>

                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-300">
                      {item.message}
                    </p>
                  </div>

                  <div className="min-w-fit text-sm text-slate-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllContactMessages;
