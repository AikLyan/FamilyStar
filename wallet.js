import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

window.sendRequest = async function () {

  const user = localStorage.getItem("user");

  const amount = Number(document.getElementById("amount").value);
  const method = document.getElementById("method").value;
  const senderNumber = document.getElementById("senderNumber").value;
  const txn = document.getElementById("txn").value;
  const digit = document.getElementById("digit").value;

  if (!amount || !method || !senderNumber || !txn || !digit) {
    alert("Fill all fields");
    return;
  }

  await addDoc(collection(db, "users", user, "walletRequests"), {
    amount,
    method,
    senderNumber,
    txn,
    digit,
    status: "pending",
    createdAt: Date.now()
  });

  alert("Request Sent");
};
