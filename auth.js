import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

window.login = async function () {

  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!user || !pass) return alert("Fill all fields");

  const snap = await getDoc(doc(db, "users", user));

  if (!snap.exists()) return alert("User not found");

  const data = snap.data();

  if (data.password !== pass) return alert("Wrong password");

  localStorage.setItem("user", user);
  localStorage.setItem("role", data.role || "user");

  location.href = data.role === "admin"
    ? "admin-home.html"
    : "home.html";
};
