import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth"; // Import the hook
import logo from "@/assets/logo.png";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  try {
    await login(email, password);
    navigate("/");
  } catch (err: any) {
    // Add this line to see the real error in your browser's Inspect > Console
    console.error("Firebase Login Error:", err.code, err.message);
    setError("Invalid email or password. Please try again.");
  }

  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src={logo} alt="TravelRa Logo" className="h-32 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input 
              type="email" value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="admin@travelra.com"
              className="w-full px-4 py-3 border rounded-lg" required 
            />
            <input 
              type="password" value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              className="w-full px-4 py-3 border rounded-lg" required 
            />
            <button type="submit" className="w-full bg-[#0F62FE] text-white py-3 rounded-lg">
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
      {/* Background image code remains same as your original LoginPage.tsx */}
    </div>
  );
}