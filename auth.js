import { db } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

window.login = async function () {

  const username = document
    .getElementById("username")
    .value
    .trim();

  const password = document
    .getElementById("password")
    .value
    .trim();

  if (!username || !password) {
    alert("Please fill all fields");
    return;
  }

  try {

    const userRef = doc(db, "users", username);

    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      alert("User not found");
      return;
    }

    const data = userSnap.data();

    if (data.password !== password) {
      alert("Wrong password");
      return;
    }

    /* SAVE LOGIN */
    localStorage.setItem("user", username);
    localStorage.setItem("role", data.role || "user");

    /* REDIRECT */
    if ((data.role || "user") === "admin") {
      window.location.href = "admin-home.html";
    } else {
      window.location.href = "home.html";
    }

  } catch (error) {

    console.error(error);

    alert("Login Error : " + error.message);

  }

};
