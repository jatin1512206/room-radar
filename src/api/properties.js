import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDb, getFirebaseStorage } from '@/lib/firebase';

const COLLECTION = 'properties';
const STORAGE_PREFIX = 'property-images';

function mapPropertyDoc(docSnap) {
  const data = docSnap.data();
  const createdAt = data.created_at?.toDate?.();
  return {
    id: docSnap.id,
    ...data,
    created_date: createdAt ? createdAt.toISOString() : data.created_date ?? null,
  };
}

function stripEmpty(obj) {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === '' || value === undefined) continue;
    if (Array.isArray(value) && value.length === 0) continue;
    out[key] = value;
  }
  return out;
}

export async function listProperties(maxCount = 300) {
  const db = getDb();
  if (!db) throw new Error('Firebase is not configured');

  const q = query(
    collection(db, COLLECTION),
    orderBy('created_at', 'desc'),
    limit(maxCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapPropertyDoc);
}

export async function getProperty(id) {
  const db = getDb();
  if (!db) throw new Error('Firebase is not configured');

  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return mapPropertyDoc(snap);
}

export async function createProperty(data) {
  const db = getDb();
  if (!db) throw new Error('Firebase is not configured');

  const payload = stripEmpty({
    ...data,
    is_verified: data.is_verified ?? false,
    is_featured: data.is_featured ?? false,
    rating: data.rating ?? 0,
    total_reviews: data.total_reviews ?? 0,
    created_at: serverTimestamp(),
  });

  const docRef = await addDoc(collection(db, COLLECTION), payload);
  return { id: docRef.id, ...data };
}

export async function uploadPropertyImage(file) {
  const storage = getFirebaseStorage();
  if (!storage) throw new Error('Firebase is not configured');

  const ext = file.name?.split('.').pop() || 'jpg';
  const path = `${STORAGE_PREFIX}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const file_url = await getDownloadURL(storageRef);
  return { file_url };
}
