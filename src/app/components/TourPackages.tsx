import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, MapPin, Clock, DollarSign, Users, Loader2, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { db, storage } from "../../services/firebase"; 
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function TourPackages() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form States - Matching Android TourPackage.java fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    places: "",
    rating: "5.0",
    status: "Active"
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // 1. READ: Fetch from tour_packages collection
  useEffect(() => {
    const q = query(collection(db, "tour_packages"), orderBy("title", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPackages(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. CREATE / UPDATE Logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      let currentImageUrl = editingId ? (packages.find(p => p.id === editingId)?.imageUrl || "") : "";

      if (imageFile) {
        const imageRef = ref(storage, `tour_packages/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        currentImageUrl = await getDownloadURL(imageRef);
      }

      const dataToSave = { 
        ...formData, 
        imageUrl: currentImageUrl 
      };

      if (editingId) {
        await updateDoc(doc(db, "tour_packages", editingId), dataToSave);
      } else {
        await addDoc(collection(db, "tour_packages"), dataToSave);
      }

      resetForm();
    } catch (error) {
      console.error("Error saving package:", error);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({ title: "", description: "", duration: "", price: "", places: "", rating: "5.0", status: "Active" });
    setImageFile(null);
  };

  // 3. DELETE Logic
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this tour package?")) {
      await deleteDoc(doc(db, "tour_packages", id));
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-[#0F62FE]" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tour Package Management</h1>
          <p className="text-gray-600">Update packages for the TravelRa Android app</p>
        </div>
        <button
          onClick={() => { setShowAddForm(!showAddForm); setEditingId(null); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#0F62FE] text-white rounded-lg hover:bg-[#0F62FE]/90"
        >
          <Plus className="w-5 h-5" />
          {showAddForm ? "Close Form" : "Add Package"}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">{editingId ? 'Edit' : 'Add New'} Tour Package</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Package Title" className="w-full p-2 border rounded" required 
            />
            <input 
              value={formData.duration} 
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              placeholder="Duration (e.g. 3 Days)" className="w-full p-2 border rounded" 
            />
            <input 
              type="number" value={formData.price} 
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              placeholder="Price ($)" className="w-full p-2 border rounded" 
            />
            <input 
              value={formData.rating} 
              onChange={(e) => setFormData({...formData, rating: e.target.value})}
              placeholder="Rating (e.g. 4.8)" className="w-full p-2 border rounded" 
            />
            <div className="md:col-span-2">
              <textarea 
                value={formData.places} 
                onChange={(e) => setFormData({...formData, places: e.target.value})}
                placeholder="Included Places (comma separated)" className="w-full p-2 border rounded" rows={2} 
              />
            </div>
            <div className="md:col-span-2">
              <textarea 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Full Description" className="w-full p-2 border rounded" rows={3} 
              />
            </div>
            <input type="file" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="md:col-span-2" />
            
            <div className="flex gap-3">
              <button disabled={uploading} type="submit" className="px-6 py-2 bg-[#0F62FE] text-white rounded-lg">
                {uploading ? "Processing..." : "Save Package"}
              </button>
              <button type="button" onClick={resetForm} className="px-6 py-2 bg-gray-100 rounded-lg">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="relative h-48">
              <ImageWithFallback src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                <Star size={12} fill="black"/> {pkg.rating}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
              <div className="grid grid-cols-2 gap-y-2 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Clock size={16}/> {pkg.duration}</div>
                <div className="flex items-center gap-2"><DollarSign size={16}/> ${pkg.price}</div>
                <div className="flex items-center gap-2 col-span-2"><MapPin size={16}/> {pkg.places}</div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">{pkg.description}</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => { setEditingId(pkg.id); setFormData({ ...pkg }); setShowAddForm(true); }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#0F62FE] text-white rounded-lg"
                >
                  <Edit size={16} /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(pkg.id)}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}