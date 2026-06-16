# RoomRadar

RoomRadar helps college students find PGs, hostels, rooms, and flats near their campus. Search by city and college, filter by budget and amenities, and contact owners directly.

**Stack:** React, Vite, Tailwind CSS, **Firebase** (Firestore + Storage).

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A [Firebase](https://console.firebase.google.com/) project with Firestore and Storage enabled

## Setup

1. Clone the repository.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Firebase — follow [firebase/README.md](firebase/README.md).

4. Create `src/.env`:

   ```bash
   cp src/.env.example src/.env
   ```

   Fill in your Firebase web app config from the Firebase Console.

## Run locally (one command)

From the project root — starts emulators, seeds sample listings, and runs the app:

```bash
npm install
npm run dev
```

Open **http://localhost:5173** (and emulator UI at **http://localhost:4000**).

`src/.env` is preconfigured for local emulators. No Firebase cloud account needed for development.

To run only the web app (emulators already running):

```bash
npm run dev:app
```

## Build for production

```bash
npm run build
```

Preview:

```bash
npm run preview
```

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Yes | Firebase web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Yes | e.g. `myapp.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Yes | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Yes | Storage bucket URL/name |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Yes | From Firebase config |
| `VITE_FIREBASE_APP_ID` | Yes | Firebase web app ID |

## Deploy

### Vercel / Netlify / Railway

1. Connect your GitHub repo.
2. Add all `VITE_FIREBASE_*` variables in the host’s environment settings (build-time for Vite).
3. Build command: `npm run build` (from repo root; runs build in `src/`).
4. Output directory: `src/dist`.
5. SPA fallback: all routes → `index.html` (`vercel.json` / `netlify.toml` included).

Deploy Firestore and Storage rules from [firebase/README.md](firebase/README.md).

## Project structure

```
room radar/
├── firebase/          # Security rules + setup guide
├── entities/          # Property field reference (schema)
├── src/               # Vite React app
│   ├── api/           # properties.js (Firestore + Storage)
│   ├── lib/           # firebase.js init
│   ├── components/
│   └── pages/
└── package.json
```

## License

Private — see your repository terms.
