import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

window.login = async function () {

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Fill all fields");
    return;
  }

  const ref = doc(db, "users", username);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    alert("User not found");
    return;
  }

  const data = snap.data();

  if (data.password !== password) {
    alert("Wrong password");
    return;
  }

  localStorage.setItem("user", username);
  localStorage.setItem("role", data.role);

  alert("Login Success");

  location.href =
    data.role === "admin"
      ? "admin-home.html"
      : "home.html";
};
