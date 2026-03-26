import { useState, useEffect } from "react";
import { Filter, MapPin, Navigation, Loader2, CheckCircle, Clock, XCircle } from "lucide-react";
import { db } from "../../services/firebase"; 
import { collection, onSnapshot, doc, updateDoc, query, orderBy } from "firebase/firestore";

export function BookingManagement() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  
  const filters = ["All", "Pending", "Approved", "In Progress", "Completed", "Cancelled"];

  // 1. READ: Listen to taxi_bookings from Firebase
  useEffect(() => {
    const q = query(collection(db, "taxi_bookings"), orderBy("bookingId", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. UPDATE: Change Booking Status
  const handleStatusChange = async (docId: string, newStatus: string) => {
    try {
      const bookingRef = doc(db, "taxi_bookings", docId);
      await updateDoc(bookingRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredBookings = activeFilter === "All" 
    ? bookings 
    : bookings.filter(b => b.status === activeFilter);

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-[#0F62FE]" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Management</h1>
        <p className="text-gray-600">Manage and track all customer taxi bookings</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Status:</span>
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 text-sm rounded-full transition-all ${
                  activeFilter === f ? "bg-[#0F62FE] text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">ID / User</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Route Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Vehicle / Fare</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{booking.bookingId}</div>
                    <div className="text-xs text-gray-500">{booking.user || "Guest User"}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2 mb-1">
                      <MapPin size={14} className="text-green-600 mt-1" />
                      <span className="text-sm text-gray-600 line-clamp-1">{booking.pickup}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Navigation size={14} className="text-red-600 mt-1" />
                      <span className="text-sm text-gray-600 line-clamp-1">{booking.dropoff}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{booking.vehicle}</div>
                    <div className="text-sm text-[#0F62FE] font-bold">${booking.amount}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      booking.status === "Completed" ? "bg-green-100 text-green-700" :
                      booking.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                      booking.status === "Cancelled" ? "bg-red-100 text-red-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                      className="text-sm border rounded-lg px-2 py-1 bg-white focus:ring-2 focus:ring-[#0F62FE] outline-none"
                    >
                      {filters.filter(f => f !== "All").map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}