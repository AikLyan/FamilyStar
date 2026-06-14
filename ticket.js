import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const user = localStorage.getItem("user");

if (!user) location.href = "index.html";

async function loadTickets() {

  const snap = await getDocs(collection(db, "ticket", today, "orders"));

  let html = "";

  snap.forEach(d => {

    const t = d.data();

    if (t.username === user) {

      html += `
        <div class="card">
          <p>${t.route}</p>
          <p>${t.seat}</p>
          <p>${t.time}</p>
          <p>${t.status}</p>
        </div>
      `;

    }

  });

  document.getElementById("tickets").innerHTML = html || "No tickets";
}

loadTickets();
