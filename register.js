import { db } from "./firebase.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

window.register = async function () {

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

    // Check existing user
    const userRef = doc(db, "users", username);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      alert("Username already exists");
      return;
    }

    // Create new user
    await setDoc(userRef, {
      username: username,
      password: password,
      role: "user",
      balance: 0,
      point: 0,
      createdAt: Date.now()
    });

    alert("Register Success");

    window.location.href = "index.html";

  } catch (error) {

    console.error(error);

    alert("Register Error : " + error.message);

  }

};
