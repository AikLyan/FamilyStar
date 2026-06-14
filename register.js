import { db } from "./firebase.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

window.register = async function () {

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Fill all fields");
    return;
  }

  const ref = doc(db, "users", username);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    alert("User already exists");
    return;
  }

  await setDoc(ref, {
    username,
    password,
    role: "user",
    balance: 0,
    point: 0
  });

  alert("Register Success");
  location.href = "index.html";
};
