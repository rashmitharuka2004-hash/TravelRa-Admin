import { Users, Calendar, DollarSign, Car, MapPin, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const statsCards = [
  { 
    title: "Total Users", 
    value: "2,847", 
    change: "+12.5%", 
    trend: "up", 
    icon: Users, 
    color: "bg-blue-500" 
  },
  { 
    title: "Total Bookings", 
    value: "1,234", 
    change: "+8.2%", 
    trend: "up", 
    icon: Calendar, 
    color: "bg-green-500" 
  },
  { 
    title: "Total Revenue", 
    value: "$45,678", 
    change: "+15.3%", 
    trend: "up", 
    icon: DollarSign, 
    color: "bg-purple-500" 
  },
  { 
    title: "Active Vehicles", 
    value: "87", 
    change: "-2.4%", 
    trend: "down", 
    icon: Car, 
    color: "bg-orange-500" 
  },
  { 
    title: "Tour Packages", 
    value: "42", 
    change: "+5.1%", 
    trend: "up", 
    icon: MapPin, 
    color: "bg-indigo-500" 
  },
];

const bookingsData = [
  { month: "Jan", bookings: 45, revenue: 12500, id: 1 },
  { month: "Feb", bookings: 52, revenue: 14800, id: 2 },
  { month: "Mar", bookings: 48, revenue: 13200, id: 3 },
  { month: "Apr", bookings: 61, revenue: 17600, id: 4 },
  { month: "May", bookings: 72, revenue: 21300, id: 5 },
  { month: "Jun", bookings: 85, revenue: 25800, id: 6 },
];

const recentBookings = [
  { id: "BK-001", user: "John Smith", type: "Airport Transfer", pickup: "Downtown Hotel", drop: "JFK Airport", price: "$85", status: "Completed" },
  { id: "BK-002", user: "Sarah Johnson", type: "City Tour", pickup: "Grand Hotel", drop: "Multiple Stops", price: "$120", status: "In Progress" },
  { id: "BK-003", user: "Mike Davis", type: "Taxi Ride", pickup: "Central Park", drop: "Times Square", price: "$35", status: "Pending" },
  { id: "BK-004", user: "Emily Wilson", type: "Island Tour", pickup: "Beach Resort", drop: "Island Tour", price: "$250", status: "Completed" },
  { id: "BK-005", user: "David Brown", type: "Taxi Ride", pickup: "5th Avenue", drop: "Brooklyn", price: "$45", status: "Cancelled" },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to TravelRa Admin Dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
          return (
            <div key={stat.title} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                <p className="text-2xl text-gray-900 mb-2">{stat.value}</p>
                <div className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  <TrendIcon className="w-4 h-4" />
                  <span>{stat.change}</span>
                  <span className="text-gray-500">vs last month</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg text-gray-900 mb-4">Bookings per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bookingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bookings" stroke="#0F62FE" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg text-gray-900 mb-4">Revenue Statistics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#F4A261" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg text-gray-900">Recent Bookings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Pickup</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Drop</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{booking.pickup}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{booking.drop}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        booking.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
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