import React from "react";

const experiences = [
  {
    id: 1,
    image: "/cooking-class-chef-kitchen.jpg",
    title: "Italian Cooking Class with Chef Marco",
    host: "Hosted by Marco",
    price: 85,
    duration: "3 hours",
  },
  {
    id: 2,
    image: "/surfing-lesson-beach-sunset.jpg",
    title: "Private Surfing Lessons at Sunrise",
    host: "Hosted by Elena",
    price: 120,
    duration: "2 hours",
  },
  {
    id: 3,
    image: "/wine-tasting-vineyard-evening.jpg",
    title: "Wine Tasting in Historic Vineyard",
    host: "Hosted by Jean-Pierre",
    price: 95,
    duration: "4 hours",
  },
  {
    id: 4,
    image: "/yoga-meditation-mountain-sunrise.jpg",
    title: "Sunrise Yoga & Meditation Retreat",
    host: "Hosted by Aria",
    price: 60,
    duration: "2 hours",
  },
];

const Experiences = () => {
  return (
    <section className="px-6 py-14 bg-gradient-to-b from-[#050b14] to-[#020617]">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-white">
              Unique <span className="text-teal-400">Experiences</span>
            </h2>
            <p className="text-gray-400 mt-2">
              Discover activities hosted by locals to make your trip unforgettable.
            </p>
          </div>

          <button className="text-teal-400 hover:text-teal-300 text-sm font-medium">
            View all experiences →
          </button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative h-[420px] rounded-2xl overflow-hidden
                         cursor-pointer group
                         transition-transform duration-500
                         hover:-translate-y-2"
            >
              {/* IMAGE */}
              <img
                src={exp.image}
                alt={exp.title}
                className="absolute inset-0 w-full h-full object-cover
                           transition-transform duration-700
                           group-hover:scale-110"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t
                              from-black/90 via-black/40 to-transparent" />

              {/* CONTENT */}
              <div className="absolute bottom-0 p-5">
                <h3 className="text-white font-semibold text-lg leading-snug mb-1">
                  {exp.title}
                </h3>

                <p className="text-gray-300 text-sm mb-3">
                  {exp.host}
                </p>

                <div className="flex items-baseline gap-1">
                  <span className="text-white font-bold text-lg">
                    ${exp.price}
                  </span>
                  <span className="text-gray-400 text-sm">
                    / person
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experiences;
