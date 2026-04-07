// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:3111/api";

// const Homepage = () => {
//   const [locations, setLocations] = useState([]);
//   const [loadingLocations, setLoadingLocations] = useState(true);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/locations/all-locations`);
//         setLocations(res?.data?.locations || []);
//       } catch (error) {
//         console.error("Error fetching homepage locations:", error);
//         setLocations([]);
//       } finally {
//         setLoadingLocations(false);
//       }
//     };

//     fetchLocations();
//   }, []);

//   const services = [
//     {
//       title: "Luxury Holidays",
//       description:
//         "Handcrafted premium travel experiences with five-star comfort and style.",
//       icon: "✦",
//     },
//     {
//       title: "Flight & Hotel Booking",
//       description:
//         "Seamless end-to-end booking support for flights, hotels, and local transport.",
//       icon: "✈",
//     },
//     {
//       title: "Custom Tour Packages",
//       description:
//         "Personalized itineraries tailored to your budget, interests, and travel goals.",
//       icon: "🧳",
//     },
//     {
//       title: "24/7 Travel Support",
//       description:
//         "Dedicated assistance before, during, and after your journey for peace of mind.",
//       icon: "☏",
//     },
//   ];

//   const experiences = [
//     {
//       title: "Beach Escapes",
//       image:
//         "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
//     },
//     {
//       title: "Mountain Retreats",
//       image:
//         "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
//     },
//     {
//       title: "City Adventures",
//       image:
//         "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
//     },
//     {
//       title: "Romantic Getaways",
//       image:
//         "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80",
//     },
//   ];

//   const testimonials = [
//     {
//       name: "Aarav Sharma",
//       message:
//         "The trip was beautifully organized from start to finish. Everything felt premium and effortless.",
//       image:
//         "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
//     },
//     {
//       name: "Priya Nair",
//       message:
//         "One of the best travel planning experiences I’ve had. Stunning hotels and excellent service.",
//       image:
//         "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
//     },
//     {
//       name: "Rahul Verma",
//       message:
//         "From booking to destination guidance, everything was smooth, responsive, and very professional.",
//       image:
//         "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-950 text-white">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden">
//         <div className="absolute inset-0">
//           <img
//             src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
//             alt="Travel hero"
//             className="h-full w-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-900/40" />
//           <div className="absolute inset-0 bg-black/25" />
//         </div>

//         <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
//           <div className="grid w-full items-center gap-12 lg:grid-cols-2">
//             <div className="max-w-2xl">
//               <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-sky-200 backdrop-blur-md sm:text-sm">
//                 Premium Travel Agency
//               </span>

//               <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
//                 Discover the world with
//                 <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-white bg-clip-text text-transparent">
//                   elegance and ease
//                 </span>
//               </h1>

//               <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
//                 Curated journeys, unforgettable destinations, and seamless
//                 planning for travelers who want more than just a vacation.
//               </p>

//               <div className="mt-8 flex flex-col gap-4 sm:flex-row">
//                 <Link
//                   to="/locations"
//                   className="rounded-full bg-sky-500 px-7 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition duration-300 hover:bg-sky-400"
//                 >
//                   Explore Tours
//                 </Link>
//                 <Link
//                   to="/locations"
//                   className="rounded-full border border-white/25 bg-white/10 px-7 py-3 text-center text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:bg-white/20"
//                 >
//                   Plan My Trip
//                 </Link>
//               </div>

