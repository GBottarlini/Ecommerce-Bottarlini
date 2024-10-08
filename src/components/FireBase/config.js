import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClijDb0uJkRNvPgxMycdCYLxAj-JIlhyM",
  authDomain: "ipoint-d7e48.firebaseapp.com",
  projectId: "ipoint-d7e48",
  storageBucket: "ipoint-d7e48.appspot.com",
  messagingSenderId: "517325454084",
  appId: "1:517325454084:web:028d6e313fa5ca9f526e51",
  measurementId: "G-C2W320WCDH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };