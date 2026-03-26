import { useState, useEffect } from "react";
import { Mail, Phone, Calendar, Shield, ShieldOff, Loader2, Trash2, Search } from "lucide-react";
import { db } from "../../services/firebase"; 
import { collection, onSnapshot, doc, deleteDoc, updateDoc, query } from "firebase/firestore";

export function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. READ: Listen to the 'users' collection
  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. DELETE: Remove a user account
  const handleDelete = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user account?")) {
      await deleteDoc(doc(db, "users", userId));
    }
  };

  // 3. UPDATE: Change account status
  const handleStatusChange = async (userId: string, newStatus: string) => {
    await updateDoc(doc(db, "users", userId), { accountStatus: newStatus });
  };

  // Filter users by name or email
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-[#0F62FE]" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">View and manage all registered TravelRa customers</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0F62FE] outline-none w-64"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-[#0F62FE] rounded-lg"><Shield size={24}/></div>
            <div>
              <p className="text-sm text-gray-500">Total Registered</p>
              <h3 className="text-2xl font-bold">{users.length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">User Info</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Contact Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#0F62FE] text-white rounded-full flex items-center justify-center font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={14} /> {user.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={14} /> {user.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      user.accountStatus === "Suspended" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    }`}>
                      {user.accountStatus || "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <select 
                        defaultValue={user.accountStatus || "Active"}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                        className="text-xs border rounded p-1"
                      >
                        <option value="Active">Active</option>
                        <option value="Suspended">Suspend</option>
                      </select>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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