//               <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
//                 <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
//                   <div className="text-2xl font-bold text-sky-300">120+</div>
//                   <div className="mt-1 text-sm text-slate-200">
//                     Destinations
//                   </div>
//                 </div>
//                 <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
//                   <div className="text-2xl font-bold text-sky-300">8K+</div>
//                   <div className="mt-1 text-sm text-slate-200">
//                     Happy Travelers
//                   </div>
//                 </div>
//                 <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
//                   <div className="text-2xl font-bold text-sky-300">24/7</div>
//                   <div className="mt-1 text-sm text-slate-200">Support</div>
//                 </div>
//                 <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
//                   <div className="text-2xl font-bold text-sky-300">15+</div>
//                   <div className="mt-1 text-sm text-slate-200">
//                     Years Experience
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="hidden lg:block">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-4">
//                   <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
//                     <img
//                       src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=900&q=80"
//                       alt="Beach destination"
//                       className="h-72 w-full object-cover"
//                     />
//                   </div>
//                   <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
//                     <img
//                       src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80"
//                       alt="Travel experience"
//                       className="h-56 w-full object-cover"
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-4 pt-10">
//                   <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
//                     <img
//                       src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80"
//                       alt="Romantic travel"
//                       className="h-56 w-full object-cover"
//                     />
//                   </div>
//                   <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
//                     <img
//                       src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80"
//                       alt="Adventure destination"
//                       className="h-72 w-full object-cover"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Search Strip */}
//       <section className="-mt-12 relative z-10 px-4 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
//           <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
//             <div className="rounded-2xl bg-slate-900/60 p-4">
//               <label className="mb-2 block text-sm text-slate-300">
//                 Destination
//               </label>
//               <input
//                 type="text"
//                 placeholder="Where to?"
//                 className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
//               />
//             </div>

//             <div className="rounded-2xl bg-slate-900/60 p-4">
//               <label className="mb-2 block text-sm text-slate-300">
//                 Check In
//               </label>
//               <input
//                 type="date"
//                 className="w-full bg-transparent text-white outline-none"
//               />
//             </div>

//             <div className="rounded-2xl bg-slate-900/60 p-4">
//               <label className="mb-2 block text-sm text-slate-300">
//                 Check Out
//               </label>
//               <input
//                 type="date"
//                 className="w-full bg-transparent text-white outline-none"
//               />
//             </div>

//             <div className="rounded-2xl bg-slate-900/60 p-4">
//               <label className="mb-2 block text-sm text-slate-300">
//                 Travelers
//               </label>
//               <select className="w-full bg-transparent text-white outline-none">
//                 <option className="text-black">1 Guest</option>
//                 <option className="text-black">2 Guests</option>
//                 <option className="text-black">3 Guests</option>
//                 <option className="text-black">4+ Guests</option>
//               </select>
//             </div>

//             <Link
//               to="/locations"
//               className="rounded-2xl bg-sky-500 px-6 py-4 text-center text-sm font-semibold text-white transition duration-300 hover:bg-sky-400"
//             >
//               Search Trips
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Popular Destinations from Database */}
//       <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
//         <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
//           <div>
//             <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300">
//               Popular Destinations
//             </p>
//             <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
//               Explore handpicked places
//             </h2>
//           </div>
//           <p className="max-w-2xl text-slate-400">
//             Discover iconic destinations chosen from your database for beauty,
//             comfort, and unforgettable experiences.
//           </p>
//         </div>

//         {loadingLocations ? (
//           <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
//             {[1, 2, 3, 4, 5, 6].map((item) => (
//               <div
//                 key={item}
//                 className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/60"
//               >
//                 <div className="h-72 w-full animate-pulse bg-slate-800" />
//                 <div className="p-6">
//                   <div className="h-7 w-3/4 animate-pulse rounded bg-slate-800" />
//                   <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-slate-800" />
//                   <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-800" />
//                   <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-800" />
//                   <div className="mt-5 h-10 w-32 animate-pulse rounded-full bg-slate-800" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : locations.length > 0 ? (
//           <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
//             {locations.slice(0, 6).map((item) => (
//               <Link
//                 key={item._id}
//                 to={`/locations/${item._id}`}
//                 className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/60 shadow-xl transition duration-300 hover:-translate-y-2 hover:border-sky-400/40"
//               >
//                 <div className="overflow-hidden">
//                   <img
//                     src={
//                       item.image ||
//                       "https://via.placeholder.com/800x600?text=Location"
//                     }
//                     alt={item.title}
//                     className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
//                   />
//                 </div>

