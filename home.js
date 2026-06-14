import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    location.href = "index.html";
    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));

  const data = snap.data();

  document.getElementById("username").innerText = data.email;
  document.getElementById("balance").innerText = (data.balance || 0) + " MMK";
  document.getElementById("point").innerText = (data.point || 0) + " PT";
});
