import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

window.logout = async function () {
  await signOut(auth);
  localStorage.clear();
  location.href = "index.html";
};
