# Firebase setup for RoomRadar

## 1. Create a Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a project (e.g. `roomradar`).
3. Add a **Web app** and copy the config object.

## 2. Enable services

### Firestore Database

1. Build → Firestore Database → **Create database**.
2. Start in **production mode** (you will deploy rules below).
3. Collection name used by the app: **`properties`** (created automatically on first listing).

### Storage

1. Build → Storage → **Get started**.
2. Default bucket is fine.

## 3. Environment variables

Copy values into `src/.env`:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## 4. Deploy security rules

Install Firebase CLI if needed: `npm install -g firebase-tools`

```bash
firebase login
firebase init
# Select Firestore + Storage, use existing project, point rules to:
#   firestore.rules → firebase/firestore.rules
#   storage.rules → firebase/storage.rules
```

Or paste rules manually in the console:

- **Firestore** → Rules → paste `firebase/firestore.rules`
- **Storage** → Rules → paste `firebase/storage.rules`

## 5. Firestore index (if prompted)

If listings fail with an index error, click the link in the browser console to create a single-field index on `properties.created_at` (descending). Firebase usually auto-suggests this.

## 6. Migrate data from Base44 (optional)

Export properties from Base44 as JSON/CSV and import into the `properties` collection. Each document should match fields in `entities/Property.json`, plus:

- `created_at` — Firestore `timestamp` (for sort order)
- Document ID — auto-generated, or set manually

## Hardening later

- Add **Firebase Authentication** for property owners
- Change Storage/Firestore rules to `allow write: if request.auth != null`
- Add `favorites` subcollection per user
