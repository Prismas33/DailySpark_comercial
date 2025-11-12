// Firebase Web SDK (Client-side)
// This file exposes client-side Firebase services: auth, firestore and storage
// Do NOT import this from server-only code. For Admin SDK, use lib/firebaseAdmin.ts

// 🎭 DEMO MODE: This file now supports both real Firebase and mock mode
// When DEMO_MODE is enabled, all Firebase calls are mocked locally

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

// Check if we're in demo mode
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true' || 
                   process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'DEMO_MODE_NO_REAL_API_KEY' ||
                   !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo.local',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo-bucket',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '000000',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'demo:app',
};

// Initialize app safely (Next.js can render on server and client)
function createFirebaseApp(): FirebaseApp | null {
  if (isDemoMode) {
    console.log('🎭 Running in DEMO MODE - Firebase is mocked');
    return null; // Return null in demo mode
  }
  
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
  return getApp();
}

const app = createFirebaseApp();

// These are safe to call in the browser. Avoid using in server components.
// In demo mode, these will be null and mock services should be used instead
export const auth: Auth | null = app ? getAuth(app) : null;
export const db: Firestore | null = app ? getFirestore(app) : null;
export const storage: FirebaseStorage | null = app ? getStorage(app) : null;

export { isDemoMode };
export default app;