//                 <div className="p-6">
//                   <div className="flex items-start justify-between gap-4">
//                     <h3 className="text-2xl font-semibold text-white">
//                       {item.title}
//                     </h3>
//                     {item.isFeatured && (
//                       <span className="rounded-full bg-sky-500/20 px-3 py-1 text-xs font-semibold text-sky-300">
//                         Featured
//                       </span>
//                     )}
//                   </div>

//                   <p className="mt-2 text-sm text-slate-300">
//                     {item.city}, {item.country}
//                   </p>

//                   <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
//                     {item.shortDescription || item.description}
//                   </p>

//                   <div className="mt-5 flex items-center justify-between gap-4">
//                     <div>
//                       <p className="text-sm text-slate-400">Starting from</p>
//                       <p className="text-lg font-bold text-sky-300">
//                         ₹ {item.pricePerNight} / night
//                       </p>
//                     </div>

//                     <span className="rounded-full border border-sky-400/30 px-5 py-2 text-sm font-medium text-sky-300 transition hover:bg-sky-400 hover:text-slate-950">
//                       View Details
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-10 text-center">
//             <h3 className="text-2xl font-semibold text-white">
//               No locations available
//             </h3>
//             <p className="mt-3 text-slate-400">
//               Add locations in your database and they will appear here
//               automatically.
//             </p>
//           </div>
//         )}

//         {!loadingLocations && locations.length > 6 && (
//           <div className="mt-10 flex justify-center">
//             <Link
//               to="/locations"
//               className="rounded-full bg-sky-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:bg-sky-400"
//             >
//               View All Destinations
//             </Link>
//           </div>
//         )}
//       </section>

//       {/* Why Choose Us */}
//       <section className="bg-gradient-to-b from-slate-950 to-slate-900">
//         <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
//           <div className="mb-12 text-center">
//             <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300">
//               Why Choose Us
//             </p>
//             <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
//               Travel redefined for modern explorers
//             </h2>
//             <p className="mx-auto mt-4 max-w-3xl text-slate-400">
//               From luxury escapes to personalized itineraries, we create travel
//               experiences that are smooth, stylish, and unforgettable.
//             </p>
//           </div>

//           <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
//             {services.map((service, index) => (
//               <div
//                 key={index}
//                 className="rounded-[2rem] border border-white/10 bg-white/5 p-7 shadow-lg backdrop-blur-md transition duration-300 hover:border-sky-400/30 hover:bg-white/10"
//               >
//                 <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/20 text-2xl text-sky-300">
//                   {service.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold">{service.title}</h3>
//                 <p className="mt-3 text-sm leading-6 text-slate-400">
//                   {service.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Experience Categories */}
//       <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
//         <div className="mb-10">
//           <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300">
//             Travel Styles
//           </p>
//           <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
//             Find the experience you love
//           </h2>
//         </div>

//         <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
//           {experiences.map((item, index) => (
//             <div
//               key={index}
//               className="group relative overflow-hidden rounded-[2rem] border border-white/10"
//             >
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
//               <div className="absolute bottom-0 p-6">
//                 <h3 className="text-2xl font-semibold text-white">
//                   {item.title}
//                 </h3>
//                 <button className="mt-3 rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-sky-500">
//                   Explore
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Offer Banner */}
//       <section className="px-4 pb-20 sm:px-6 lg:px-8">
//         <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 md:grid-cols-2">
//           <div className="p-8 sm:p-12 lg:p-16">
//             <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300">
//               Exclusive Offer
//             </p>
//             <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
//               Plan your next escape with special seasonal deals
//             </h2>
//             <p className="mt-5 max-w-xl text-slate-400">
//               Enjoy limited-time offers on premium destinations, luxury stays,
//               and curated travel packages designed for unforgettable memories.
//             </p>
//             <Link
//               to="/locations"
//               className="mt-8 inline-block rounded-full bg-sky-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
//             >
//               Book Special Package
//             </Link>
//           </div>

