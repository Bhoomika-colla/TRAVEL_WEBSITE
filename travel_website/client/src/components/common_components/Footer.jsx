import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 text-xl font-bold text-white shadow-lg shadow-sky-500/30">
                T
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">TravelNest</h2>
                <p className="text-xs uppercase tracking-widest text-sky-300">
                  Explore Beyond
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              Discover your next adventure with us. Explore breathtaking
              destinations, unique experiences, and unforgettable journeys.
            </p>

            <div className="mt-6 flex gap-3">
              {["F", "T", "I", "Y"].map((icon, i) => (
                <div
                  key={i}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-600 hover:text-white"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Home", link: "/" },
                { name: "Explore Locations", link: "/explore-locations" },
                { name: "About Us", link: "/about-us" },
                { name: "Contact Us", link: "/contact-us" },
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href={item.link}
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-sky-400"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-3 text-sm">
              {["Travel Guides", "Blog", "FAQs", "Support"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-sky-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact Us
            </h3>

            <div className="space-y-4 text-sm text-slate-400">
              <p className="flex items-center gap-3">
                📞 <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center gap-3">
                ✉️ <span>info@travelnest.com</span>
              </p>
              <p className="flex items-start gap-3">
                📍 <span>Bangalore, India</span>
              </p>
            </div>
          </div>
        </div>

        <div className="my-10 h-px w-full bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-400 md:flex-row">
          <p>© {new Date().getFullYear()} TravelNest. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="transition hover:text-sky-400">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-sky-400">
              Terms of Service
            </a>
            <a href="#" className="transition hover:text-sky-400">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
