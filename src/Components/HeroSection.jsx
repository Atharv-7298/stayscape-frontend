import { useState } from "react";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import homeImage from "../assets/home.png";
import { useSearch } from "../context/SearchContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  const { setSearchLocation } = useSearch();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSearch = () => {
    // 🔒 Require login
    if (!user) {
      navigate("/auth?mode=signin");
      return;
    }

    // 🔍 Save location for filtering
    setSearchLocation(location.trim().toLowerCase());

    // ⬇️ Scroll to listings section
    document.getElementById("listings")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="stays"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 px-4"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div
          style={{ backgroundImage: `url(${homeImage})` }}
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/40 via-[#020617]/70 to-[#020617]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl w-full text-center">
        <h1
          className="text-5xl md:text-7xl font-extrabold mb-6
          bg-gradient-to-r from-white via-teal-200 to-cyan-300
          bg-clip-text text-transparent"
        >
          Find your next stay
        </h1>

        <p className="text-lg md:text-2xl text-gray-300 mb-12">
          Discover unique homes and experiences around the world
        </p>

        {/* SEARCH CARD */}
        {/* SEARCH CARD */}
        <div
          className="rounded-3xl p-6 md:p-8 max-w-5xl mx-auto
  bg-white/5 backdrop-blur-xl border border-white/10
  shadow-[0_0_60px_rgba(0,0,0,0.6)]"
        >
          {/* INPUT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* LOCATION */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm text-gray-300">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where to?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl
            bg-white/5 border border-white/10 text-white
            placeholder:text-gray-500
            focus:outline-none focus:border-teal-400/50
            focus:ring-2 focus:ring-teal-400/20 transition"
                />
              </div>
            </div>

            {/* CHECK IN */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm text-gray-300">Check in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl
            bg-white/5 border border-white/10 text-white
            focus:outline-none focus:border-teal-400/50
            focus:ring-2 focus:ring-teal-400/20 transition"
                />
              </div>
            </div>

            {/* CHECK OUT */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm text-gray-300">Check out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl
            bg-white/5 border border-white/10 text-white
            focus:outline-none focus:border-teal-400/50
            focus:ring-2 focus:ring-teal-400/20 transition"
                />
              </div>
            </div>

            {/* GUESTS */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm text-gray-300">Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  placeholder="Add guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl
            bg-white/5 border border-white/10 text-white
            placeholder:text-gray-500
            focus:outline-none focus:border-teal-400/50
            focus:ring-2 focus:ring-teal-400/20 transition"
                />
              </div>
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <button
            onClick={handleSearch}
            className="cursor-pointer w-full mt-6 h-14 rounded-xl text-lg font-semibold
    flex items-center justify-center gap-2
    bg-gradient-to-r from-teal-500 to-cyan-500
    text-white
    shadow-[0_0_30px_rgba(94,234,212,0.4)]
    hover:shadow-[0_0_45px_rgba(94,234,212,0.6)]
    hover:from-teal-600 hover:to-cyan-600
    transition-all duration-300"
          >
            <Search className="w-5 h-5" />
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
