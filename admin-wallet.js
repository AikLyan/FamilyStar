import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const list = document.getElementById("list");

/* LOAD REQUESTS */
async function load() {

  const usersSnap = await getDocs(collection(db, "users"));

  let html = "";

  for (const userDoc of usersSnap.docs) {

    const username = userDoc.id;

    const reqSnap = await getDocs(
      collection(db, "users", username, "walletRequests")
    );

    reqSnap.forEach(req => {

      const d = req.data();

      if (d.status === "pending") {

        html += `
          <div style="
            background:white;
            padding:15px;
            margin:10px;
            border-radius:12px;
            box-shadow:0 2px 8px rgba(0,0,0,.08);
          ">

            <p><b>User:</b> ${username}</p>
            <p><b>Amount:</b> ${d.amount}</p>
            <p><b>Method:</b> ${d.method}</p>
            <p><b>Sender:</b> ${d.senderNumber}</p>
            <p><b>Txn:</b> ${d.txn}</p>
            <p><b>Code:</b> ${d.digit}</p>

            <button onclick="approve('${username}','${req.id}',${d.amount})">
              Approve
            </button>

            <button onclick="reject('${username}','${req.id}')">
              Reject
            </button>

          </div>
        `;

      }

    });

  }

  list.innerHTML = html || "No Requests";

}

/* APPROVE */
window.approve = async function(username, id, amount) {

  const point = Math.floor(amount / 1000);

  await updateDoc(doc(db, "users", username), {
    balance: increment(amount),
    point: increment(point)
  });

  await updateDoc(doc(db, "users", username, "walletRequests", id), {
    status: "approved"
  });

  alert("Approved");
  load();

};

/* REJECT */
window.reject = async function(username, id) {

  await updateDoc(doc(db, "users", username, "walletRequests", id), {
    status: "rejected"
  });

  alert("Rejected");
  load();

};

load();
