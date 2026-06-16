/**
 * Seeds sample properties into the Firestore emulator (all 52 cities).
 * npm run seed       — add properties for cities that need more
 * npm run seed:force — fill every city up to target counts (no delete)
 */
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  getDocs,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import { buildAllSampleProperties, CITIES } from './seed-properties-data.mjs';

const FEATURED_CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai'];

const app = initializeApp({
  apiKey: 'demo-api-key',
  projectId: 'roomradar-dev',
  appId: '1:000000000000:web:seed',
});

const db = getFirestore(app);
connectFirestoreEmulator(db, '127.0.0.1', 8080);

const allSamples = buildAllSampleProperties(Timestamp);
const forceFill = process.argv.includes('--force');

function getTargetCount(city) {
  return FEATURED_CITIES.includes(city) ? 4 : 2;
}

function buildSamplesToAdd(existingDocs) {
  const cityCount = {};
  for (const d of existingDocs) {
    const city = d.data().city;
    if (city) cityCount[city] = (cityCount[city] || 0) + 1;
  }

  const samplesByCity = {};
  for (const sample of allSamples) {
    if (!samplesByCity[sample.city]) samplesByCity[sample.city] = [];
    samplesByCity[sample.city].push(sample);
  }

  const toAdd = [];

  for (const city of CITIES) {
    const target = getTargetCount(city);
    const current = cityCount[city] || 0;
    const needed = forceFill ? Math.max(0, target - current) : current === 0 ? target : 0;

    if (needed > 0 && samplesByCity[city]) {
      const pool = samplesByCity[city];
      for (let i = 0; i < needed && i < pool.length; i++) {
        toAdd.push(pool[i]);
      }
    }
  }

  return { toAdd, cityCount };
}

async function main() {
  const existing = await getDocs(collection(db, 'properties'));
  const { toAdd, cityCount } = buildSamplesToAdd(existing.docs);

  if (toAdd.length === 0) {
    console.log(`[seed] All ${CITIES.length} cities already have properties (${existing.size} total).`);
    console.log('[seed] Restart emulators (stop npm run dev, start again) for a clean database.');
    process.exit(0);
  }

  console.log(`[seed] Adding ${toAdd.length} properties (${existing.size} already in database)...`);

  const addedByCity = {};
  for (const property of toAdd) {
    await addDoc(collection(db, 'properties'), property);
    addedByCity[property.city] = (addedByCity[property.city] || 0) + 1;
    console.log(`[seed] + ${property.city}: ${property.title}`);
  }

  const totalCities = new Set([
    ...Object.keys(cityCount),
    ...Object.keys(addedByCity),
  ]).size;

  console.log(
    `[seed] Done — added ${toAdd.length} listings. ~${totalCities} cities now have properties.`
  );
  process.exit(0);
}

main().catch((err) => {
  console.error('[seed] Failed. Is the app running? Start with: npm run dev');
  console.error(err.message);
  process.exit(1);
});
