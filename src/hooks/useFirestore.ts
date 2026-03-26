import { useState } from 'react';
import { db } from '../services/firebase.ts'; // Ensure this path matches your firebase config
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';

export const useFirestore = (collectionName: string) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  // 1. ADD NEW DATA
  const addData = async (data: any) => {
    setError(null);
    setIsPending(true);
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp()
      });
      setIsPending(false);
      return docRef;
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
      return null;
    }
  };

  // 2. DELETE DATA
  const deleteData = async (id: string) => {
    setError(null);
    setIsPending(true);
    try {
      await deleteDoc(doc(db, collectionName, id));
      setIsPending(false);
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
    }
  };

  // 3. UPDATE DATA
  const updateData = async (id: string, updates: any) => {
    setError(null);
    setIsPending(true);
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, updates);
      setIsPending(false);
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { addData, deleteData, updateData, error, isPending };
};