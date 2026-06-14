import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

window.sendRequest = async function () {

  const user = localStorage.getItem("user");

  const amount = Number(document.getElementById("amount").value);
  const method = document.getElementById("method").value;

  if (!amount || !method) return alert("Fill all fields");

  await addDoc(collection(db, "users", user, "walletRequests"), {
    amount,
    method,
    senderNumber: document.getElementById("senderNumber").value,
    txn: document.getElementById("txn").value,
    digit: document.getElementById("digit").value,
    status: "pending",
    createdAt: Date.now()
  });

  alert("Sent");
};
