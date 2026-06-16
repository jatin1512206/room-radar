/**
 * Replaces SRIT-area Jabalpur listings with corrected Madhotal / ITI / Kachnar data.
 * Run: npm run seed:jabalpur  (emulators must be running)
 */
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import {
  getJabalpurShriRamProperties,
  SRIT_COLLEGE,
} from './jabalpur-shriram-properties.mjs';

const app = initializeApp({
  apiKey: 'demo-api-key',
  projectId: 'roomradar-dev',
  appId: '1:000000000000:web:seed',
});

const db = getFirestore(app);
connectFirestoreEmulator(db, '127.0.0.1', 8080);

/** Old wrong localities — remove previous SRIT-tagged listings */
const OLD_SRIT_MARKERS = [
  'Napier Town',
  'Wright Town',
  'Civil Lines',
  'Gwarighat Road',
  'Damoh Naka',
  'walking distance to SRIT',
  'Shri Ram College',
  'Shri Ram Institute',
  '3BHK near SRIT',
];

function shouldRemove(data) {
  if (data.city !== 'Jabalpur') return false;
  if (data.nearest_college === SRIT_COLLEGE) return true;
  const blob = `${data.title || ''} ${data.area || ''} ${data.address || ''}`.toLowerCase();
  if (blob.includes('srit') || blob.includes('shri ram')) return true;
  return OLD_SRIT_MARKERS.some((m) => blob.includes(m.toLowerCase()));
}

async function main() {
  const snap = await getDocs(collection(db, 'properties'));
  const toDelete = snap.docs.filter((d) => shouldRemove(d.data()));

  if (toDelete.length > 0) {
    console.log(`[seed:jabalpur] Removing ${toDelete.length} old/incorrect SRIT listings...`);
    for (const d of toDelete) {
      try {
        await deleteDoc(doc(db, 'properties', d.id));
        console.log(`[seed:jabalpur] Removed: ${d.data().title}`);
      } catch (err) {
        console.warn(`[seed:jabalpur] Could not delete "${d.data().title}": ${err.message}`);
      }
    }
  }

  const properties = getJabalpurShriRamProperties(Timestamp);

  for (const property of properties) {
    await addDoc(collection(db, 'properties'), property);
    console.log(`[seed:jabalpur] Added: ${property.title} (${property.area})`);
  }

  console.log(`[seed:jabalpur] Done — ${properties.length} listings near SRIT (Madhotal / ITI / Kachnar City).`);
  process.exit(0);
}

main().catch((err) => {
  console.error('[seed:jabalpur] Failed. Start app first: npm run dev');
  console.error(err.message);
  process.exit(1);
});
