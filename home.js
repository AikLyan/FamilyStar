import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const user = localStorage.getItem("user");

if (!user) location.href = "index.html";

async function load() {

  const snap = await getDoc(doc(db, "users", user));

  if (!snap.exists()) return;

  const d = snap.data();

  document.getElementById("username").innerText = user;
  document.getElementById("balance").innerText = (d.balance || 0) + " MMK";
  document.getElementById("point").innerText = (d.point || 0) + " PT";
}

load();
