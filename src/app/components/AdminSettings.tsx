import { useState } from "react";
import { User, Lock, Bell, Globe, LogOut, Shield, Mail, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth"; //

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const { logout, user } = useAuth(); //
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout from the TravelRa Admin Panel?")) {
      try {
        await logout(); //
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Settings</h1>
        <p className="text-gray-600">Manage your account and TravelRa system preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50/50">
          <nav className="flex gap-1 p-2">
            {[
              { id: "profile", icon: User, label: "Profile" },
              { id: "security", icon: Lock, label: "Security" },
              { id: "system", icon: Globe, label: "System Info" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-[#0F62FE] text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="max-w-2xl space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-[#0F62FE] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-inner">
                  {user?.email?.charAt(0).toUpperCase() || "A"}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{user?.email || "Administrator"}</h3>
                  <p className="text-sm text-gray-500 mb-4">Super Administrator Access</p>
                  <button className="text-sm font-semibold text-[#0F62FE] hover:underline">Change Admin Photo</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Display Name</label>
                  <input type="text" defaultValue="TravelRa Admin" className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Auth Email</label>
                  <input type="text" value={user?.email || ""} disabled className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500" />
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="max-w-md space-y-8">
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3">
                <Shield className="text-[#0F62FE] shrink-0" />
                <p className="text-sm text-blue-800">Your session is protected by Firebase Authentication.</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Session Actions</h3>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-lg font-bold hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out of Admin Panel
                </button>
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === "system" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2"><Globe size={18} className="text-[#0F62FE]"/> Public Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600"><Mail size={16}/> info@travelratours.com</div>
                    <div className="flex items-center gap-3 text-sm text-gray-600"><Phone size={16}/> +94 70 372 5500</div>
                    <div className="flex items-center gap-3 text-sm text-gray-600"><MapPin size={16}/> Embilipitiya, Sri Lanka</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900">App Version</h3>
                  <div className="p-4 bg-gray-50 rounded-lg text-sm font-mono text-gray-600">
                    TravelRa Android: v1.0.2<br/>
                    Admin Dashboard: v1.0.0
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}