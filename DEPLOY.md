# Deploy RoomRadar globally

Your app has two parts:

1. **Website** (React) → Vercel or Netlify (free global CDN)
2. **Database** (Firebase Firestore + Storage) → Firebase Console (free tier)

---

## Step 1 — Create production Firebase (one time)

1. [Firebase Console](https://console.firebase.google.com/) → **Create project** (e.g. `roomradar-prod`)
2. **Firestore** → Create database → Production mode
3. **Storage** → Get started
4. **Project settings** → Your apps → **Web** → Register app → copy config

5. Deploy rules (Firebase CLI):

```bash
npm install -g firebase-tools
firebase login
cd "path/to/room radar"
firebase use --add
# select your project
firebase deploy --only firestore:rules,storage
```

6. Paste rules manually if needed:
   - Firestore: `firebase/firestore.rules`
   - Storage: `firebase/storage.rules`

---

## Step 2 — Deploy website on Vercel (recommended)

### Option A: GitHub + Vercel (best)

```bash
cd "path/to/room radar"
git init
git add .
git commit -m "RoomRadar initial deploy"
```

Push to GitHub, then:

1. [vercel.com](https://vercel.com) → **Add New Project** → Import GitHub repo
2. **Environment variables** (Settings → Environment Variables) — add ALL:

| Name | Value |
|------|--------|
| `VITE_USE_FIREBASE_EMULATORS` | `false` |
| `VITE_FIREBASE_API_KEY` | from Firebase web config |
| `VITE_FIREBASE_AUTH_DOMAIN` | `your-project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | your project id |
| `VITE_FIREBASE_STORAGE_BUCKET` | `your-project.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | from config |
| `VITE_FIREBASE_APP_ID` | from config |

3. Deploy → you get a global URL like `https://roomradar.vercel.app`

### Option B: Vercel CLI (no GitHub)

```bash
cd "path/to/room radar"
npx vercel login
npx vercel
# follow prompts, add env vars in Vercel dashboard, then:
npx vercel --prod
```

---

## Step 3 — Upload property data to production Firebase

Local emulator data does **not** go online automatically.

After Firebase project exists:

```bash
# Copy production config into src/.env.production.local (do NOT commit)
# VITE_USE_FIREBASE_EMULATORS=false
# VITE_FIREBASE_* = your real keys

npm run seed:production
```

Or use Firebase Console → Firestore → import documents manually.

---

## Step 4 — Custom domain (optional)

Vercel → Project → **Domains** → add `roomradar.com` (or any domain you own).

---

## Netlify alternative

Connect repo on [netlify.com](https://netlify.com) — `netlify.toml` is already configured.

Same `VITE_FIREBASE_*` env vars in Site settings → Environment variables.

---

## Firebase Hosting alternative

```bash
npm run build
firebase deploy --only hosting
```

Uses `src/dist` — URL: `https://your-project.web.app`

Still needs Firestore in cloud (Step 1).

---

## Checklist before going live

- [ ] `VITE_USE_FIREBASE_EMULATORS` is **false** on Vercel/Netlify
- [ ] Firestore + Storage rules deployed
- [ ] Properties seeded in **production** Firestore (not emulator)
- [ ] `.env` with demo keys is **not** committed (in `.gitignore`)