//           <div className="min-h-[320px]">
//             <img
//               src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1400&q=80"
//               alt="Travel offer"
//               className="h-full w-full object-cover"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="bg-slate-900/50">
//         <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
//           <div className="mb-12 text-center">
//             <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300">
//               Testimonials
//             </p>
//             <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
//               What our travelers say
//             </h2>
//           </div>

//           <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//             {testimonials.map((item, index) => (
//               <div
//                 key={index}
//                 className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-md"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="h-16 w-16 rounded-full object-cover"
//                   />
//                   <div>
//                     <h3 className="text-lg font-semibold">{item.name}</h3>
//                     <p className="text-sm text-sky-300">Happy Traveler</p>
//                   </div>
//                 </div>
//                 <p className="mt-5 text-sm leading-7 text-slate-300">
//                   “{item.message}”
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Newsletter */}
//       <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
//         <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-sky-500/20 via-cyan-500/10 to-slate-900 p-8 shadow-2xl backdrop-blur-md sm:p-12">
//           <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
//             <div>
//               <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300">
//                 Stay Inspired
//               </p>
//               <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
//                 Get travel inspiration and exclusive offers
//               </h2>
//               <p className="mt-4 max-w-2xl text-slate-300">
//                 Subscribe to receive destination ideas, luxury deals, and expert
//                 travel updates straight to your inbox.
//               </p>
//             </div>

//             <div className="flex flex-col gap-4 sm:flex-row">
//               <input
//                 type="email"
//                 placeholder="Enter your email address"
//                 className="w-full rounded-full border border-white/10 bg-slate-950/60 px-6 py-4 text-white outline-none placeholder:text-slate-500"
//               />
//               <button className="rounded-full bg-sky-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-sky-400">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Homepage;

//

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3111/api";

