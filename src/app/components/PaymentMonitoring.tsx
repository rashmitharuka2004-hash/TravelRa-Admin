import { CreditCard, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 12500, id: 1 },
  { month: "Feb", revenue: 14800, id: 2 },
  { month: "Mar", revenue: 13200, id: 3 },
  { month: "Apr", revenue: 17600, id: 4 },
  { month: "May", revenue: 21300, id: 5 },
  { month: "Jun", revenue: 25800, id: 6 },
];

const payments = [
  {
    id: "PAY-10345",
    bookingId: "BK-10234",
    user: "John Smith",
    amount: "$85",
    paymentMethod: "Credit Card",
    status: "Completed",
    date: "2026-03-15 14:35"
  },
  {
    id: "PAY-10346",
    bookingId: "BK-10235",
    user: "Sarah Johnson",
    amount: "$45",
    paymentMethod: "PayPal",
    status: "Completed",
    date: "2026-03-15 10:05"
  },
  {
    id: "PAY-10347",
    bookingId: "BK-10236",
    user: "Mike Davis",
    amount: "$25",
    paymentMethod: "Cash",
    status: "Pending",
    date: "2026-03-14 16:50"
  },
  {
    id: "PAY-10348",
    bookingId: "BK-10237",
    user: "Emily Wilson",
    amount: "$65",
    paymentMethod: "Debit Card",
    status: "Completed",
    date: "2026-03-14 08:20"
  },
  {
    id: "PAY-10349",
    bookingId: "BK-10238",
    user: "David Brown",
    amount: "$55",
    paymentMethod: "Credit Card",
    status: "Refunded",
    date: "2026-03-13 12:10"
  },
  {
    id: "PAY-10350",
    bookingId: "BK-10239",
    user: "Lisa Anderson",
    amount: "$35",
    paymentMethod: "Apple Pay",
    status: "Completed",
    date: "2026-03-13 09:35"
  },
  {
    id: "PAY-10351",
    bookingId: "BK-10240",
    user: "Robert Taylor",
    amount: "$120",
    paymentMethod: "Credit Card",
    status: "Failed",
    date: "2026-03-12 15:20"
  },
  {
    id: "PAY-10352",
    bookingId: "BK-10241",
    user: "Jennifer Martinez",
    amount: "$95",
    paymentMethod: "Google Pay",
    status: "Completed",
    date: "2026-03-12 11:45"
  },
];

export function PaymentMonitoring() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Payment Monitoring</h1>
        <p className="text-gray-600">Track and manage payment transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Revenue</span>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl text-gray-900">$105,200</p>
          <p className="text-xs text-green-600 mt-1">+15.3% from last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Completed</span>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl text-gray-900">1,234</p>
          <p className="text-xs text-gray-600 mt-1">Total transactions</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Pending</span>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-2xl text-gray-900">23</p>
          <p className="text-xs text-gray-600 mt-1">Awaiting confirmation</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Avg. Transaction</span>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl text-gray-900">$85.27</p>
          <p className="text-xs text-gray-600 mt-1">Per booking</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg text-gray-900 mb-4">Revenue Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0F62FE" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0F62FE" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#0F62FE" fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Payment Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg text-gray-900">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Payment ID</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline cursor-pointer">
                    {payment.bookingId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{payment.paymentMethod}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        payment.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : payment.status === "Failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-sm text-[#0F62FE] hover:underline">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">8</span> of <span className="font-medium">1,234</span> payments
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 text-sm bg-[#0F62FE] text-white rounded-lg hover:bg-[#0F62FE]/90">
            1
          </button>
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            2
          </button>
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}