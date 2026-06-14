import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const user = localStorage.getItem("user");
const today = new Date().toISOString().split("T")[0];

async function load() {

  const snap = await getDocs(collection(db, "tickets", today, "orders"));

  let html = "";

  snap.forEach(d => {
    const t = d.data();

    if (t.username === user) {
      html += `<div>${t.route} - ${t.seat} - ${t.status}</div>`;
    }
  });

  document.getElementById("tickets").innerHTML = html;
}

load();
