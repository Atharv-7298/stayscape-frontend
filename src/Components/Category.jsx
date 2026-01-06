import { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Waves,
  Home,
  Sparkles,
  TrendingUp,
  TreePine,
} from "lucide-react";

const categories = [
  { icon: Waves, label: "Beachfront", color: "from-blue-400 to-cyan-400" },
  { icon: Home, label: "Cabins", color: "from-amber-400 to-orange-400" },
  { icon: Sparkles, label: "Luxe", color: "from-purple-400 to-pink-400" },
  { icon: TrendingUp, label: "Trending", color: "from-teal-400 to-emerald-400" },
  { icon: TreePine, label: "Treehouses", color: "from-green-400 to-teal-400" },
  { icon: Waves, label: "Lakefront", color: "from-cyan-400 to-blue-400" },
  { icon: Home, label: "Countryside", color: "from-lime-400 to-green-400" },
  { icon: Sparkles, label: "Amazing pools", color: "from-sky-400 to-cyan-400" },
];

const Category = ({ selectedCategory, onSelectCategory }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section id="explore" className="py-4 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Explore by category
          </h2>

          <div className="flex gap-2">
            <button onClick={() => scroll("left")} className="nav-btn">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll("right")} className="nav-btn">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CATEGORY SCROLLER */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category.label;

            return (
              <button
                key={category.label}
                onClick={() => onSelectCategory(category.label)}
                className="cursor-pointer flex-shrink-0 group"
              >
                <div
                  className={`w-40 h-40 rounded-2xl p-6
                  flex flex-col items-center justify-center gap-4
                  backdrop-blur-xl border transition-all duration-300
                  ${
                    isActive
                      ? "bg-white/15 border-teal-300 scale-105"
                      : "bg-white/5 border-white/10 hover:border-teal-100"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl
                    bg-gradient-to-br ${category.color}
                    flex items-center justify-center
                    shadow-lg transition-transform duration-300
                    group-hover:scale-110`}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </div>

                  <span className="text-sm font-medium text-white text-center">
                    {category.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Category;