const Homepage = () => {
  const [locations, setLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/locations/all-locations`);
        setLocations(res?.data?.locations || []);
      } catch (error) {
        console.error("Error fetching homepage locations:", error);
        setLocations([]);
      } finally {
        setLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  const services = [
    {
      title: "Luxury Holidays",
      description:
        "Handcrafted premium travel experiences with five-star comfort and style.",
      icon: "✦",
    },
    {
      title: "Flight & Hotel Booking",
      description:
        "Seamless end-to-end booking support for flights, hotels, and local transport.",
      icon: "✈",
    },
    {
      title: "Custom Tour Packages",
      description:
        "Personalized itineraries tailored to your budget, interests, and travel goals.",
      icon: "🧳",
    },
    {
      title: "24/7 Travel Support",
      description:
        "Dedicated assistance before, during, and after your journey for peace of mind.",
      icon: "☏",
    },
  ];

  const experiences = [
    {
      title: "Beach Escapes",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Mountain Retreats",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "City Adventures",
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Romantic Getaways",
      image:
        "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const testimonials = [
    {
      name: "Aarav Sharma",
      message:
        "The trip was beautifully organized from start to finish. Everything felt premium and effortless.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Priya Nair",
      message:
        "One of the best travel planning experiences I’ve had. Stunning hotels and excellent service.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Rahul Verma",
      message:
        "From booking to destination guidance, everything was smooth, responsive, and very professional.",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    },
  ];

  const theme = {
    pageBg: isDarkMode
      ? "bg-slate-950 text-white"
      : "bg-slate-50 text-slate-900",
    heroOverlayPrimary: isDarkMode
      ? "from-slate-950/90 via-slate-950/65 to-slate-900/40"
      : "from-white/85 via-white/70 to-sky-100/40",
    heroOverlaySecondary: isDarkMode ? "bg-black/25" : "bg-white/10",
    badge: isDarkMode
      ? "border-white/20 bg-white/10 text-sky-200"
      : "border-slate-300 bg-white/80 text-sky-700 shadow-sm",
    heroTextSub: isDarkMode ? "text-slate-200" : "text-slate-700",
    statsCard: isDarkMode
      ? "border-white/10 bg-white/10"
      : "border-slate-200 bg-white/90 shadow-sm",
    statsSub: isDarkMode ? "text-slate-200" : "text-slate-600",
    searchWrap: isDarkMode
      ? "border-white/10 bg-white/10"
      : "border-slate-200 bg-white/90 shadow-xl",
    searchBox: isDarkMode ? "bg-slate-900/60" : "bg-slate-100",
    searchLabel: isDarkMode ? "text-slate-300" : "text-slate-600",
    inputText: isDarkMode
      ? "text-white placeholder:text-slate-500"
      : "text-slate-900 placeholder:text-slate-400",
    sectionSub: isDarkMode ? "text-sky-300" : "text-sky-600",
    sectionDesc: isDarkMode ? "text-slate-400" : "text-slate-600",
    card: isDarkMode
      ? "border-white/10 bg-slate-900/60"
      : "border-slate-200 bg-white shadow-lg",
    cardTitle: isDarkMode ? "text-white" : "text-slate-900",
    cardSub: isDarkMode ? "text-slate-300" : "text-slate-600",
    cardDesc: isDarkMode ? "text-slate-400" : "text-slate-600",
    featuredBadge: isDarkMode
      ? "bg-sky-500/20 text-sky-300"
      : "bg-sky-100 text-sky-700",
    outlineBtn: isDarkMode
      ? "border-sky-400/30 text-sky-300 hover:bg-sky-400 hover:text-slate-950"
      : "border-sky-300 text-sky-700 hover:bg-sky-500 hover:text-white",
    whySection: isDarkMode
      ? "bg-gradient-to-b from-slate-950 to-slate-900"
      : "bg-gradient-to-b from-white to-slate-100",
    serviceCard: isDarkMode
      ? "border-white/10 bg-white/5 hover:border-sky-400/30 hover:bg-white/10"
      : "border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50 shadow-md",
    serviceIcon: isDarkMode
      ? "bg-sky-500/20 text-sky-300"
      : "bg-sky-100 text-sky-700",
    experienceBorder: isDarkMode ? "border-white/10" : "border-slate-200",
    offerWrap: isDarkMode
      ? "border-white/10 bg-slate-900"
      : "border-slate-200 bg-white shadow-xl",
    testimonialSection: isDarkMode ? "bg-slate-900/50" : "bg-slate-100/80",
    testimonialCard: isDarkMode
      ? "border-white/10 bg-white/5"
      : "border-slate-200 bg-white shadow-md",
    testimonialSub: isDarkMode ? "text-sky-300" : "text-sky-600",
    testimonialText: isDarkMode ? "text-slate-300" : "text-slate-600",
    newsletterWrap: isDarkMode
      ? "border-white/10 bg-gradient-to-r from-sky-500/20 via-cyan-500/10 to-slate-900"
      : "border-slate-200 bg-gradient-to-r from-sky-100 via-white to-cyan-50 shadow-xl",
    newsletterText: isDarkMode ? "text-slate-300" : "text-slate-600",
    newsletterInput: isDarkMode
      ? "border-white/10 bg-slate-950/60 text-white placeholder:text-slate-500"
      : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400",
    emptyBox: isDarkMode
      ? "border-white/10 bg-white/5"
      : "border-slate-300 bg-white shadow-sm",
    skeletonBox: isDarkMode ? "bg-slate-800" : "bg-slate-200",
    toggleBtn: isDarkMode
      ? "border-white/15 bg-slate-900/70 text-white hover:bg-slate-800"
      : "border-slate-300 bg-white/90 text-slate-900 hover:bg-slate-100 shadow-md",
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${theme.pageBg}`}
    >
      {/* Theme Toggle */}
      <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6 mt-16">
        <button
          type="button"
          onClick={() => setIsDarkMode((prev) => !prev)}
          className={`rounded-full border px-5 py-3 text-sm font-semibold backdrop-blur-md transition duration-300 ${theme.toggleBtn}`}
        >
          {isDarkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
            alt="Travel hero"
            className="h-full w-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${theme.heroOverlayPrimary}`}
          />
          <div className={`absolute inset-0 ${theme.heroOverlaySecondary}`} />
        </div>

        <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid w-full items-center gap-12 lg:grid-cols-2">
            <div className="max-w-2xl">
              <span
                className={`inline-flex rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] backdrop-blur-md sm:text-sm ${theme.badge}`}
              >
                Premium Travel Agency
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
                Discover the world with
                <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-white bg-clip-text text-transparent">
                  elegance and ease
                </span>
              </h1>

              <p
                className={`mt-6 max-w-xl text-base leading-7 sm:text-lg ${theme.heroTextSub}`}
              >
                Curated journeys, unforgettable destinations, and seamless
                planning for travelers who want more than just a vacation.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/locations"
                  className="rounded-full bg-sky-500 px-7 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition duration-300 hover:bg-sky-400"
                >
                  Explore Tours
                </Link>
                <Link
                  to="/locations"
                  className={`rounded-full border px-7 py-3 text-center text-sm font-semibold backdrop-blur-md transition duration-300 ${
                    isDarkMode
                      ? "border-white/25 bg-white/10 text-white hover:bg-white/20"
                      : "border-slate-300 bg-white/80 text-slate-900 hover:bg-white"
                  }`}
                >
                  Plan My Trip
                </Link>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
                <div
                  className={`rounded-2xl border p-4 backdrop-blur-md ${theme.statsCard}`}
                >
                  <div className="text-2xl font-bold text-sky-300">120+</div>
                  <div className={`mt-1 text-sm ${theme.statsSub}`}>
                    Destinations
                  </div>
                </div>
                <div
                  className={`rounded-2xl border p-4 backdrop-blur-md ${theme.statsCard}`}
                >
                  <div className="text-2xl font-bold text-sky-300">8K+</div>
                  <div className={`mt-1 text-sm ${theme.statsSub}`}>
                    Happy Travelers
                  </div>
                </div>
                <div
                  className={`rounded-2xl border p-4 backdrop-blur-md ${theme.statsCard}`}
                >
                  <div className="text-2xl font-bold text-sky-300">24/7</div>
                  <div className={`mt-1 text-sm ${theme.statsSub}`}>
                    Support
                  </div>
                </div>
                <div
                  className={`rounded-2xl border p-4 backdrop-blur-md ${theme.statsCard}`}
                >
                  <div className="text-2xl font-bold text-sky-300">15+</div>
                  <div className={`mt-1 text-sm ${theme.statsSub}`}>
                    Years Experience
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div
                    className={`overflow-hidden rounded-[2rem] border shadow-2xl ${isDarkMode ? "border-white/10" : "border-slate-200"}`}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=900&q=80"
                      alt="Beach destination"
                      className="h-72 w-full object-cover"
                    />
                  </div>
                  <div
                    className={`overflow-hidden rounded-[2rem] border shadow-2xl ${isDarkMode ? "border-white/10" : "border-slate-200"}`}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80"
                      alt="Travel experience"
                      className="h-56 w-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-10">
                  <div
                    className={`overflow-hidden rounded-[2rem] border shadow-2xl ${isDarkMode ? "border-white/10" : "border-slate-200"}`}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80"
                      alt="Romantic travel"
                      className="h-56 w-full object-cover"
                    />
                  </div>
                  <div
                    className={`overflow-hidden rounded-[2rem] border shadow-2xl ${isDarkMode ? "border-white/10" : "border-slate-200"}`}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80"
                      alt="Adventure destination"
                      className="h-72 w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Strip */}
      <section className="-mt-12 relative z-10 px-4 sm:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-7xl rounded-[2rem] border p-5 shadow-2xl backdrop-blur-xl ${theme.searchWrap}`}
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <div className={`rounded-2xl p-4 ${theme.searchBox}`}>
              <label className={`mb-2 block text-sm ${theme.searchLabel}`}>
                Destination
              </label>
              <input
                type="text"
                placeholder="Where to?"
                className={`w-full bg-transparent outline-none ${theme.inputText}`}
              />
            </div>

            <div className={`rounded-2xl p-4 ${theme.searchBox}`}>
              <label className={`mb-2 block text-sm ${theme.searchLabel}`}>
                Check In
              </label>
              <input
                type="date"
                className={`w-full bg-transparent outline-none ${isDarkMode ? "text-white" : "text-slate-900"}`}
              />
            </div>

            <div className={`rounded-2xl p-4 ${theme.searchBox}`}>
              <label className={`mb-2 block text-sm ${theme.searchLabel}`}>
                Check Out
              </label>
              <input
                type="date"
                className={`w-full bg-transparent outline-none ${isDarkMode ? "text-white" : "text-slate-900"}`}
              />
            </div>

            <div className={`rounded-2xl p-4 ${theme.searchBox}`}>
              <label className={`mb-2 block text-sm ${theme.searchLabel}`}>
                Travelers
              </label>
              <select
                className={`w-full bg-transparent outline-none ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                <option className="text-black">1 Guest</option>
                <option className="text-black">2 Guests</option>
                <option className="text-black">3 Guests</option>
                <option className="text-black">4+ Guests</option>
              </select>
            </div>

            <Link
              to="/locations"
              className="rounded-2xl bg-sky-500 px-6 py-4 text-center text-sm font-semibold text-white transition duration-300 hover:bg-sky-400"
            >
              Search Trips
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Destinations from Database */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p
              className={`text-sm font-medium uppercase tracking-[0.3em] ${theme.sectionSub}`}
            >
              Popular Destinations
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Explore handpicked places
            </h2>
          </div>
          <p className={`max-w-2xl ${theme.sectionDesc}`}>
            Discover iconic destinations chosen from your database for beauty,
            comfort, and unforgettable experiences.
          </p>
        </div>

        {loadingLocations ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className={`overflow-hidden rounded-[2rem] border ${theme.card}`}
              >
                <div
                  className={`h-72 w-full animate-pulse ${theme.skeletonBox}`}
                />
                <div className="p-6">
                  <div
                    className={`h-7 w-3/4 animate-pulse rounded ${theme.skeletonBox}`}
                  />
                  <div
                    className={`mt-4 h-4 w-1/2 animate-pulse rounded ${theme.skeletonBox}`}
                  />
                  <div
                    className={`mt-4 h-4 w-full animate-pulse rounded ${theme.skeletonBox}`}
                  />
                  <div
                    className={`mt-2 h-4 w-5/6 animate-pulse rounded ${theme.skeletonBox}`}
                  />
                  <div
                    className={`mt-5 h-10 w-32 animate-pulse rounded-full ${theme.skeletonBox}`}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : locations.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {locations.slice(0, 6).map((item) => (
              <Link
                key={item._id}
                to={`/locations/${item._id}`}
                className={`group overflow-hidden rounded-[2rem] border shadow-xl transition duration-300 hover:-translate-y-2 ${theme.card} ${
                  isDarkMode
                    ? "hover:border-sky-400/40"
                    : "hover:border-sky-300"
                }`}
              >
                <div className="overflow-hidden">
                  <img
                    src={
                      item.image ||
                      "https://via.placeholder.com/800x600?text=Location"
                    }
                    alt={item.title}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className={`text-2xl font-semibold ${theme.cardTitle}`}>
                      {item.title}
                    </h3>
                    {item.isFeatured && (
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${theme.featuredBadge}`}
                      >
                        Featured
                      </span>
                    )}
                  </div>

                  <p className={`mt-2 text-sm ${theme.cardSub}`}>
                    {item.city}, {item.country}
                  </p>

                  <p
                    className={`mt-3 line-clamp-3 text-sm leading-6 ${theme.cardDesc}`}
                  >
                    {item.shortDescription || item.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div>
                      <p className={`text-sm ${theme.cardDesc}`}>
                        Starting from
                      </p>
                      <p className="text-lg font-bold text-sky-300">
                        ₹ {item.pricePerNight} / night
                      </p>
                    </div>

                    <span
                      className={`rounded-full border px-5 py-2 text-sm font-medium transition ${theme.outlineBtn}`}
                    >
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div
            className={`rounded-3xl border border-dashed p-10 text-center ${theme.emptyBox}`}
          >
            <h3 className="text-2xl font-semibold">No locations available</h3>
            <p className={`mt-3 ${theme.sectionDesc}`}>
              Add locations in your database and they will appear here
              automatically.
            </p>
          </div>
        )}

        {!loadingLocations && locations.length > 6 && (
          <div className="mt-10 flex justify-center">
            <Link
              to="/locations"
              className="rounded-full bg-sky-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:bg-sky-400"
            >
              View All Destinations
            </Link>
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className={theme.whySection}>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p
              className={`text-sm font-medium uppercase tracking-[0.3em] ${theme.sectionSub}`}
            >
              Why Choose Us
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Travel redefined for modern explorers
            </h2>
            <p className={`mx-auto mt-4 max-w-3xl ${theme.sectionDesc}`}>
              From luxury escapes to personalized itineraries, we create travel
              experiences that are smooth, stylish, and unforgettable.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className={`rounded-[2rem] border p-7 shadow-lg backdrop-blur-md transition duration-300 ${theme.serviceCard}`}
              >
                <div
                  className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${theme.serviceIcon}`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className={`mt-3 text-sm leading-6 ${theme.sectionDesc}`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p
            className={`text-sm font-medium uppercase tracking-[0.3em] ${theme.sectionSub}`}
          >
            Travel Styles
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Find the experience you love
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {experiences.map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-[2rem] border ${theme.experienceBorder}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="text-2xl font-semibold text-white">
                  {item.title}
                </h3>
                <button className="mt-3 rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-sky-500">
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offer Banner */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div
          className={`mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[2rem] border md:grid-cols-2 ${theme.offerWrap}`}
        >
          <div className="p-8 sm:p-12 lg:p-16">
            <p
              className={`text-sm font-medium uppercase tracking-[0.3em] ${theme.sectionSub}`}
            >
              Exclusive Offer
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Plan your next escape with special seasonal deals
            </h2>
            <p className={`mt-5 max-w-xl ${theme.sectionDesc}`}>
              Enjoy limited-time offers on premium destinations, luxury stays,
              and curated travel packages designed for unforgettable memories.
            </p>
            <Link
              to="/locations"
              className="mt-8 inline-block rounded-full bg-sky-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              Book Special Package
            </Link>
          </div>

          <div className="min-h-[320px]">
            <img
              src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1400&q=80"
              alt="Travel offer"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={theme.testimonialSection}>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p
              className={`text-sm font-medium uppercase tracking-[0.3em] ${theme.sectionSub}`}
            >
              Testimonials
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              What our travelers say
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className={`rounded-[2rem] border p-7 backdrop-blur-md ${theme.testimonialCard}`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className={`text-sm ${theme.testimonialSub}`}>
                      Happy Traveler
                    </p>
                  </div>
                </div>
                <p
                  className={`mt-5 text-sm leading-7 ${theme.testimonialText}`}
                >
                  “{item.message}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div
          className={`rounded-[2rem] border p-8 shadow-2xl backdrop-blur-md sm:p-12 ${theme.newsletterWrap}`}
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p
                className={`text-sm font-medium uppercase tracking-[0.3em] ${theme.sectionSub}`}
              >
                Stay Inspired
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Get travel inspiration and exclusive offers
              </h2>
              <p className={`mt-4 max-w-2xl ${theme.newsletterText}`}>
                Subscribe to receive destination ideas, luxury deals, and expert
                travel updates straight to your inbox.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email address"
                className={`w-full rounded-full border px-6 py-4 outline-none ${theme.newsletterInput}`}
              />
              <button className="rounded-full bg-sky-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-sky-400">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
