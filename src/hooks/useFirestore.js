import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';

/**
 * Custom hook for real-time Firestore CRUD.
 * @param {string} collectionName - e.g. "workers", "projects", "equipment"
 */
export const useFirestore = (collectionName) => {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // Real-time listener
  useEffect(() => {
    const colRef = collection(db, collectionName);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setData(items);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [collectionName]);

  // ADD
  const addItem = async (itemData) => {
    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, { ...itemData, createdAt: serverTimestamp() });
    return docRef.id;
  };

  // UPDATE
  const updateItem = async (id, itemData) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, { ...itemData, updatedAt: serverTimestamp() });
  };

  // DELETE
  const deleteItem = async (id) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  };

  return { data, loading, error, addItem, updateItem, deleteItem };
};
