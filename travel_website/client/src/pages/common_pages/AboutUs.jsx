import React from "react";
import aboutHero from "../../assets/images/about-hero.jpg";
import aboutTeam from "../../assets/images/about-team.jpg";
import aboutDestination1 from "../../assets/images/about-destination-1.jpg";
import aboutDestination2 from "../../assets/images/about-destination-2.jpg";
import aboutDestination3 from "../../assets/images/about-destination-3.jpg";

const AboutUs = () => {
  return (
    <section className="bg-slate-950 text-white">
      <div className="relative">
        <img
          src={aboutHero}
          alt="Travel agency hero"
          className="h-[70vh] w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 mx-auto flex max-w-9xl items-center px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-sky-300">
              About TravelNest
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Curating world-class journeys for modern travelers.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              TravelNest is a premium travel company focused on unforgettable
              experiences, handpicked destinations, elegant stays, seamless
              planning, and deeply personalized adventures across the globe.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-sky-300">
              Our Story
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Built for travelers who expect more.
            </h2>
            <p className="mt-6 text-slate-300 leading-7">
              We believe travel should feel inspiring before the journey even
              begins. From luxury escapes and coastal retreats to mountain
              adventures and cultural city breaks, our team designs every
              experience with care, comfort, and clarity.
            </p>
            <p className="mt-4 text-slate-300 leading-7">
              Our mission is simple: to bring together trusted stays, beautiful
              destinations, smooth booking experiences, and curated travel
              support in one world-class platform.
            </p>
          </div>

          <div>
            <img
              src={aboutTeam}
              alt="TravelNest team"
              className="h-[420px] w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: "Luxury Stays",
              text: "Handpicked resorts, villas, boutique hotels, and scenic retreats for every type of traveler.",
              image: aboutDestination1,
            },
            {
              title: "Tailored Itineraries",
              text: "Personalized plans that match your pace, preferences, and dream experiences.",
              image: aboutDestination2,
            },
            {
              title: "Trusted Support",
              text: "A responsive team that helps with planning, bookings, changes, and destination guidance.",
              image: aboutDestination3,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-64 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
          <p className="text-sm uppercase tracking-[0.4em] text-sky-300">
            Why Choose Us
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Premium travel, designed with precision.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Feature
              title="Global Destination Expertise"
              text="Our team researches and curates the best beaches, mountains, resorts, city escapes, and hidden gems."
            />
            <Feature
              title="Elegant Digital Experience"
              text="We are building a modern travel platform where discovery, planning, booking, and profile management feel seamless."
            />
            <Feature
              title="Personalized Service"
              text="We help travelers choose the right stay, the right route, and the right timing based on their preferences."
            />
            <Feature
              title="Future-Ready Booking Platform"
              text="Your profile and preferences will later power fast resort bookings, destination reservations, and smoother travel planning."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Feature = ({ title, text }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
    </div>
  );
};

export default AboutUs;
