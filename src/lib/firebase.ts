import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAnalytics, logEvent as firebaseLogEvent, Analytics } from "firebase/analytics";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth: Auth = getAuth(app);

// Initialize Cloud Firestore
export const db: Firestore = getFirestore(app);

// Enable offline persistence for Firestore
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.log("Multiple tabs open, persistence can only be enabled in one tab at a a time.");
  } else if (err.code === "unimplemented") {
    console.log("The current browser does not support all of the features required to enable persistence");
  }
});

// Initialize Firebase Analytics
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export const logEvent = (eventName: string, eventParams?: { [key: string]: any }) => {
  if (analytics) {
    firebaseLogEvent(analytics, eventName, eventParams);
  } else {
    console.log(`[Analytics Mock] Event: ${eventName}`, eventParams);
  }
};

// Initialize Cloud Storage
export const storage: FirebaseStorage = getStorage(app);

export default app;

