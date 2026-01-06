import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/auth?mode=signin");
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/bookings/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate, token]);

  const cancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to cancel booking");
      }

      setBookings((prev) =>
        prev.filter((booking) => booking._id !== bookingId)
      );

      alert("Booking cancelled successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <p className="text-gray-400">No bookings yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
              >
                <img
                  src={booking.property?.image}
                  alt={booking.property?.title}
                  className="h-56 w-full object-cover"
                />

                <div className="flex flex-row justify-center items-center gap-22">
                  <div className="p-5">
                    <h2 className="text-lg font-semibold">
                      {booking.property?.title}
                    </h2>

                    <p className="text-gray-400 text-sm mb-2">
                      {booking.property?.location}
                    </p>

                    <p className="text-sm text-gray-300">
                      📅 {new Date(booking.checkIn).toDateString()} →{" "}
                      {new Date(booking.checkOut).toDateString()}
                    </p>

                    <p className="mt-2 font-semibold">${booking.totalPrice}</p>
                  </div>

                  <div>
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="mt-4 px-4 py-2 rounded-lg text-sm
                      bg-red-500/20 text-red-400
                      hover:bg-red-500/30 transition"
                    >
                      Cancel Booking
                    </button>
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

export default MyBookings;
