import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const username = localStorage.getItem("user");

if (!username) location.href = "index.html";

async function load() {

  const ref = doc(db, "users", username);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    alert("User not found");
    return;
  }

  const d = snap.data();

  document.getElementById("username").innerText = username;
  document.getElementById("balance").innerText = (d.balance || 0) + " MMK";
  document.getElementById("point").innerText = (d.point || 0) + " PT";
}

load();
