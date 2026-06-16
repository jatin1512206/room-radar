/**
 * Seeds production Firestore (cloud Firebase — NOT emulator).
 *
 * 1. Create src/.env.production.local with real VITE_FIREBASE_* and VITE_USE_FIREBASE_EMULATORS=false
 * 2. firebase login
 * 3. npm run seed:production
 */
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';
import { buildAllSampleProperties } from './seed-properties-data.mjs';
import { getJabalpurShriRamProperties } from './jabalpur-shriram-properties.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../src/.env.production.local');

function loadEnvFile(path) {
  if (!existsSync(path)) return {};
  const vars = {};
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i === -1) continue;
    vars[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return vars;
}

const env = loadEnvFile(envPath);

if (env.VITE_USE_FIREBASE_EMULATORS === 'true') {
  console.error('[seed:production] Set VITE_USE_FIREBASE_EMULATORS=false in .env.production.local');
  process.exit(1);
}

const config = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

if (!config.apiKey || !config.projectId) {
  console.error('[seed:production] Missing config. Create src/.env.production.local — see DEPLOY.md');
  process.exit(1);
}

const app = initializeApp(config);
const db = getFirestore(app);

async function main() {
  const existing = await getDocs(collection(db, 'properties'));
  if (existing.size > 0) {
    console.log(`[seed:production] ${existing.size} properties already exist. Skipping.`);
    console.log('[seed:production] Delete collection in Firebase Console to re-seed.');
    process.exit(0);
  }

  const samples = [
    ...buildAllSampleProperties(Timestamp),
    ...getJabalpurShriRamProperties(Timestamp),
  ];

  console.log(`[seed:production] Adding ${samples.length} properties to ${config.projectId}...`);

  for (const property of samples) {
    await addDoc(collection(db, 'properties'), property);
  }

  console.log('[seed:production] Done.');
  process.exit(0);
}

main().catch((err) => {
  console.error('[seed:production]', err.message);
  process.exit(1);
});
