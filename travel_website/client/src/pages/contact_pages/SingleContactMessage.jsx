import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../managers/AuthManager";

const SingleContactMessage = () => {
  const { id } = useParams();
  const { api, user, loading: authLoading, isAuthenticated } = useAuth();

  const [messageData, setMessageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSingleMessage = async () => {
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
          setErrorMessage("Only superadmin can view this message.");
          setLoading(false);
          return;
        }

        setLoading(true);
        setErrorMessage("");

        const res = await api.get(`/contact/single-message/${id}`);
        setMessageData(res?.data?.message || null);
      } catch (error) {
        setErrorMessage(
          error?.response?.data?.message || "Unable to fetch message details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSingleMessage();
  }, [api, id, authLoading, isAuthenticated, user]);

  return (
    <section className="min-h-[calc(100vh-160px)] bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm font-semibold text-cyan-300">
              Message Details
            </span>
            <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Single Contact Message
            </h1>
          </div>

          <Link
            to="/all-contact-messages"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            Back to All Messages
          </Link>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-white">
            Loading message...
          </div>
        ) : errorMessage ? (
          <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-6 text-red-300">
            {errorMessage}
          </div>
        ) : !messageData ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-300">
            Message not found.
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  messageData.isRead
                    ? "bg-emerald-500/10 text-emerald-300"
                    : "bg-amber-500/10 text-amber-300"
                }`}
              >
                {messageData.isRead ? "Read" : "Unread"}
              </span>

              <span className="text-sm text-slate-400">
                {new Date(messageData.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                  Name
                </p>
                <p className="mt-2 text-base font-medium text-white">
                  {messageData.name}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                  Email
                </p>
                <p className="mt-2 text-base font-medium text-white">
                  {messageData.email}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                  Phone
                </p>
                <p className="mt-2 text-base font-medium text-white">
                  {messageData.phone}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                  Message
                </p>
                <p className="mt-3 whitespace-pre-wrap text-base leading-8 text-slate-200">
                  {messageData.message}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SingleContactMessage;
