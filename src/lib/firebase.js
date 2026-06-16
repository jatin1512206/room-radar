import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const useEmulators = import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export function isFirebaseConfigured() {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.projectId &&
      firebaseConfig.appId
  );
}

export function getFirebaseConfigError() {
  if (isFirebaseConfigured()) return null;
  const missing = [];
  if (!firebaseConfig.apiKey) missing.push('VITE_FIREBASE_API_KEY');
  if (!firebaseConfig.projectId) missing.push('VITE_FIREBASE_PROJECT_ID');
  if (!firebaseConfig.appId) missing.push('VITE_FIREBASE_APP_ID');
  return `Missing Firebase env: ${missing.join(', ')}. Run npm run setup from the project root.`;
}

export function usesFirebaseEmulators() {
  return useEmulators;
}

let app = null;
let db = null;
let storage = null;

function connectEmulatorsIfNeeded() {
  if (!useEmulators) return;

  if (db && !globalThis.__roomradarFirestoreEmu) {
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    globalThis.__roomradarFirestoreEmu = true;
  }
  if (storage && !globalThis.__roomradarStorageEmu) {
    connectStorageEmulator(storage, '127.0.0.1', 9199);
    globalThis.__roomradarStorageEmu = true;
  }
}

export function getFirebaseApp() {
  if (!isFirebaseConfigured()) return null;
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
}

export function getDb() {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  if (!db) {
    db = getFirestore(firebaseApp);
    connectEmulatorsIfNeeded();
  }
  return db;
}

export function getFirebaseStorage() {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  if (!storage) {
    storage = getStorage(firebaseApp);
    connectEmulatorsIfNeeded();
  }
  return storage;
}
