import { db } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const user = localStorage.getItem("user");

/* LOGIN CHECK */
if (!user) {
  window.location.href = "index.html";
  throw new Error("User not logged in");
}

/* LOAD USER INFO */
async function loadUser() {

  try {

    const ref = doc(db, "users", user);

    const snap = await getDoc(ref);

    if (!snap.exists()) {

      document.getElementById("username").innerText = user;
      document.getElementById("balance").innerText = "0 MMK";
      document.getElementById("point").innerText = "0 PT";

      return;
    }

    const data = snap.data();

    document.getElementById("username").innerText = user;

    document.getElementById("balance").innerText =
      (data.balance || 0) + " MMK";

    document.getElementById("point").innerText =
      (data.point || 0) + " PT";

  } catch (err) {

    console.error(err);

    alert("Failed to load user data");

  }

}

loadUser();
