import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated, getToken } from "../utils/auth";
import { Users, Bed, Bath, Calendar } from "lucide-react";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/properties/${id}`
        );
        if (!res.ok) throw new Error("Property not found");
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleReserve = async () => {
    if (!isAuthenticated()) {
      navigate("/auth?mode=signin");
      return;
    }

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    const nights =
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);

    if (nights <= 0) {
      alert("Invalid dates");
      return;
    }

    const totalPrice = nights * property.price;

    try {
      setBookingLoading(true);

      const orderRes = await fetch(
        `${import.meta.env.VITE_API_URL}/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ amount: totalPrice }),
        }
      );

      const order = await orderRes.json();

      if (!order.id) {
        throw new Error("Failed to create payment order");
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "StayScape",
        description: "Property Booking",
        order_id: order.id,

        handler: async function (response) {
          await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify({
              property: property._id,
              checkIn,
              checkOut,
              guests,
              totalPrice,
              paymentId: response.razorpay_payment_id,
            }),
          });

          alert("Payment Successful 🎉");
          navigate("/my-bookings");
        },

        theme: { color: "#14b8a6" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      alert(err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-12 pt-28">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-[420px] object-cover rounded-3xl mb-6"
          />

          <h1 className="text-3xl font-bold mb-1">{property.title}</h1>
          <p className="text-gray-400 mb-4">{property.location}</p>

          <div className="flex flex-wrap gap-6 text-sm text-gray-300 mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-400" />
              {property.guests} guests
            </div>
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-teal-400" />
              {property.bedrooms} bedrooms · {property.beds} beds
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4 text-teal-400" />
              {property.baths} baths
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-3">About this place</h2>
            <p className="text-gray-300 leading-relaxed">{property.about}</p>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 gap-y-3 text-gray-300">
              {property.amenities.map((a, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky top-28 h-fit">
          <div className="rounded-3xl p-6 bg-white/5 border border-white/10">
            <div className="text-2xl font-bold mb-6">
              ${property.price}
              <span className="text-gray-400 text-sm"> / night</span>
            </div>

            <div className="relative mb-4">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full pl-10 bg-transparent border border-white/10 p-3 rounded-xl text-white"
              />
            </div>

            <div className="relative mb-4">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full pl-10 bg-transparent border border-white/10 p-3 rounded-xl text-white"
              />
            </div>

            <div className="relative mb-6">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full pl-10 bg-transparent border border-white/10 p-3 rounded-xl text-white"
                placeholder="Guests"
              />
            </div>

            <button
              onClick={handleReserve}
              disabled={bookingLoading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-black font-semibold"
            >
              {bookingLoading ? "Booking..." : "Book"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
