// Pages/Favorites.jsx
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] pt-28 px-6 pb-16 text-white">
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center">
          My Favorites ❤️
        </h1>

        {/* EMPTY STATE */}
        {wishlist.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            No favorites yet.
          </p>
        ) : (
          /* GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((p) => (
              <div
                key={p._id}
                onClick={() => navigate(`/property/${p._id}`)}
                className="cursor-pointer group rounded-3xl overflow-hidden
                bg-white/5 backdrop-blur-md border border-white/10
                transition-all duration-500
                hover:-translate-y-2
                hover:shadow-[0_0_40px_rgba(94,234,212,0.15)]"
              >
                {/* IMAGE */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover
                    transition-transform duration-500
                    group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t
                    from-black/60 via-transparent to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <p className="text-teal-400 text-sm font-medium mb-1">
                    {p.location}
                  </p>

                  <h3 className="text-white font-semibold text-lg mb-2">
                    {p.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-xl">
                      ${p.price}
                      <span className="text-gray-400 text-sm ml-1">
                        / night
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Favorites;
