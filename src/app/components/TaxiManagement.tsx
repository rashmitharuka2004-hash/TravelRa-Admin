import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Car, Users, DollarSign, Loader2, Image as ImageIcon } from "lucide-react";
import { db, storage } from "../../services/firebase"; 
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function TaxiManagement() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form States - Optimized for Taxi Booking logic
  const [formData, setFormData] = useState({
    name: "",
    type: "Car",
    capacity: "",
    baseFare: "",
    pricePerKm: "",
    status: "Available"
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // 1. READ: Listen to vehicles collection
  useEffect(() => {
    const q = query(collection(db, "vehicles"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVehicles(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. CREATE / UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      let currentImageUrl = editingId ? (vehicles.find(v => v.id === editingId)?.imageUrl || "") : "";

      if (imageFile) {
        const imageRef = ref(storage, `vehicles/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        currentImageUrl = await getDownloadURL(imageRef);
      }

      const dataToSave = { 
        ...formData, 
        imageUrl: currentImageUrl,
        updatedAt: new Date().toISOString()
      };

      if (editingId) {
        await updateDoc(doc(db, "vehicles", editingId), dataToSave);
      } else {
        await addDoc(collection(db, "vehicles"), dataToSave);
      }

      resetForm();
    } catch (error) {
      console.error("Error saving vehicle:", error);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({ name: "", type: "Car", capacity: "", baseFare: "", pricePerKm: "", status: "Available" });
    setImageFile(null);
  };

  // 3. DELETE
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this vehicle from the fleet?")) {
      await deleteDoc(doc(db, "vehicles", id));
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-[#0F62FE]" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vehicle Management</h1>
          <p className="text-gray-600">Manage your vehicle fleet for tours and transfers</p>
        </div>
        <button
          onClick={() => { setShowAddForm(!showAddForm); setEditingId(null); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#0F62FE] text-white rounded-lg hover:bg-[#0F62FE]/90"
        >
          <Plus className="w-5 h-5" />
          {showAddForm ? "Close Form" : "Add Vehicle"}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">{editingId ? 'Edit' : 'Add New'} Vehicle</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Vehicle Name (e.g. KDH High Roof)" className="w-full p-2 border rounded" required 
            />
            <select 
              value={formData.type} 
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="Car">Car</option>
              <option value="Van">Van</option>
              <option value="Bus">Bus</option>
              <option value="Luxury">Luxury Car</option>
            </select>
            <input 
              type="number" value={formData.capacity} 
              onChange={(e) => setFormData({...formData, capacity: e.target.value})}
              placeholder="Passenger Capacity" className="w-full p-2 border rounded" 
            />
            <input 
              type="number" value={formData.baseFare} 
              onChange={(e) => setFormData({...formData, baseFare: e.target.value})}
              placeholder="Base Fare ($)" className="w-full p-2 border rounded" 
            />
            <input 
              type="number" value={formData.pricePerKm} 
              onChange={(e) => setFormData({...formData, pricePerKm: e.target.value})}
              placeholder="Price Per KM ($)" className="w-full p-2 border rounded" 
            />
            <select 
              value={formData.status} 
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="Available">Available</option>
              <option value="In Service">In Service</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            <input type="file" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="md:col-span-2" />
            
            <div className="flex gap-3">
              <button disabled={uploading} type="submit" className="px-6 py-2 bg-[#0F62FE] text-white rounded-lg">
                {uploading ? "Uploading..." : "Save Vehicle"}
              </button>
              <button type="button" onClick={resetForm} className="px-6 py-2 bg-gray-100 rounded-lg">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pricing</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    {vehicle.imageUrl ? (
                      <img src={vehicle.imageUrl} className="w-10 h-10 rounded object-cover" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center"><ImageIcon size={20}/></div>
                    )}
                    <span className="font-medium">{vehicle.name}</span>
                  </td>
                  <td className="px-6 py-4 text-sm">{vehicle.type}</td>
                  <td className="px-6 py-4 text-sm"><Users size={14} className="inline mr-1"/> {vehicle.capacity}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="text-gray-900 font-medium">${vehicle.baseFare} Base</div>
                    <div className="text-gray-500 text-xs">${vehicle.pricePerKm}/km</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      vehicle.status === "Available" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { setEditingId(vehicle.id); setFormData({...vehicle}); setShowAddForm(true); }}
                        className="p-1 text-[#0F62FE] hover:bg-blue-50 rounded"
                      >
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(vehicle.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 size={18} />
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