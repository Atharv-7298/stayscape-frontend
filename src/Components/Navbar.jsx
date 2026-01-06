import { useEffect, useState } from "react";
import { Home, Menu, User, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TABS = [
  { id: "stays", label: "Stays" },
  { id: "explore", label: "Explore" },
  { id: "experiences", label: "Experiences" },
  { id: "about", label: "About us" },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("stays");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const goTo = (path) => {
    setOpen(false);
    navigate(path);
  };

  const scrollToSection = (id) => {
    setActiveTab(id);
    setOpen(false);

    const scroll = () => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 300);
    } else {
      scroll();
    }
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300
      ${
        scrolled
          ? "backdrop-blur-xl bg-[#0b1220]/80 border-b border-white/10"
          : "backdrop-blur-md bg-[#0b1220]/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">
          {/* LOGO */}
          <div
            onClick={() => goTo("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
              <Home className="w-5 h-5 text-black" />
            </div>
            <span className="text-2xl font-semibold text-teal-400">
              StayScape
            </span>
          </div>

          {/* CENTER TABS */}
          <div className="hidden md:flex items-center gap-1 px-2 py-2 rounded-full bg-white/5 backdrop-blur-xl">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition cursor-pointer 
                  ${
                    activeTab === tab.id
                      ? "text-teal-300 bg-teal-500/20"
                      : "text-gray-300 hover:text-white"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            {/* ✅ MY BOOKINGS BUTTON (SEPARATE) */}
            {user && (
              <button
                onClick={() => navigate("/my-bookings")}
                className="cursor-pointer hidden md:block px-5 py-2 rounded-full
                text-sm font-medium text-white
                bg-white/5 hover:bg-teal-500/50 border border-white/10"
              >
                My Bookings
              </button>
            )}

            {user && (
              <button
                onClick={() => navigate("/favorites")}
                className="cursor-pointer px-5 py-2 rounded-full bg-white/5 text-white hover:bg-teal-500/50"
              >
                Favorites ❤️
              </button>
            )}

            {/* PROFILE MENU */}
            <div className="relative">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="cursor-pointer  flex items-center gap-2 px-3 py-2 rounded-full
                bg-white/5 hover:bg-white/10 border border-white/10"
              >
                <Menu className="w-4 h-4 text-white" />
                <User className="w-5 h-5 text-white" />
              </button>

              {open && (
                <div
                  className="absolute right-0 top-14 w-48 rounded-xl
                  bg-[#121826] border border-white/10 overflow-hidden"
                >
                  {user ? (
                    <>
                      <div className="px-4 py-3 text-sm text-gray-300">
                        Logged in as
                        <br />
                        <span className="text-white font-medium">
                          {user.name}
                        </span>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="cursor-pointer w-full px-4 py-3 flex items-center gap-2
                        text-red-400 hover:bg-white/10"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => goTo("/auth?mode=signup")}
                        className="cursor-pointer w-full px-4 py-3 text-left text-white hover:bg-white/10"
                      >
                        Sign up
                      </button>
                      <button
                        onClick={() => goTo("/auth?mode=signin")}
                        className="cursor-pointer w-full px-4 py-3 text-left text-white hover:bg-white/10"
                      >
                        Log in
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
