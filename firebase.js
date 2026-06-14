import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBvLjIE3ESIbhxtlvNKgyzxfvhA5jUG5Nw",
  authDomain: "familystar-pro.firebaseapp.com",
  projectId: "familystar-pro",
  storageBucket: "familystar-pro.firebasestorage.app",
  messagingSenderId: "753256705012",
  appId: "1:753256705012:web:280693adebbb8caaa727a1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
