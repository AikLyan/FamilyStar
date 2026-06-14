import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

window.register = async function () {

  const email = document.getElementById("username").value; // email use
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  try {

    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCred.user.uid), {
      email,
      role: "user",
      balance: 0,
      point: 0,
      createdAt: Date.now()
    });

    alert("Register Success");
    location.href = "index.html";

  } catch (e) {
    alert(e.message);
  }
};
