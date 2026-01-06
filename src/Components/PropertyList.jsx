import { useEffect, useState } from "react";
import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";

const FeaturedListings = ({ selectedCategory }) => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  const { searchLocation } = useSearch();
  const { user } = useAuth();
  const { wishlist, toggleWishlist, loading } = useWishlist();

  // 🔹 Fetch ALL properties once
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/properties`
        );
        const data = await res.json();
        setListings(data);
      } catch (err) {
        console.error("Failed to fetch properties", err);
      }
    };

    fetchListings();
  }, []);

  // 🔹 Location + Category frontend filtering
  const filteredListings = listings.filter((listing) => {
    const matchLocation = searchLocation
      ? listing.location
          ?.toLowerCase()
          .includes(searchLocation.toLowerCase())
      : true;

    const matchCategory = selectedCategory
      ? listing.category === selectedCategory
      : true;

    return matchLocation && matchCategory;
  });

  const handleFavorite = (e, propertyId) => {
    e.stopPropagation();

    if (!user) {
      navigate("/auth?mode=signin");
      return;
    }

    toggleWishlist(propertyId);
  };

  const isFavorite = (id) =>
    Array.isArray(wishlist) &&
    wishlist.some((item) => item._id === id);

  return (
    <section id="listings" className="py-16 px-6 bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Featured stays
          </h2>
          <p className="text-gray-400">
            Hand-picked properties with exceptional reviews
          </p>
        </div>

        {filteredListings.length === 0 ? (
          <p className="text-gray-400">No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div
                key={listing._id}
                onClick={() => navigate(`/property/${listing._id}`)}
                className="cursor-pointer group rounded-3xl overflow-hidden
                bg-white/5 backdrop-blur-md border border-white/10"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />

                  <button
                    onClick={(e) => handleFavorite(e, listing._id)}
                    disabled={loading}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full
                    flex items-center justify-center backdrop-blur-md
                    ${
                      isFavorite(listing._id)
                        ? "bg-red-500 text-white"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorite(listing._id) ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="p-6">
                  <p className="text-teal-400 text-sm">
                    {listing.location}
                  </p>

                  <h3 className="text-white font-semibold text-lg">
                    {listing.title}
                  </h3>

                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm">
                      {listing.rating}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="text-white font-bold text-xl">
                      ₹ {listing.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {" "}
                      / night
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedListings;
