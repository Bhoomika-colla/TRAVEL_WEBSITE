import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../managers/AuthManager";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isSuperAdmin = user?.role === "superadmin";

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate("/home", { replace: true });
  };

  const isPathActive = (path) => {
    if (path === "/home") {
      return (
        location.pathname === "/" ||
        location.pathname === "/home" ||
        location.pathname === "/homepage"
      );
    }

    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const getDesktopNavLinkClass = (path) => {
    const active = isPathActive(path);

    return `rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
      active
        ? "bg-white/10 text-sky-300"
        : "text-slate-200 hover:bg-white/10 hover:text-sky-300"
    }`;
  };

  const getMobileNavLinkClass = (path) => {
    const active = isPathActive(path);

    return `rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
      active
        ? "bg-white/10 text-sky-300"
        : "text-slate-200 hover:bg-white/10 hover:text-sky-300"
    }`;
  };

  const primaryLinks = useMemo(
    () => [
      { to: "/home", label: "Home" },
      { to: "/locations", label: "Locations" },
      { to: "/about-us", label: "About Us" },
      { to: "/contact-us", label: "Contact Us" },
    ],
    [],
  );

  const userLinks = useMemo(() => {
    if (!isAuthenticated) return [];

    return [
      { to: "/my-bookings", label: "My Bookings" },
      { to: "/profile", label: "Profile" },
    ];
  }, [isAuthenticated]);

  const adminLinks = useMemo(() => {
    if (!isSuperAdmin) return [];

    return [
      { to: "/admin/all-locations", label: "Admin Locations" },
      { to: "/admin/create-location", label: "Create Location" },
      { to: "/all-contact-messages", label: "Contact Messages" },
      { to: "/all-users", label: "All Users" },
    ];
  }, [isSuperAdmin]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-9xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <Link
          to="/home"
          className="group flex shrink-0 items-center gap-3 transition-all duration-300"
          onClick={closeMobileMenu}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 text-lg font-bold text-white shadow-lg shadow-sky-500/30 transition-transform duration-300 group-hover:scale-105">
            T
          </div>

          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-lg font-bold tracking-wide text-white">
              TravelNest
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-sky-300">
              Explore Beyond
            </span>
          </div>
        </Link>

        <nav className="hidden xl:block">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 shadow-lg shadow-black/10 backdrop-blur-md">
            <ul className="flex items-center gap-2">
              {primaryLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={getDesktopNavLinkClass(item.to)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              {isAuthenticated &&
                userLinks.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={getDesktopNavLinkClass(item.to)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}

              {isSuperAdmin &&
                adminLinks.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={getDesktopNavLinkClass(item.to)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          {!loading && !isAuthenticated && (
            <>
              <Link
                to="/login"
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-sky-400/40 hover:bg-white/10 hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition-all duration-300 hover:scale-105 hover:shadow-sky-500/40"
              >
                Register
              </Link>
            </>
          )}

          {!loading && isAuthenticated && (
            <>
              <Link
                to="/profile"
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-sky-400/40 hover:bg-white/10 hover:text-white"
              >
                {user?.fullName
                  ? `Hi, ${user.fullName.split(" ")[0]}`
                  : "Profile"}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full px-4 py-2.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-red-500/10 hover:text-red-400"
              >
                Logout
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-300 hover:bg-white/10 xl:hidden"
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className="h-6 w-6"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur-xl sm:px-6 xl:hidden">
          <nav className="flex flex-col gap-3">
            {primaryLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeMobileMenu}
                className={getMobileNavLinkClass(item.to)}
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated &&
              userLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMobileMenu}
                  className={getMobileNavLinkClass(item.to)}
                >
                  {item.label}
                </Link>
              ))}

            {isSuperAdmin && (
              <>
                <div className="mt-2 border-t border-white/10 pt-4">
                  <p className="px-4 text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
                    Admin
                  </p>
                </div>

                {adminLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMobileMenu}
                    className={getMobileNavLinkClass(item.to)}
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            )}

            <div className="mt-2 flex flex-col gap-3 border-t border-white/10 pt-4">
              {!loading && !isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-sky-400/40 hover:bg-white/10 hover:text-white"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition-all duration-300"
                  >
                    Register
                  </Link>
                </>
              )}

              {!loading && isAuthenticated && (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-sky-400/40 hover:bg-white/10 hover:text-white"
                  >
                    {user?.fullName ? `Profile - ${user.fullName}` : "Profile"}
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition-all duration-300 hover:bg-red-500/10 hover:text-red-400"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
