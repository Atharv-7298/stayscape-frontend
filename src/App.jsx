import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Navbar from "./Components/Navbar.jsx";
import Hero from "./Components/HeroSection.jsx";
import Category from "./Components/Category.jsx";
import PropertyList from "./Components/PropertyList.jsx";
import Footer from "./Components/Footer.jsx";
import Experiences from "./Components/Experiences.jsx";
import Auth from "./Pages/Auth.jsx";
import PropertyDetails from "./Pages/PropertyDetails.jsx";
import MyBookings from "./Pages/MyBookings.jsx";
import Favorites from "./Pages/Favorites.jsx";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/auth";

  // ✅ CATEGORY STATE HERE
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="bg-[#020617] min-h-screen">
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />

              {/* ✅ PASS STATE */}
              <Category
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />

              {/* ✅ PASS CATEGORY */}
              <PropertyList selectedCategory={selectedCategory} />

              <Experiences />
              <Footer />
            </>
          }
        />

        <Route path="/auth" element={<Auth />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
