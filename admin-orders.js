import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const list = document.getElementById("list");

/* LOAD ORDERS */
async function load() {

  const snap = await getDocs(collection(db, "orders"));

  let html = "";

  snap.forEach(d => {

    const o = d.data();

    html += `
      <div style="
        background:white;
        padding:15px;
        margin:10px;
        border-radius:12px;
        box-shadow:0 2px 8px rgba(0,0,0,.08);
      ">

        <p><b>User:</b> ${o.username || "-"}</p>
        <p><b>Product:</b> ${o.productName || "-"}</p>
        <p><b>Price:</b> ${o.price || 0} MMK</p>
        <p><b>Status:</b> ${o.status || "pending"}</p>

        <button onclick="approve('${d.id}')">Approve</button>
        <button onclick="deliver('${d.id}')">Deliver</button>

      </div>
    `;

  });

  list.innerHTML = html || "No Orders";

}

/* APPROVE */
window.approve = async function(id) {

  await updateDoc(doc(db, "orders", id), {
    status: "approved"
  });

  alert("Approved");
  load();

};

/* DELIVER */
window.deliver = async function(id) {

  await updateDoc(doc(db, "orders", id), {
    status: "delivered"
  });

  alert("Delivered");
  load();

};

load();
