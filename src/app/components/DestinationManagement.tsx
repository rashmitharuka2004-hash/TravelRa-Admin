import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, MapPin, Loader2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { db, storage } from "../../services/firebase.ts"; 
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function DestinationManagement() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form States - Changed to match Android fields: title, description
  const [formData, setFormData] = useState({ title: "", description: "", category: "Popular" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // 1. READ: Matches the collection name used in your Android HomeActivity
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "popular_destinations"), (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDestinations(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. CREATE / UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      let currentImageUrl = editingId ? (destinations.find(d => d.id === editingId)?.imageUrl || "") : "";

      if (imageFile) {
        // Upload to Firebase Storage
        const imageRef = ref(storage, `destinations/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        currentImageUrl = await getDownloadURL(imageRef);
      }

      // Payload fields must match Destination.java model exactly
      const dataToSave = { 
        ...formData, 
        imageUrl: currentImageUrl 
      };

      if (editingId) {
        await updateDoc(doc(db, "popular_destinations", editingId), dataToSave);
      } else {
        await addDoc(collection(db, "popular_destinations"), dataToSave);
      }

      setShowAddForm(false);
      setEditingId(null);
      setFormData({ title: "", description: "", category: "Popular" });
    } catch (error) {
      console.error("Error saving destination:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      await deleteDoc(doc(db, "popular_destinations", id));
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-[#0F62FE]" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Destination Management</h1>
        <button 
          onClick={() => { setShowAddForm(true); setEditingId(null); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#0F62FE] text-white rounded-lg"
        >
          <Plus /> Add Destination
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 border rounded-lg shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">{editingId ? 'Edit' : 'Add'} Destination</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Destination Title (e.g., Sigiriya)" 
              className="w-full p-2 border rounded" required 
            />
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Description" 
              className="w-full p-2 border rounded" 
            />
            <input type="file" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full" />
            <button disabled={uploading} className="bg-[#0F62FE] text-white px-6 py-2 rounded-lg">
              {uploading ? "Saving to Cloud..." : "Save Destination"}
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <div key={dest.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
            <img src={dest.imageUrl} alt={dest.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-bold flex items-center gap-2"><MapPin size={16} className="text-[#0F62FE]"/> {dest.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mt-2">{dest.description}</p>
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => { setEditingId(dest.id); setFormData({title: dest.title, description: dest.description, category: dest.category}); setShowAddForm(true); }}
                  className="flex-1 bg-gray-50 text-gray-700 py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-100"
                >
                  <Edit size={14}/> Edit
                </button>
                <button 
                  onClick={() => handleDelete(dest.id)}
                  className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                >
                  <Trash2 size={16}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}